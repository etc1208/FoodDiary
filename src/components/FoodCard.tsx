import { useState, useCallback } from 'react'

import { ImagePreview } from './ImagePreview'

import type { FoodItem } from '../types/food'

const BASE_URL = import.meta.env.BASE_URL

interface FoodCardProps {
  food: FoodItem
  variant?: 'default' | 'compact' | 'featured'
}

export function FoodCard({ food, variant = 'default' }: FoodCardProps): React.ReactElement {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const isCompact = variant === 'compact'
  const isFeatured = variant === 'featured'

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true)
    setImageError(true)
    e.currentTarget.src = `${BASE_URL}images/placeholder.png`
  }, [])

  const imageSrc = imageError
    ? `${BASE_URL}images/placeholder.png`
    : `${BASE_URL}images/${food.image}`

  return (
    <article
      className={`
        bg-white dark:bg-gray-800 rounded-xl overflow-hidden
        ${isCompact ? 'shadow-[0_0_0_1px_rgba(0,0,0,0.08)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]' : 'shadow-md'}
        ${isFeatured ? 'shadow-lg' : ''}
        ${isCompact ? '' : 'hover:shadow-lg transition-shadow'}
      `}
    >
      <div className={`relative ${isCompact ? 'aspect-square' : 'aspect-[4/3]'} bg-gray-200 dark:bg-gray-700`}>
        {/* 骨架屏 */}
        {!imageLoaded && (
          <div className="absolute top-0 left-0 w-full h-full animate-pulse bg-gray-300 dark:bg-gray-600" />
        )}
        <button
          type="button"
          className="absolute top-0 left-0 w-full h-full cursor-zoom-in"
          onClick={() => setShowPreview(true)}
          aria-label={`放大查看 ${food.name}`}
        >
          <img
            src={imageSrc}
            alt={food.name}
            loading="lazy"
            className={`
              w-full h-full object-cover transition-opacity duration-300
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={handleImageLoad}
            onError={handleImageError}
            draggable={false}
          />
        </button>
      </div>

      <div className={`${isCompact ? 'p-0' : 'p-3'}`}>
        {!isCompact && (
          <div className="flex flex-wrap mt-2">
            {food.tags.map((tag, index) => {
              const colors = [
                'bg-stone-100/85 text-stone-700/90',
                'bg-slate-100/85 text-slate-700/90',
                'bg-zinc-100/85 text-zinc-700/90',
                'bg-neutral-100/85 text-neutral-700/90',
              ]
              const colorClass = colors[index % colors.length]
              return (
                <span
                  key={tag}
                  className={`
                    mr-2 mb-2 px-3 py-1.5 rounded-lg text-sm font-medium
                    ${colorClass}
                    backdrop-blur-[2px]
                  `}
                >
                  {tag}
                </span>
              )
            })}
          </div>
        )}
      </div>

      {showPreview && (
        <ImagePreview
          src={`images/${food.image}`}
          alt={food.name}
          onClose={() => setShowPreview(false)}
        />
      )}
    </article>
  )
}
