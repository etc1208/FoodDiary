export interface FoodItem {
  id: string
  name: string
  description: string
  tags: string[]
  date: string
  image: string
}

export interface FoodsData {
  items: FoodItem[]
  allTags: string[]
}

export type ViewMode = 'timeline' | 'masonry'

export type Theme = 'light' | 'dark' | 'system'
