# 美食日记移动端网站 - 实施计划

> 基于 [design.md](./design.md) 生成
> **执行模式**：按 Phase 分步执行，每完成一个 Phase 后暂停等待确认

## 实施原则

- **TDD 优先**：可测试的逻辑模块先写测试
- **Phase 级确认**：完成一个 Phase 后暂停等待确认
- **逐步勾选**：每完成一个操作步骤立即勾选

---

## Phase 1: MVP - 项目初始化与基础框架

> 目标：搭建项目基础结构，配置开发环境

### Task 1.1: [Setup] 创建 Vite + React + TypeScript 项目

- [x] 运行 `npm create vite@latest . -- --template react-ts` 创建项目
- [x] 运行 `pnpm install` 安装依赖
- [x] 运行 `pnpm run dev` 验证项目启动成功
- [x] 验收：浏览器访问 localhost 显示 Vite + React 默认页面

### Task 1.2: [Setup] 配置 Tailwind CSS

- [x] 运行 `pnpm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss`
- [x] 创建 `postcss.config.js` 配置 PostCSS 插件
- [x] 修改 `src/index.css`，添加 Tailwind v4 指令和 dark 变体
- [x] 验收：构建成功，Tailwind 类名生效

### Task 1.3: [Setup] 创建项目目录结构

- [x] 创建 `content/foods/` 目录（存放 Markdown 文件）
- [x] 创建 `public/images/` 目录（存放美食图片）
- [x] 创建 `src/components/` 目录
- [x] 创建 `src/hooks/` 目录
- [x] 创建 `src/types/` 目录
- [x] 创建 `src/data/` 目录
- [x] 创建 `scripts/` 目录
- [x] 验收：目录结构与 design.md 一致

### Task 1.4: [Setup] 创建类型定义文件

- [x] 创建 `src/types/food.ts`
- [x] 定义 `FoodItem` 接口：id, name, description, tags, date, image
- [x] 定义 `FoodsData` 接口：items, allTags
- [x] 定义 `ViewMode` 类型：'timeline' | 'masonry' | 'card3d' | 'carousel3d'
- [x] 定义 `Theme` 类型：'light' | 'dark' | 'system'
- [x] 验收：TypeScript 编译无错误

---

## Phase 2: MVP - 数据层

> 目标：实现 Markdown 解析脚本，构建时生成 JSON 数据

### Task 2.1: [Setup] 安装数据解析依赖

- [x] 运行 `pnpm install -D gray-matter glob tsx vitest`
- [x] 验收：package.json 中包含这些依赖

### Task 2.2: [TDD] 实现数据解析脚本

**[Red] 编写测试**

- [x] 创建 `scripts/__tests__/build-data.test.ts`
- [x] 用例1：解析单个 Markdown 文件 → 返回正确的 FoodItem 对象
- [x] 用例2：多个文件按日期倒序排列 → 最新日期在前
- [x] 用例3：提取所有标签去重 → allTags 不重复
- [x] 用例4：空目录返回空数据
- [x] 运行测试确认测试失败（红色）

**[Green] 实现功能**

- [x] 创建 `scripts/build-data.ts`
- [x] 实现 `parseMarkdownFile(filePath)` - 使用 gray-matter 解析单个文件
- [x] 实现 `buildData()` - 扫描所有 md 文件，排序，提取标签
- [x] 实现 `main()` - 写入 JSON 到 `src/data/foods.json`
- [x] 运行测试确认通过（绿色）

**[Refactor] 重构优化**

- [x] 处理 Date 对象转字符串逻辑
- [x] 运行测试确认仍通过

### Task 2.3: [Setup] 配置构建脚本

- [x] 修改 `package.json`，配置 `build:data` 脚本
- [x] 修改 `dev` 和 `build` 脚本先执行数据构建
- [x] 验收：运行 `pnpm run build:data` 成功执行

### Task 2.4: [Setup] 创建示例数据

- [x] 创建 `content/foods/2024-01-15-hongshao-rou.md`，包含完整 frontmatter
- [x] 创建 `content/foods/2024-01-20-tiramisu.md`，包含完整 frontmatter
- [x] 添加示例占位图片 `public/images/placeholder.svg`
- [x] 运行 `pnpm run build:data`
- [x] 验收：`src/data/foods.json` 生成且内容正确

---

## Phase 3: MVP - 基础组件

> 目标：实现核心 UI 组件，包括卡片、标签筛选、主题切换

### Task 3.1: [Setup] 实现 useTheme Hook

- [x] 创建 `src/hooks/useTheme.ts`
- [x] 实现读取 localStorage 中保存的主题
- [x] 实现监听系统 `prefers-color-scheme` 变化
- [x] 实现 `setTheme()` 函数，更新 localStorage 和 HTML class
- [x] 实现 `resolvedTheme` 计算（system 模式下返回实际主题）
- [x] 验收：TypeScript 编译通过

### Task 3.2: [Setup] 实现 FoodCard 组件

- [x] 创建 `src/components/FoodCard.tsx`
- [x] 实现卡片布局：图片、名称、描述、标签、日期
- [x] 实现图片懒加载 `loading="lazy"`
- [x] 实现图片加载失败时显示占位图
- [x] 实现 variant 属性支持：default, compact, featured
- [x] 验收：组件渲染正确，支持深浅色

### Task 3.3: [Setup] 实现 Header 组件

- [x] 创建 `src/components/Header.tsx`
- [x] 实现网站标题展示
- [x] 实现主题切换按钮（三种模式：light/dark/system）
- [x] 使用 useTheme hook
- [x] 验收：点击按钮可切换主题

### Task 3.4: [Setup] 实现 TagFilter 组件

- [x] 创建 `src/components/TagFilter.tsx`
- [x] 接收 `allTags` 和 `activeTag` props
- [x] 实现标签列表横向滚动展示
- [x] 实现点击标签选中/取消选中
- [x] 实现"全部"选项
- [x] 验收：点击标签正确触发回调

### Task 3.5: [Setup] 实现 EmptyState 组件

- [x] 创建 `src/components/EmptyState.tsx`
- [x] 实现空状态图标和提示文字
- [x] 支持不同场景的文案（无数据 vs 筛选无结果）
- [x] 验收：组件渲染正确

---

## Phase 4: MVP - 时间线展示

> 目标：实现时间线展示模式，按日期分组展示美食卡片

### Task 4.1: [TDD] 实现日期分组逻辑

**[Red] 编写测试**

- [x] 创建 `src/utils/__tests__/groupByDate.test.ts`
- [x] 用例1：相同日期的记录分到同一组
- [x] 用例2：不同日期的记录分到不同组
- [x] 用例3：空数组返回空对象
- [x] 用例4：按日期倒序排列组
- [x] 运行测试确认失败（红色）

**[Green] 实现功能**

- [x] 创建 `src/utils/groupByDate.ts`
- [x] 实现 `groupByDate(foods: FoodItem[])` - 返回 `Record<string, FoodItem[]>`
- [x] 运行测试确认通过（绿色）

**[Refactor] 重构优化**

- [x] 代码简洁，无需额外重构
- [x] 运行测试确认仍通过

### Task 4.2: [Setup] 实现 TimelineView 组件

- [x] 创建 `src/components/TimelineView.tsx`
- [x] 使用 `groupByDate` 分组数据
- [x] 实现日期标题样式
- [x] 实现左侧时间轴线
- [x] 实现卡片列表布局
- [x] 验收：时间线展示正确

### Task 4.3: [Setup] 响应式布局适配

- [x] 移动端：单列卡片流
- [x] 桌面端：卡片交错左右排列
- [x] 使用 Tailwind 响应式类名
- [x] 验收：不同屏幕尺寸布局正确

---

## Phase 5: MVP - 整合与部署

> 目标：整合所有组件，配置部署流程

### Task 5.1: [Setup] 实现 App 根组件

- [x] 修改 `src/App.tsx`
- [x] 导入 foods.json 数据
- [x] 实现 `activeTag` 状态管理
- [x] 实现 `filteredFoods` 计算逻辑
- [x] 组合 Header、TagFilter、TimelineView、EmptyState
- [x] 验收：完整页面渲染正确

### Task 5.2: [Setup] 配置入口文件

- [x] 修改 `src/main.tsx`，渲染 App 组件
- [x] 修改 `index.html`，设置中文 lang 和合适的 title
- [x] 验收：`pnpm run dev` 启动后页面正常

### Task 5.3: [Setup] 配置 Vite 构建

- [x] 修改 `vite.config.ts`，配置 base 路径（GitHub Pages 需要）
- [x] 运行 `pnpm run build` 验证构建成功
- [x] 验收：dist 目录生成正确

### Task 5.4: [Setup] 配置 GitHub Actions

- [x] 创建 `.github/workflows/deploy.yml`
- [x] 配置 checkout、setup-node、pnpm install、pnpm run build 步骤
- [x] 配置 deploy-pages 部署步骤
- [x] 验收：配置文件语法正确

### Task 5.5: [Setup] MVP 验收测试

- [x] 验证时间线展示按日期倒序
- [x] 验证标签筛选功能正常
- [x] 验证深浅色切换正常
- [x] 验证移动端布局正常
- [x] 验证图片懒加载生效
- [x] 验证空状态显示正确
- [x] 验收：所有 MVP 功能正常工作

---

> ⚠️ 完成 Phase 5（MVP）后暂停，等待确认

---

## Phase 6: 瀑布流布局

> 目标：实现 Pinterest 风格的瀑布流展示模式

### Task 6.1: [Setup] 实现 MasonryView 组件

- [x] 创建 `src/components/MasonryView.tsx`
- [x] 使用 CSS columns 实现瀑布流布局
- [x] 移动端 2 列，平板 3 列，桌面 4 列
- [x] 使用 FoodCard compact 变体
- [x] 验收：瀑布流布局正确

### Task 6.2: [Setup] 响应式列数适配

- [x] 使用 Tailwind 断点实现响应式列数
- [x] 处理 column-break 避免卡片被截断
- [x] 验收：不同屏幕尺寸列数正确

---

## Phase 7: 3D 卡片浮动效果

> 目标：实现卡片随鼠标/触摸旋转的 3D 效果

### Task 7.1: [TDD] 实现 3D 性能检测

**[Red] 编写测试**

- [x] 创建 `src/utils/__tests__/shouldEnable3D.test.ts`
- [x] 用例1：支持 3D 且非低端设备 → 返回 true
- [x] 用例2：不支持 3D transforms → 返回 false
- [x] 用例3：用户偏好减少动画 → 返回 false
- [x] 用例4：低端设备 → 返回 false
- [x] 运行测试确认失败（红色）

**[Green] 实现功能**

- [x] 创建 `src/utils/shouldEnable3D.ts`
- [x] 实现 `shouldEnable3D()` - 检测设备能力
- [x] 运行测试确认通过（绿色）

**[Refactor] 重构优化**

- [x] 代码简洁，无需额外重构
- [x] 运行测试确认仍通过

### Task 7.2: [Setup] 实现 Card3DView 组件

- [x] 创建 `src/components/Card3DView.tsx`
- [x] 实现卡片网格布局
- [x] 实现鼠标移动跟踪计算旋转角度
- [x] 实现 CSS 3D transform 效果
- [x] 实现触摸设备支持
- [x] 实现低端设备降级为普通布局
- [x] 验收：3D 效果在支持的设备上正常工作

---

## Phase 8: 展示模式切换

> 目标：实现多种展示模式之间的切换

### Task 8.1: [Setup] 实现 ViewSwitcher 组件

- [x] 创建 `src/components/ViewSwitcher.tsx`
- [x] 实现三种模式图标按钮：时间线、瀑布流、3D 卡片
- [x] 当前模式高亮显示
- [x] 验收：点击按钮正确触发回调

### Task 8.2: [Setup] 整合展示模式到 App

- [x] 修改 `src/App.tsx`
- [x] 添加 `viewMode` 状态
- [x] 根据 viewMode 渲染对应的 View 组件
- [x] 添加 ViewSwitcher 到筛选栏
- [x] 验收：模式切换功能正常

---

> ⚠️ 完成 Phase 8（瀑布流 + 3D 卡片）后暂停，等待确认

---

## Phase 9: 3D 圆柱/球体展示

> 目标：实现卡片环绕成圆柱的 3D 展示效果

### Task 9.1: [Setup] 实现 Carousel3DView 组件

- [x] 创建 `src/components/Carousel3DView.tsx`
- [x] 计算每张卡片的 rotateY 角度
- [x] 实现 translateZ 设置半径
- [x] 实现整体容器旋转动画
- [x] 实现触摸滑动切换
- [x] 实现左右导航按钮
- [x] 验收：3D 轮播效果正常

### Task 9.2: [Setup] 更新 ViewSwitcher

- [x] 添加 3D 轮播模式选项
- [x] 更新 App 组件支持新模式
- [x] 验收：四种模式都能正常切换

---

## Phase 10: 性能优化与最终验收

> 目标：优化性能，完成最终验收

### Task 10.1: [Setup] 图片懒加载优化

- [x] 使用原生 loading="lazy" + 状态管理
- [x] 添加图片加载骨架屏（animate-pulse）
- [x] 验收：图片懒加载顺畅

### Task 10.2: [Setup] 3D 效果按需加载

- [x] shouldEnable3D 检测设备能力
- [x] 低端设备自动降级为普通布局
- [x] 验收：按需降级正常

### Task 10.3: [Setup] 移动端性能调优

- [x] 低端设备（hardwareConcurrency <= 2）禁用 3D
- [x] prefers-reduced-motion 禁用 3D
- [x] CSS 3D transforms 无额外 JS 开销
- [x] 验收：移动端滚动流畅

### Task 10.4: [Setup] 最终验收测试

- [x] 验证时间线模式正常
- [x] 验证瀑布流模式正常
- [x] 验证 3D 卡片浮动效果正常
- [x] 验证 3D 轮播效果正常
- [x] 验证标签筛选功能正常
- [x] 验证深浅色模式切换正常
- [x] 验证移动端体验流畅
- [x] 验证 3D 效果降级正常
- [x] 运行 `pnpm run build` 确认构建成功
- [x] 验收：所有功能正常工作

---

> ⚠️ 完成 Phase 10（全部功能）后暂停，等待最终确认

---

## AI 执行指引

**任务执行**：
1. 按顺序执行各 Task
2. 每完成一个操作步骤，立即将 `[ ]` 改为 `[x]`
3. 使用 Edit 工具更新文档
4. 每完成一个 Task 的所有步骤后，汇报完成情况

**暂停时机**：
- 遇到 `> ⚠️ 完成 Phase N 后暂停` 时停止执行
- 等待用户确认后继续下一个 Phase

**TDD 顺序**：
[TDD] 任务严格遵守：Red（确认失败）→ Green（实现功能，确认通过）→ Refactor（确认仍通过）
