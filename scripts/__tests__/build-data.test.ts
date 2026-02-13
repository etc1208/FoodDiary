import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'
import { parseMarkdownFile, buildData } from '../build-data'

const TEST_DIR = path.join(__dirname, 'test-content')
const FOODS_DIR = path.join(TEST_DIR, 'foods')

describe('build-data', () => {
  beforeEach(() => {
    fs.mkdirSync(FOODS_DIR, { recursive: true })
  })

  afterEach(() => {
    fs.rmSync(TEST_DIR, { recursive: true, force: true })
  })

  describe('parseMarkdownFile', () => {
    it('should parse a valid markdown file', () => {
      const filePath = path.join(FOODS_DIR, '2024-01-15-test.md')
      fs.writeFileSync(filePath, `---
name: 红烧肉
date: 2024-01-15
tags:
  - 家常菜
  - 肉类
image: hongshao-rou.jpg
---

这是一道美味的红烧肉。
`)

      const result = parseMarkdownFile(filePath)

      expect(result.id).toBe('2024-01-15-test')
      expect(result.name).toBe('红烧肉')
      expect(result.date).toBe('2024-01-15')
      expect(result.tags).toEqual(['家常菜', '肉类'])
      expect(result.image).toBe('hongshao-rou.jpg')
      expect(result.description).toBe('这是一道美味的红烧肉。')
    })
  })

  describe('buildData', () => {
    it('should sort items by date descending', () => {
      const file1 = path.join(FOODS_DIR, '2024-01-10-old.md')
      const file2 = path.join(FOODS_DIR, '2024-01-20-new.md')

      fs.writeFileSync(file1, `---
name: 旧菜
date: 2024-01-10
tags: [家常菜]
image: old.jpg
---
描述1
`)
      fs.writeFileSync(file2, `---
name: 新菜
date: 2024-01-20
tags: [甜品]
image: new.jpg
---
描述2
`)

      const result = buildData(FOODS_DIR)

      expect(result.items[0].name).toBe('新菜')
      expect(result.items[1].name).toBe('旧菜')
    })

    it('should extract unique tags', () => {
      const file1 = path.join(FOODS_DIR, '2024-01-10-a.md')
      const file2 = path.join(FOODS_DIR, '2024-01-20-b.md')

      fs.writeFileSync(file1, `---
name: 菜A
date: 2024-01-10
tags: [家常菜, 肉类]
image: a.jpg
---
描述
`)
      fs.writeFileSync(file2, `---
name: 菜B
date: 2024-01-20
tags: [家常菜, 甜品]
image: b.jpg
---
描述
`)

      const result = buildData(FOODS_DIR)

      expect(result.allTags).toContain('家常菜')
      expect(result.allTags).toContain('肉类')
      expect(result.allTags).toContain('甜品')
      expect(result.allTags.filter(t => t === '家常菜')).toHaveLength(1)
    })

    it('should return empty data for empty directory', () => {
      const result = buildData(FOODS_DIR)

      expect(result.items).toEqual([])
      expect(result.allTags).toEqual([])
    })
  })
})
