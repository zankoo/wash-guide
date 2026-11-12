// 测试用的可复现随机数：同一个种子得到同一串结果，探索测试失败时可以原样重放
export function testSeed(): number {
  return Number(process.env.EXPLORE_SEED) || Math.floor(Math.random() * 1e9);
}

/** mulberry32：返回 [0, n) 的随机整数 */
export function rng(seed: number): (n: number) => number {
  let a = seed >>> 0;
  return (n: number) => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) % n;
  };
}
