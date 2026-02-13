import { useState, useCallback } from 'react'

import type { FoodItem } from '../types/food'

interface FoodCardProps {
  food: FoodItem
  variant?: 'default' | 'compact' | 'featured'
  onTagClick?: (tag: string) => void
}

export function FoodCard({ food, variant = 'default', onTagClick }: FoodCardProps): React.ReactElement {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const isCompact = variant === 'compact'
  const isFeatured = variant === 'featured'

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true)
    setImageError(true)
    e.currentTarget.src = '/images/placeholder.png'
  }, [])

  return (
    <article
      className={`
        bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md
        ${isFeatured ? 'shadow-lg' : ''}
        ${isCompact ? '' : 'hover:shadow-lg transition-shadow'}
      `}
    >
      <div className={`relative ${isCompact ? 'aspect-square' : 'aspect-[4/3]'} bg-gray-200 dark:bg-gray-700`}>
        {/* 骨架屏 */}
        {!imageLoaded && (
          <div className="absolute top-0 left-0 w-full h-full animate-pulse bg-gray-300 dark:bg-gray-600" />
        )}
        <img
          src={imageError ? '/images/placeholder.png' : `/images/${food.image}`}
          alt={food.name}
          loading="lazy"
          className={`
            w-full h-full object-cover transition-opacity duration-300
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      <div className={`p-4 ${isCompact ? 'p-3' : ''}`}>
        <h3
          className={`
            font-semibold text-gray-900 dark:text-white
            ${isFeatured ? 'text-xl' : isCompact ? 'text-sm' : 'text-lg'}
            ${isCompact ? 'line-clamp-1' : ''}
          `}
        >
          {food.name}
        </h3>

        {!isCompact && (
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {food.description}
          </p>
        )}

        <div className={`flex flex-wrap mt-3 ${isCompact ? 'mt-2' : ''}`}>
          {food.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onTagClick?.(tag)}
              className={`
                mr-2 mb-1 px-2 py-0.5 rounded-full text-xs
                bg-gray-100 dark:bg-gray-700
                text-gray-600 dark:text-gray-300
                hover:bg-gray-200 dark:hover:bg-gray-600
                transition-colors
              `}
            >
              {tag}
            </button>
          ))}
        </div>

        {!isCompact && (
          <time
            dateTime={food.date}
            className="block mt-2 text-xs text-gray-400 dark:text-gray-500"
          >
            {food.date}
          </time>
        )}
      </div>
    </article>
  )
}
