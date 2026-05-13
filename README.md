# 🚀 Futuristic Cyberpunk Portfolio (賽博龐克風格作品集)

## 專案概述

這是一個以 **賽博龐克 (Cyberpunk)** 為視覺主題的頂級個人作品集網站。整體設計採用深邃黑背景 (`#050505`)，搭配霓虹強調色 (青色、紫色、綠色)、毛玻璃特效 (Glassmorphism)、3D 粒子背景，以及流暢的 Framer Motion 動畫，打造出極具沉浸感與科技感的視覺體驗。

本專案旨在展示對於前端架構、3D 渲染 (Three.js) 以及現代化 UI/UX 互動設計的掌握能力。

---

## 核心技術棧

| 類別 | 技術與工具 | 用途 |
|----------|---------|---------|
| **框架** | **React 18 + Vite** | 極速開發環境與現代化建置 |
| **型別系統** | **TypeScript** | 提供嚴謹的型別安全、自動完成與開發體驗 |
| **樣式** | **Tailwind CSS v3** | Utility-first 樣式設計與客製化暗黑模式支援 |
| **3D 引擎** | **@react-three/fiber + drei** | 構建 3D 粒子星空背景 (`ParticleField`) |
| **後處理** | **@react-three/postprocessing** | 實現 Bloom 霓虹發光特效 |
| **動畫** | **Framer Motion** | 頁面轉場、滾動視差、元件進場與微互動動畫 |
| **圖標** | **lucide-react** | 簡潔現代的 SVG 圖標庫 |
| **狀態管理** | **zustand** | 輕量級全域狀態管理 (游標狀態、選單控制、載入畫面) |

---

## 📂 專案目錄結構

```text
d:\AI_Portfolio\
├── public/                  # 靜態資源
├── src/
│   ├── assets/              # 圖片、字型等靜態資源
│   ├── components/          # 核心 React 元件 (高度模組化)
│   │   ├── layout/          # 全域佈局元件 (Navbar, Footer, Cursor)
│   │   ├── sections/        # 各頁面主要區塊 (Hero, About, Projects 等)
│   │   ├── three/           # Three.js 3D 場景與特效元件
│   │   └── ui/              # 可複用之底層 UI 元件 (Buttons, Cards)
│   ├── data/                # 專案資料層 (集中管理內容)
│   ├── hooks/               # 自訂 React Hooks
│   ├── store/               # Zustand 全域狀態管理
│   ├── styles/              # 全域 CSS 與 Tailwind 設定
│   ├── App.tsx              # 主程式切入點 (組裝所有區塊)
│   └── main.tsx             # 應用程式掛載點
├── package.json             # 依賴管理
├── tailwind.config.js       # Tailwind 客製化主題設定
├── tsconfig.json            # TypeScript 編譯設定
└── vite.config.js           # Vite 打包與開發伺服器設定
```

---

## 🧩 核心架構與元件分析

本專案將元件進行了極致的模組化拆分，確保高內聚與低耦合，以下為所有核心模組的完整分析：

### 1. 全域與佈局元件 (Layout)
*   **`App.tsx`**：應用的核心編排者。內建 `LoadingScreen` (進度條載入畫面)，並負責依序掛載 3D 背景、全域游標、導覽列及所有 Section 區塊。
*   **`Navbar.tsx`**：採用毛玻璃背景 (Glassmorphism) 的固定式導覽列。結合 Intersection Observer，能根據滾動位置自動高亮當前所在的區塊，並支援行動版側邊選單動畫。
*   **`Footer.tsx`**：簡約的頁尾元件，包含動態生成的社群連結與版權宣告。
*   **`CustomCursor.tsx`**：取代系統預設游標。使用 Framer Motion 的 `useSpring` 實現帶有物理慣性的雙層光環游標，並根據使用者互動狀態 (hover, default) 動態改變顏色與大小。

### 2. 3D 視覺引擎 (Three.js)
*   **`Scene.tsx`**：Three.js 的畫布容器 (`<Canvas>`)。設定了抗鋸齒、相機視角，並整合 `@react-three/postprocessing` 的 `Bloom` (光暈) 特效，營造出賽博龐克的霓虹氛圍。
*   **`ParticleField.tsx`**：使用 `BufferGeometry` 與 `Points` 建立高效能的 3D 粒子星空。粒子分為多個深度層次 (近、中、遠)，並會根據滑鼠位置產生平滑的視差移動 (Parallax) 效果。

### 3. 頁面區塊 (Sections)
*   **`Hero.tsx` (首頁橫幅)**：第一視覺焦點。整合了打字機特效 (`TypeWriter`) 顯示職稱，並帶有呼吸燈效的「目前可接案」狀態徽章，引導使用者往下滾動。
*   **`Introduction.tsx` (網站介紹)**：說明本站的開發技術與設計理念。以卡片網格方式展示 React、Three.js、Framer Motion 等核心技術特點。
*   **`About.tsx` (關於我)**：使用不對稱網格佈局，左側為詳細的背景與信念介紹，右側則以視覺化的圖標數據卡展示成就與特質。
*   **`Skills.tsx` (專業技能)**：採用客製化的六角形元件 (`HexagonSkill`) 排列技術堆疊。支援分類頁籤 (如：前端、後端、工具)，切換時帶有流暢的過渡動畫。
*   **`Projects.tsx` (專案經歷)**：展示過往作品的網格區域。支援動態分類篩選，每張專案卡片皆具備 3D 傾斜互動效果 (`TiltCard`)。
*   **`MiniGame.tsx` (小遊戲)**：內建完整的經典貪食蛇遊戲，使用 HTML5 Canvas 繪製。支援多種難度 (速度) 與畫布尺寸切換，並實作了高分紀錄與漸層霓虹特效。
*   **`Contact.tsx` (聯絡我)**：極具巧思的「終端機 (Terminal)」風格聯絡表單。輸入框模擬命令列輸入，送出按鈕帶有狀態模擬動畫，完美契合工程師主題。

### 4. 共用 UI 元件 (UI Library)
*   **`GlassCard.tsx`**：全站通用的毛玻璃卡片容器，封裝了 `backdrop-blur` 與客製化邊框光暈邏輯。
*   **`NeonButton.tsx`**：帶有霓虹漸層邊框與懸停放光效果的互動按鈕。
*   **`TiltCard.tsx`**：封裝了隨滑鼠移動產生 3D 透視傾斜 (3D Tilt) 的物理特效容器。
*   **`HexagonSkill.tsx`**：繪製具有科技感的六角形技能圖標，懸停時會產生脈衝放大效果。
*   **`TypeWriter.tsx`**：支援多字串循環、可自訂打字與刪除速度的打字機文字元件。
*   **`SectionTitle.tsx`**：標準化的區塊標題元件，帶有雙語 (中/英) 顯示與漸層裝飾線。
*   **`ScrollToTop.tsx`**：當頁面向下滾動超過一定距離時出現的懸浮按鈕，點擊後平滑滾動回頂部。

### 5. 狀態與資料層 (State & Data)
*   **`store/useStore.ts`**：基於 Zustand 建構，負責管理全域狀態，例如：網站載入進度 (`isLoaded`)、游標互動樣式 (`cursorVariant`)、當前活躍區塊 (`activeSection`) 以及行動版選單的開關。
*   **`data/portfolio.ts`**：**Single Source of Truth (單一資料來源)**。將所有文案、專案列表、技能清單與社群連結抽離至此檔案，未來更新履歷完全不需更動 UI 程式碼。
*   **`hooks/useMousePosition.ts`**：自訂 Hook，用於追蹤滑鼠的正規化座標 (Normalized Position)，提供給 3D 場景產生視差運算。

---

## ⚡ 效能最佳化策略

本專案在追求極致視覺特效的同時，亦實作了多項效能最佳化措施：
1. **3D 渲染優化**：粒子系統採用 `Float32Array` 與 `BufferGeometry` 進行底層運算，避免 React 重繪 (Re-render) 造成的效能瓶頸，確保 60 FPS 運行。
2. **條件式特效渲染**：全域游標 (`CustomCursor`) 會偵測裝置類型，在觸控螢幕 (行動裝置) 上自動停用，以節省資源並提升體驗。
3. **按需載入動畫**：大量依賴 Framer Motion 的 `whileInView` 屬性，確保動畫僅在元素進入使用者可視範圍 (Viewport) 時才觸發。
4. **模組化與 Tree Shaking**：採用 Vite 作為構建工具，配合 ES Modules，確保生產環境打包時能自動剔除未使用的程式碼。

---

## 🛠️ 本地開發與運行指南

### 1. 安裝依賴
請確保您的環境已安裝 Node.js (建議 v18 以上版本)，然後執行：
```bash
npm install
```

### 2. 啟動開發伺服器
```bash
npm run dev
```
啟動後，請於瀏覽器開啟 `http://localhost:5173` 進行預覽。

### 3. 專案編譯與打包
準備部署至生產環境時，執行以下指令建立最佳化靜態檔案：
```bash
npm run build
```
編譯結果將產出於 `dist` 目錄。

### 4. 部署至 GitHub Pages
本專案已配置好 Vite 與 gh-pages 部署腳本，若需發布至 GitHub Pages，請執行：
```bash
npm run deploy
```
*(注意：執行此指令前，請確保已在 GitHub 儲存庫中設定好適當的權限與 Pages 配置)*
