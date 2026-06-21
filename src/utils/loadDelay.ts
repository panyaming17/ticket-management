/**
 * 根据数据量动态计算加载延时（模拟真实接口响应时间）
 * @param dataCount 数据条数
 * @returns 延时毫秒数
 */
export function computeLoadDelay(dataCount: number): number {
  const thresholds: [number, number][] = [
    [0, 0],
    [5, 200],
    [20, 400],
    [50, 600],
    [Infinity, 800],
  ]
  for (const [max, delay] of thresholds) {
    if (dataCount <= max) return delay
  }
  return 800
}
