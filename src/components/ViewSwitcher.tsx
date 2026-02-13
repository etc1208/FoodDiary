import type { ViewMode } from '../types/food'

interface ViewSwitcherProps {
  viewMode: ViewMode
  onViewChange: (mode: ViewMode) => void
}

const viewOptions: Array<{ mode: ViewMode; icon: string; label: string }> = [
  { mode: 'timeline', icon: '📅', label: '时间线' },
  { mode: 'masonry', icon: '🧱', label: '瀑布流' },
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
          <span className="mr-1">{icon}</span>
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}
