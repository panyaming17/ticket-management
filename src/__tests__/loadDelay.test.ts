import { describe, it, expect } from 'vitest'
import { computeLoadDelay } from '../utils/loadDelay'

describe('computeLoadDelay', () => {
  it('0 条数据返回 0ms（立即返回）', () => {
    expect(computeLoadDelay(0)).toBe(0)
  })

  it('≤5 条数据返回 200ms', () => {
    expect(computeLoadDelay(1)).toBe(200)
    expect(computeLoadDelay(3)).toBe(200)
    expect(computeLoadDelay(5)).toBe(200)
  })

  it('≤20 条数据返回 400ms', () => {
    expect(computeLoadDelay(6)).toBe(400)
    expect(computeLoadDelay(12)).toBe(400)
    expect(computeLoadDelay(20)).toBe(400)
  })

  it('≤50 条数据返回 600ms', () => {
    expect(computeLoadDelay(21)).toBe(600)
    expect(computeLoadDelay(35)).toBe(600)
    expect(computeLoadDelay(50)).toBe(600)
  })

  it('>50 条数据返回 800ms', () => {
    expect(computeLoadDelay(51)).toBe(800)
    expect(computeLoadDelay(100)).toBe(800)
    expect(computeLoadDelay(9999)).toBe(800)
  })

  it('负数不会命中 Infinity 以外的阈值，返回 200ms', () => {
    // -1 ≤ 0，命中第一个阈值
    expect(computeLoadDelay(-1)).toBe(0)
  })
})
