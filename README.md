# 🚀 Futuristic Cyberpunk Portfolio (賽博龐克風格作品集)

## 專案概述

這是一個以 **賽博龐克 (Cyberpunk)** 為視覺主題的頂級個人作品集網站。整體設計採用深邃黑背景 (`#050505`)，搭配霓虹強調色 (青色、紫色、綠色)、毛玻璃特效 (Glassmorphism)、3D 粒子背景，以及流暢的 Framer Motion 動畫，打造出極具沉浸感與科技感的視覺體驗。

## 核心技術棧

| 類別 | 技術與工具 | 用途 |
|----------|---------|---------|
| **框架** | **React 18 + Vite** | 極速開發環境與現代化構建 |
| **型別系統** | **TypeScript** | 提供嚴謹的型別安全與開發體驗 |
| **樣式** | **Tailwind CSS v3** | Utility-first 樣式設計與暗黑模式支援 |
| **3D 引擎** | **@react-three/fiber + drei** | 構建 3D 粒子星空背景 (`ParticleField`) |
| **後處理** | **@react-three/postprocessing** | 實現 Bloom 霓虹發光特效 |
| **動畫** | **Framer Motion** | 頁面轉場、滾動視差與微互動動畫 |
| **圖標** | **lucide-react** | 簡潔現代的 SVG 圖標庫 |
| **狀態管理** | **zustand** | 輕量級全域狀態管理 (游標狀態、選單控制) |

## 核心功能與頁面區塊

本專案將元件高度模組化，並分為以下主要區塊：

1. **Hero (首頁橫幅)**：具備全螢幕 3D 粒子背景、打字機特效 (`TypeWriter`) 與霓虹按鈕 (`NeonButton`)，強烈吸引使用者目光。
2. **Introduction (網站介紹)**：說明本站的設計理念與所使用的核心技術。
3. **About (關於我)**：使用毛玻璃卡片 (`GlassCard`) 介紹個人背景與核心開發信念。
4. **Skills (專業技能)**：採用六角形蜂巢網格 (`HexagonSkill`) 動態展示技術能力。
5. **Projects (專案經歷)**：具備 3D 視差傾斜效果 (`TiltCard`) 的專案展示區塊，支援分類篩選。
6. **Mini Game (小遊戲)**：內建經典「貪食蛇」遊戲，支援多種難度與畫布尺寸設定，提供額外的互動趣味性。
7. **Contact (聯絡我)**：精心設計的終端機 (Terminal) 風格聯絡表單，增添極客 (Geek) 氛圍。
8. **全域元件**：包含客製化光暈游標 (`CustomCursor`)、毛玻璃導覽列 (`Navbar`) 與回到頂部按鈕 (`ScrollToTop`)。

## 資料結構

所有個人資料、專案細節與技能清單皆集中管理於 `src/data/portfolio.ts`，方便未來快速抽換或擴充內容，實現資料與視圖分離。

## 本地開發與運行指南

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動開發伺服器
```bash
npm run dev
```

### 3. 專案編譯與打包
```bash
npm run build
```

### 4. 部署至 GitHub Pages
```bash
npm run deploy
```

---

> **開發備註**：本專案已全面使用 TypeScript 進行重構，並移除原有計畫中的 GSAP 相依，所有複雜動畫皆已統一由 **Framer Motion** 實作，以降低套件體積並提升整體效能。
