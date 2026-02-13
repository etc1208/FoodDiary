import { useState, useMemo } from 'react'

import { Header } from './components/Header'
import { TagFilter } from './components/TagFilter'
import { ViewSwitcher } from './components/ViewSwitcher'
import { TimelineView } from './components/TimelineView'
import { MasonryView } from './components/MasonryView'
import { EmptyState } from './components/EmptyState'

import foodsData from './data/foods.json'

import type { FoodItem, FoodsData, ViewMode } from './types/food'

const data = foodsData as FoodsData

export function App(): React.ReactElement {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('timeline')

  const filteredFoods = useMemo<FoodItem[]>(() => {
    if (activeTag === null) {
      return data.items
    }
    return data.items.filter((food) => food.tags.includes(activeTag))
  }, [activeTag])

  const handleTagClick = (tag: string): void => {
    setActiveTag(tag)
  }

  const handleTagChange = (tag: string | null): void => {
    setActiveTag(tag)
  }

  const renderView = (): React.ReactElement => {
    if (data.items.length === 0) {
      return <EmptyState type="no-data" />
    }
    if (filteredFoods.length === 0) {
      return <EmptyState type="no-results" />
    }

    switch (viewMode) {
      case 'masonry':
        return <MasonryView foods={filteredFoods} onTagClick={handleTagClick} />
      case 'timeline':
      default:
        return <TimelineView foods={filteredFoods} onTagClick={handleTagClick} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="max-w-4xl mx-auto pb-8">
        {/* 筛选与视图切换栏 */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex-1 overflow-x-auto">
            <TagFilter
              allTags={data.allTags}
              activeTag={activeTag}
              onTagChange={handleTagChange}
            />
          </div>
          <div className="flex-shrink-0 ml-2">
            <ViewSwitcher viewMode={viewMode} onViewChange={setViewMode} />
          </div>
        </div>

        {/* 内容区域 */}
        <div className="px-4">
          {renderView()}
        </div>
      </main>
    </div>
  )
}

export default App
