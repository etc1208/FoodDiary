import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import { glob } from 'glob'

import type { FoodItem, FoodsData } from '../src/types/food'

export function parseMarkdownFile(filePath: string): FoodItem {
  const content = fs.readFileSync(filePath, 'utf-8')
  const { data, content: body } = matter(content)

  const id = path.basename(filePath, '.md')

  let dateStr: string
  if (data.date instanceof Date) {
    dateStr = data.date.toISOString().split('T')[0]
  } else {
    dateStr = String(data.date)
  }

  return {
    id,
    name: data.name,
    description: body.trim(),
    tags: data.tags || [],
    date: dateStr,
    image: data.image,
  }
}

export function buildData(contentDir: string): FoodsData {
  const pattern = path.join(contentDir, '*.md').replace(/\\/g, '/')
  const files = glob.sync(pattern)

  const items = files.map((file) => parseMarkdownFile(file))

  items.sort((a, b) => b.date.localeCompare(a.date))

  const allTags = [...new Set(items.flatMap((item) => item.tags))]

  return { items, allTags }
}

function main(): void {
  const contentDir = path.join(process.cwd(), 'content', 'foods')
  const outputPath = path.join(process.cwd(), 'src', 'data', 'foods.json')

  const data = buildData(contentDir)

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))

  console.log(`Generated ${data.items.length} food items with ${data.allTags.length} tags`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
