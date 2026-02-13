import { useTheme } from '../hooks/useTheme'

import type { Theme } from '../types/food'

const themeIcons: Record<Theme, string> = {
  light: '☀️',
  dark: '🌙',
  system: '💻',
}

const themeLabels: Record<Theme, string> = {
  light: '浅色',
  dark: '深色',
  system: '跟随系统',
}

const themeOrder: Theme[] = ['light', 'dark', 'system']

export function Header(): React.ReactElement {
  const { theme, setTheme } = useTheme()

  const cycleTheme = (): void => {
    const currentIndex = themeOrder.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themeOrder.length
    setTheme(themeOrder[nextIndex])
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          美食日记
        </h1>

        <button
          type="button"
          onClick={cycleTheme}
          className="flex items-center px-3 py-1.5 rounded-lg text-sm
            bg-gray-100 dark:bg-gray-800
            text-gray-700 dark:text-gray-300
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition-colors"
          aria-label={`当前主题：${themeLabels[theme]}，点击切换`}
        >
          <span className="mr-1.5">{themeIcons[theme]}</span>
          <span className="hidden sm:inline">{themeLabels[theme]}</span>
        </button>
      </div>
    </header>
  )
}
