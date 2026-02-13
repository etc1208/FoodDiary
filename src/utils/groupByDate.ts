import type { FoodItem } from '../types/food'

export function groupByDate(foods: FoodItem[]): Record<string, FoodItem[]> {
  const groups: Record<string, FoodItem[]> = {}

  for (const food of foods) {
    if (!groups[food.date]) {
      groups[food.date] = []
    }
    groups[food.date].push(food)
  }

  const sortedDates = Object.keys(groups).sort((a, b) => b.localeCompare(a))

  const sortedGroups: Record<string, FoodItem[]> = {}
  for (const date of sortedDates) {
    sortedGroups[date] = groups[date]
  }

  return sortedGroups
}
