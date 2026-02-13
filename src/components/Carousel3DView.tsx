import { useState, useCallback, useEffect, useRef } from 'react'

import { FoodCard } from './FoodCard'
import { shouldEnable3D } from '../utils/shouldEnable3D'

import type { FoodItem } from '../types/food'

interface Carousel3DViewProps {
  foods: FoodItem[]
  onTagClick?: (tag: string) => void
}

export function Carousel3DView({ foods, onTagClick }: Carousel3DViewProps): React.ReactElement {
  const [enable3D, setEnable3D] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const dragStartAngle = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setEnable3D(shouldEnable3D())
  }, [])

  const itemCount = foods.length
  const angleStep = itemCount > 0 ? 360 / itemCount : 0
  const radius = Math.max(200, itemCount * 30)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % itemCount)
  }, [itemCount])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount)
  }, [itemCount])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true)
    dragStartX.current = e.touches[0].clientX
    dragStartAngle.current = currentIndex * angleStep
  }, [currentIndex, angleStep])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return
    const deltaX = e.touches[0].clientX - dragStartX.current
    const deltaAngle = (deltaX / window.innerWidth) * 180
    const newAngle = dragStartAngle.current - deltaAngle
    const newIndex = Math.round(newAngle / angleStep) % itemCount
    setCurrentIndex((newIndex + itemCount) % itemCount)
  }, [isDragging, angleStep, itemCount])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    dragStartX.current = e.clientX
    dragStartAngle.current = currentIndex * angleStep
  }, [currentIndex, angleStep])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    const deltaX = e.clientX - dragStartX.current
    const deltaAngle = (deltaX / window.innerWidth) * 180
    const newAngle = dragStartAngle.current - deltaAngle
    const newIndex = Math.round(newAngle / angleStep) % itemCount
    setCurrentIndex((newIndex + itemCount) % itemCount)
  }, [isDragging, angleStep, itemCount])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  if (!enable3D || itemCount === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style={{ gap: '1rem' }}>
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} variant="compact" onTagClick={onTagClick} />
        ))}
      </div>
    )
  }

  const rotationAngle = -currentIndex * angleStep

  return (
    <div className="relative">
      {/* 导航按钮 */}
      <button
        type="button"
        onClick={goToPrev}
        className="
          absolute left-2 top-1/2 z-10 w-10 h-10 rounded-full
          bg-white/80 dark:bg-gray-800/80 shadow-lg
          flex items-center justify-center
          text-gray-700 dark:text-gray-300
          hover:bg-white dark:hover:bg-gray-700
          transition-colors
        "
        style={{ transform: 'translateY(-50%)' }}
        aria-label="上一个"
      >
        ←
      </button>
      <button
        type="button"
        onClick={goToNext}
        className="
          absolute right-2 top-1/2 z-10 w-10 h-10 rounded-full
          bg-white/80 dark:bg-gray-800/80 shadow-lg
          flex items-center justify-center
          text-gray-700 dark:text-gray-300
          hover:bg-white dark:hover:bg-gray-700
          transition-colors
        "
        style={{ transform: 'translateY(-50%)' }}
        aria-label="下一个"
      >
        →
      </button>

      {/* 3D 轮播容器 */}
      <div
        ref={containerRef}
        className="relative mx-auto overflow-hidden select-none"
        style={{
          height: '400px',
          perspective: '1000px',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(-${radius}px) rotateY(${rotationAngle}deg)`,
            transition: isDragging ? 'none' : 'transform 0.5s ease-out',
          }}
        >
          {foods.map((food, index) => {
            const angle = index * angleStep
            const isActive = index === currentIndex

            return (
              <div
                key={food.id}
                className="absolute w-48 md:w-56"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `
                    translateX(-50%) translateY(-50%)
                    rotateY(${angle}deg)
                    translateZ(${radius}px)
                  `,
                  opacity: isActive ? 1 : 0.6,
                  transition: 'opacity 0.3s',
                }}
              >
                <FoodCard
                  food={food}
                  variant={isActive ? 'featured' : 'compact'}
                  onTagClick={onTagClick}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* 指示器 */}
      <div className="flex justify-center mt-4" style={{ gap: '0.5rem' }}>
        {foods.map((food, index) => (
          <button
            key={food.id}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`
              w-2 h-2 rounded-full transition-colors
              ${index === currentIndex
                ? 'bg-gray-800 dark:bg-white'
                : 'bg-gray-300 dark:bg-gray-600'
              }
            `}
            aria-label={`跳转到 ${food.name}`}
          />
        ))}
      </div>
    </div>
  )
}
