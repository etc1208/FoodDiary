import { useRef, useCallback, useState, useEffect } from 'react'

import { FoodCard } from './FoodCard'
import { shouldEnable3D } from '../utils/shouldEnable3D'

import type { FoodItem } from '../types/food'

interface Card3DViewProps {
  foods: FoodItem[]
  onTagClick?: (tag: string) => void
}

export function Card3DView({ foods, onTagClick }: Card3DViewProps): React.ReactElement {
  const [enable3D, setEnable3D] = useState(false)

  useEffect(() => {
    setEnable3D(shouldEnable3D())
  }, [])

  if (!enable3D) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style={{ gap: '1rem' }}>
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} variant="compact" onTagClick={onTagClick} />
        ))}
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      style={{ gap: '1rem', perspective: '1000px' }}
    >
      {foods.map((food) => (
        <Card3DWrapper key={food.id}>
          <FoodCard food={food} variant="compact" onTagClick={onTagClick} />
        </Card3DWrapper>
      ))}
    </div>
  )
}

interface Card3DWrapperProps {
  children: React.ReactNode
}

function Card3DWrapper({ children }: Card3DWrapperProps): React.ReactElement {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateY = ((x - centerX) / centerX) * 15
    const rotateX = ((centerY - y) / centerY) * 15

    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return

    card.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const touch = e.touches[0]
    const rect = card.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateY = ((x - centerX) / centerX) * 10
    const rotateX = ((centerY - y) / centerY) * 10

    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
  }, [])

  const handleTouchEnd = useCallback(() => {
    const card = cardRef.current
    if (!card) return

    card.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }, [])

  return (
    <div
      ref={cardRef}
      className="transition-transform duration-100 ease-out"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  )
}
