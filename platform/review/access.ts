import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from 'jose';

const issuer = 'https://kokodal.cloudflareaccess.com';
const audience = '597640e5d38cad688539217461d7f90a3b958bcc7e261254e9c282f2cf45842f';
const keys = createRemoteJWKSet(new URL('/cdn-cgi/access/certs', issuer));

export async function catalogReviewer(request: Request, verifier: JWTVerifyGetKey = keys) {
  if (new URL(request.url).origin !== 'https://wash.kokoda.fun') return null;
  const token = request.headers.get('Cf-Access-Jwt-Assertion');
  if (!token || token.length > 16000) return null;
  try {
    const { payload } = await jwtVerify(token, verifier, {
      issuer, audience, algorithms: ['RS256'], requiredClaims: ['sub', 'exp', 'iat', 'email'],
    });
    return payload.type === 'app' && typeof payload.email === 'string' && payload.email && payload.sub
      ? { subject: payload.sub, email: payload.email } : null;
  } catch {
    return null;
  }
}
