import { describe, it, expect } from 'vitest'
import { groupByDate } from '../groupByDate'

import type { FoodItem } from '../../types/food'

const createFood = (id: string, date: string): FoodItem => ({
  id,
  name: `食物 ${id}`,
  description: '描述',
  tags: ['标签'],
  date,
  image: 'test.jpg',
})

describe('groupByDate', () => {
  it('should group foods with the same date together', () => {
    const foods: FoodItem[] = [
      createFood('1', '2024-01-15'),
      createFood('2', '2024-01-15'),
      createFood('3', '2024-01-20'),
    ]

    const result = groupByDate(foods)

    expect(Object.keys(result)).toHaveLength(2)
    expect(result['2024-01-15']).toHaveLength(2)
    expect(result['2024-01-20']).toHaveLength(1)
  })

  it('should put different dates in different groups', () => {
    const foods: FoodItem[] = [
      createFood('1', '2024-01-10'),
      createFood('2', '2024-01-20'),
      createFood('3', '2024-01-15'),
    ]

    const result = groupByDate(foods)

    expect(Object.keys(result)).toHaveLength(3)
    expect(result['2024-01-10'][0].id).toBe('1')
    expect(result['2024-01-20'][0].id).toBe('2')
    expect(result['2024-01-15'][0].id).toBe('3')
  })

  it('should return empty object for empty array', () => {
    const result = groupByDate([])

    expect(result).toEqual({})
  })

  it('should sort groups by date descending', () => {
    const foods: FoodItem[] = [
      createFood('1', '2024-01-10'),
      createFood('2', '2024-01-20'),
      createFood('3', '2024-01-15'),
    ]

    const result = groupByDate(foods)
    const dates = Object.keys(result)

    expect(dates[0]).toBe('2024-01-20')
    expect(dates[1]).toBe('2024-01-15')
    expect(dates[2]).toBe('2024-01-10')
  })
})
