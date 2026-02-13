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

export type ViewMode = 'timeline' | 'masonry' | 'card3d' | 'carousel3d'

export type Theme = 'light' | 'dark' | 'system'
