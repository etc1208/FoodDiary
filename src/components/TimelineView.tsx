import { FoodCard } from './FoodCard'
import { groupByDate } from '../utils/groupByDate'

import type { FoodItem } from '../types/food'

interface TimelineViewProps {
  foods: FoodItem[]
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}年${month}月${day}日`
}

export function TimelineView({ foods }: TimelineViewProps): React.ReactElement {
  const groupedFoods = groupByDate(foods)
  const dates = Object.keys(groupedFoods)

  return (
    <div className="relative">
      {/* 时间轴线 - 移动端左侧，桌面端中间 */}
      <div
        className="
          absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5
          bg-gray-200 dark:bg-gray-700
          md:transform md:-translate-x-1/2
        "
        aria-hidden="true"
      />

      <div className="space-y-8">
        {dates.map((date, dateIndex) => (
          <div key={date} className="relative">
            {/* 日期标题 */}
            <div className="flex items-center mb-4 ml-10 md:ml-0 md:justify-center">
              {/* 时间轴圆点 */}
              <div
                className="
                  absolute left-3 md:left-1/2 w-3 h-3 rounded-full
                  bg-gray-400 dark:bg-gray-500
                  md:transform md:-translate-x-1/2
                "
                aria-hidden="true"
              />
              <time
                dateTime={date}
                className="
                  px-3 py-1 rounded-full text-sm font-medium
                  bg-gray-100 dark:bg-gray-800
                  text-gray-700 dark:text-gray-300
                "
              >
                {formatDate(date)}
              </time>
            </div>

            {/* 卡片列表 */}
            <div className="space-y-4 ml-10 md:ml-0">
              {groupedFoods[date].map((food, foodIndex) => {
                const isEven = (dateIndex * 100 + foodIndex) % 2 === 0
                return (
                  <div
                    key={food.id}
                    className={`
                      md:w-[calc(50%-2rem)]
                      ${isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}
                    `}
                  >
                    <FoodCard food={food} />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
