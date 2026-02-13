interface TagFilterProps {
  allTags: string[]
  activeTag: string | null
  onTagChange: (tag: string | null) => void
}

export function TagFilter({ allTags, activeTag, onTagChange }: TagFilterProps): React.ReactElement {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex py-3 px-4 space-x-2">
        <button
          type="button"
          onClick={() => onTagChange(null)}
          className={`
            flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium
            transition-colors whitespace-nowrap
            ${
              activeTag === null
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          全部
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onTagChange(activeTag === tag ? null : tag)}
            className={`
              flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium
              transition-colors whitespace-nowrap
              ${
                activeTag === tag
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
