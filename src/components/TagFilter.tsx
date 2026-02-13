import { useState, useRef, useEffect } from 'react'

interface TagFilterProps {
  allTags: string[]
  activeTag: string | null
  onTagChange: (tag: string | null) => void
}

export function TagFilter({ allTags, activeTag, onTagChange }: TagFilterProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const displayLabel = activeTag ?? '全部标签'

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (tag: string | null) => {
    onTagChange(tag)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative flex-1">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-base font-medium text-gray-900 dark:text-white"
      >
        <span>{displayLabel}</span>
        <span className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 overflow-hidden">
          <button
            type="button"
            onClick={() => handleSelect(null)}
            className="w-full px-4 py-2.5 text-base text-left text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            全部标签
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleSelect(tag)}
              className={`w-full px-4 py-2.5 text-base text-left ${
                activeTag === tag
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
