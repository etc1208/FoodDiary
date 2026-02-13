import { FoodCard } from './FoodCard'

import type { FoodItem } from '../types/food'

interface MasonryViewProps {
  foods: FoodItem[]
  onTagClick?: (tag: string) => void
}

export function MasonryView({ foods, onTagClick }: MasonryViewProps): React.ReactElement {
  return (
    <div
      className="
        columns-2 md:columns-3 lg:columns-4
        [column-gap:1rem]
      "
    >
      {foods.map((food) => (
        <div
          key={food.id}
          className="mb-4 break-inside-avoid"
        >
          <FoodCard food={food} variant="compact" onTagClick={onTagClick} />
        </div>
      ))}
    </div>
  )
}
