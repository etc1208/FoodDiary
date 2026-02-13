import type { ViewMode } from '../types/food'

const BASE_URL = import.meta.env.BASE_URL

interface ViewSwitcherProps {
  viewMode: ViewMode
  onViewChange: (mode: ViewMode) => void
}

const viewOptions: Array<{ mode: ViewMode; icon: string; label: string }> = [
  { mode: 'timeline', icon: 'timeline.png', label: '时间线' },
  { mode: 'masonry', icon: 'masonry.png', label: '瀑布流' },
]

export function ViewSwitcher({ viewMode, onViewChange }: ViewSwitcherProps): React.ReactElement {
  return (
    <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
      {viewOptions.map(({ mode, icon, label }) => (
        <button
          key={mode}
          type="button"
          onClick={() => onViewChange(mode)}
          className={`
            flex items-center px-3 py-1.5 rounded-md text-sm font-medium
            transition-colors
            ${
              viewMode === mode
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }
          `}
          aria-label={label}
          aria-pressed={viewMode === mode}
        >
          <img src={`${BASE_URL}icons/${icon}`} alt="" className="w-5 h-5 mr-1" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}
