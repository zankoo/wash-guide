import { createLocalJWKSet, exportJWK, generateKeyPair, SignJWT } from 'jose';
import { beforeAll, describe, expect, it } from 'vitest';
import { catalogReviewer } from './access';

const issuer = 'https://kokodal.cloudflareaccess.com';
const audience = '597640e5d38cad688539217461d7f90a3b958bcc7e261254e9c282f2cf45842f';
const email = 'maintainer@example.test';
const origin = 'https://wash.kokoda.fun';
let key: CryptoKey;
let verifier: ReturnType<typeof createLocalJWKSet>;
beforeAll(async () => {
  const { privateKey, publicKey } = await generateKeyPair('RS256');
  key = privateKey;
  verifier = createLocalJWKSet({ keys: [{ ...await exportJWK(publicKey), kid: 'test' }] });
});

async function assertion(claims = {}, signingKey = key) {
  return new SignJWT({ type: 'app', email, iss: issuer, aud: [audience], sub: 'owner', exp: Math.floor(Date.now()/1000) + 300, ...claims })
    .setIssuedAt().setProtectedHeader({ alg: 'RS256', kid: 'test' }).sign(signingKey);
}
const request = (token: string, host = origin) => new Request(host + '/admin', {
  headers: { 'Cf-Access-Jwt-Assertion': token, 'Cf-Access-Authenticated-User-Email': email },
});
describe('catalog reviewer identity', () => {
  it('accepts a signed Access application session for the configured app', async () => {
    expect(await catalogReviewer(request(await assertion()), verifier)).toEqual({ subject: 'owner', email });
  });
  it('requires a valid session and signature on the canonical admin host', async () => {
    const other = await generateKeyPair('RS256');
    expect(await catalogReviewer(request(await assertion({}, other.privateKey)), verifier)).toBeNull();
    for (const claims of [{ iss: 'https://other.cloudflareaccess.com' }, { aud: ['different-app'] }, { exp: 1 }, { type: 'org' }, { sub: '' }]) {
      expect(await catalogReviewer(request(await assertion(claims)), verifier)).toBeNull();
    }
    expect(await catalogReviewer(request(await assertion(), 'https://preview.workers.dev'), verifier)).toBeNull();
    expect(await catalogReviewer(request(''), verifier)).toBeNull();
  });
});
