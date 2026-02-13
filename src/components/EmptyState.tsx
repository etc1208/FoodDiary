interface EmptyStateProps {
  type?: 'no-data' | 'no-results'
}

export function EmptyState({ type = 'no-data' }: EmptyStateProps): React.ReactElement {
  const isNoResults = type === 'no-results'

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl mb-4">
        {isNoResults ? '🔍' : '🍽️'}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {isNoResults ? '没有找到匹配的美食' : '还没有美食记录'}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        {isNoResults
          ? '试试选择其他标签，或查看全部美食'
          : '开始记录你的第一道美食吧！在 content/foods 目录下创建 Markdown 文件即可。'}
      </p>
    </div>
  )
}
