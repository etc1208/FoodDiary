import { FoodCard } from './FoodCard'

import type { FoodItem } from '../types/food'

interface MasonryViewProps {
  foods: FoodItem[]
}

export function MasonryView({ foods }: MasonryViewProps): React.ReactElement {
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
          className="mb-2 break-inside-avoid"
        >
          <FoodCard food={food} variant="compact" />
        </div>
      ))}
    </div>
  )
}
