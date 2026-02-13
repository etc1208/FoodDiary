import { useState } from 'react'

import { Header } from './components/Header'
import { ViewSwitcher } from './components/ViewSwitcher'
import { TimelineView } from './components/TimelineView'
import { MasonryView } from './components/MasonryView'
import { EmptyState } from './components/EmptyState'

import foodsData from './data/foods.json'

import type { FoodsData, ViewMode } from './types/food'

const data = foodsData as FoodsData

export function App(): React.ReactElement {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline')

  const renderView = (): React.ReactElement => {
    if (data.items.length === 0) {
      return <EmptyState type="no-data" />
    }

    switch (viewMode) {
      case 'masonry':
        return <MasonryView foods={data.items} />
      case 'timeline':
      default:
        return <TimelineView foods={data.items} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="max-w-4xl mx-auto pb-8">
        {/* 视图切换栏 */}
        <div className="flex justify-end px-4 py-2">
          <ViewSwitcher viewMode={viewMode} onViewChange={setViewMode} />
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
