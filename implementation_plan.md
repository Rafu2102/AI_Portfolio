# 🚀 Futuristic Cyberpunk Portfolio — Implementation Plan

## Overview

Build an ultra-premium, visually stunning personal portfolio with a **Futuristic Tech / Subtle Cyberpunk** aesthetic. Deep dark backgrounds (#050505), neon accents (Cyan/Purple/Green), glassmorphism, 3D particle effects, and buttery-smooth animations throughout.

---

## Tech Stack

| Category | Library | Purpose |
|----------|---------|---------|
| Framework | **React 18 + Vite** | Fast dev server, modern bundling |
| Styling | **Tailwind CSS v3** | Utility-first styling, dark mode |
| 3D | **@react-three/fiber** + **@react-three/drei** + **@react-three/postprocessing** | 3D particle background, bloom effects |
| Animation | **Framer Motion** | Section transitions, scroll animations |
| Animation | **GSAP + ScrollTrigger** | Advanced scroll-based parallax |
| Icons | **lucide-react** | Clean SVG icons |
| State | **zustand** | Lightweight global state (cursor, theme) |

---

## Folder Structure

```
d:\AI 網頁\
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/                    # Static images, fonts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx         # Fixed glassmorphism navigation
│   │   │   ├── Footer.jsx         # Minimal footer
│   │   │   └── CustomCursor.jsx   # Global glowing cursor
│   │   ├── three/
│   │   │   ├── ParticleField.jsx  # 3D particle star field (InstancedMesh)
│   │   │   ├── Scene.jsx          # R3F Canvas wrapper + post-processing
│   │   │   └── NeuralNetwork.jsx  # Neural network line connections
│   │   ├── sections/
│   │   │   ├── Hero.jsx           # Hero section w/ typewriter + CTA
│   │   │   ├── About.jsx          # About Me glassmorphism cards
│   │   │   ├── Skills.jsx         # Hexagon grid skill visualization
│   │   │   ├── Projects.jsx       # 3D tilt project cards
│   │   │   └── Contact.jsx        # Terminal-style contact form
│   │   └── ui/
│   │       ├── GlassCard.jsx      # Reusable glassmorphism card
│   │       ├── NeonButton.jsx     # Neon-border glowing button
│   │       ├── TiltCard.jsx       # 3D tilt card wrapper
│   │       ├── HexagonSkill.jsx   # Single hexagon skill item
│   │       ├── TypeWriter.jsx     # Typewriter text effect
│   │       └── SectionTitle.jsx   # Reusable section heading
│   ├── hooks/
│   │   ├── useMousePosition.js    # Track mouse for cursor + parallax
│   │   └── useScrollAnimation.js  # GSAP scroll trigger helper
│   ├── data/
│   │   └── portfolio.js           # All personal data (skills, projects, etc.)
│   ├── store/
│   │   └── useStore.js            # Zustand store
│   ├── styles/
│   │   └── index.css              # Tailwind directives + custom CSS
│   ├── App.jsx                    # Main app (assembles sections)
│   └── main.jsx                   # Entry point
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## Proposed Changes

### Phase 1: Project Scaffold & Design System

#### [NEW] `package.json`
Dependencies:
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@react-three/fiber": "^8.17.0",
    "@react-three/drei": "^9.114.0",
    "@react-three/postprocessing": "^2.16.0",
    "three": "^0.170.0",
    "framer-motion": "^11.11.0",
    "gsap": "^3.12.5",
    "lucide-react": "^0.460.0",
    "zustand": "^5.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "vite": "^6.0.0"
  }
}
```

#### [NEW] `tailwind.config.js`
- Custom color palette: neon cyan (`#00F0FF`), neon purple (`#B026FF`), matrix green (`#39FF14`)
- Custom backdrop-blur, box-shadow, and animation utilities
- Font family: `Inter` + `JetBrains Mono` (monospace for terminal elements)

#### [NEW] `src/styles/index.css`
- Tailwind directives (`@tailwind base/components/utilities`)
- Custom cursor hide (`cursor: none`)
- Glassmorphism utility classes
- Scrollbar styling (thin, neon-colored)
- Glow text utilities
- Smooth scroll behavior

---

### Phase 2: Layout & Global Components

#### [NEW] `src/components/layout/CustomCursor.jsx`
- Dual-circle cursor (outer ring + inner dot)
- Follows mouse with spring physics (Framer Motion)
- Outer ring scales up on hover over interactive elements
- Glowing trail effect via CSS box-shadow
- Hidden on mobile (touch devices)

#### [NEW] `src/components/layout/Navbar.jsx`
- Fixed top, glassmorphism background
- Logo/name on left, nav links on right
- Links: Home, About, Skills, Projects, Contact
- Smooth scroll on click
- Mobile hamburger menu with slide-in animation
- Active section highlight based on scroll position

#### [NEW] `src/components/layout/Footer.jsx`
- Minimal footer with social links (GitHub, LinkedIn, Email)
- Neon divider line at top

---

### Phase 3: 3D Background (Hero)

#### [NEW] `src/components/three/ParticleField.jsx`
- ~3000 particles using `Points` + `BufferGeometry`
- Additive blending for neon glow
- Particles drift slowly; react to mouse position (parallax)
- Color gradient: cyan → purple
- GPU-friendly: direct mutation in `useFrame`, no setState

#### [NEW] `src/components/three/Scene.jsx`
- `<Canvas>` wrapper with proper camera settings
- `Suspense` fallback
- Post-processing: `Bloom` (UnrealBloomPass) for glow
- Responsive sizing, fixed behind content (`position: fixed`)

---

### Phase 4: Hero Section

#### [NEW] `src/components/ui/TypeWriter.jsx`
- Typewriter effect with blinking cursor
- Supports multiple strings (cycle through)
- Configurable speed, delay between strings

#### [NEW] `src/components/ui/NeonButton.jsx`
- Animated gradient border (flowing light effect)
- Hover: scale up, glow intensifies, subtle shake
- Click ripple effect

#### [NEW] `src/components/sections/Hero.jsx`
- Full viewport height
- 3D scene as background
- Large title with text-gradient (cyan → purple)
- Typewriter subtitle cycling through roles
- Two CTA buttons: "View My Work" + "Contact Me"
- Scroll-down indicator (animated chevron)

---

### Phase 5: About Me Section

#### [NEW] `src/components/ui/GlassCard.jsx`
- `backdrop-blur-xl` + semi-transparent background
- Gradient border (1px with neon colors)
- Hover: border glow intensifies

#### [NEW] `src/components/sections/About.jsx`
- Two-column layout (text | visual)
- Left: glassmorphism card with bio text
- Right: decorative element (profile image placeholder or 3D element)
- Scroll-triggered fade-up + stagger animations (Framer Motion)
- Key highlights in pill/badge format

---

### Phase 6: Skills Section

#### [NEW] `src/components/ui/HexagonSkill.jsx`
- Hexagon-shaped container with neon border
- Icon + skill name + proficiency level
- Hover: scale up, glow pulse, rotate slightly
- Proficiency shown as fill percentage inside hexagon

#### [NEW] `src/components/sections/Skills.jsx`
- Hexagon grid layout (CSS grid with offset rows)
- Categories: Languages, AI/ML, Game Dev, Tools
- Scroll-triggered stagger entrance
- Interactive: hover reveals detail tooltip

---

### Phase 7: Projects Section

#### [NEW] `src/components/ui/TiltCard.jsx`
- 3D perspective tilt following mouse position
- Calculated via `onMouseMove` with transform matrix
- Glowing border that shifts based on tilt angle
- Smooth spring animation on enter/leave

#### [NEW] `src/components/sections/Projects.jsx`
- Grid of TiltCards (2-3 per row on desktop)
- Each card: project image, title, description, tech pills
- Image zoom on hover
- Tech pills with neon styling
- Links: Live Demo + GitHub

---

### Phase 8: Contact Section

#### [NEW] `src/components/sections/Contact.jsx`
- Terminal/hacker aesthetic
- Monospace font, green text on dark background
- Input fields styled as terminal prompts (`> name: _`)
- Submit button with binary code loading animation
- Form fields: Name, Email, Message
- Social links row below form

---

### Phase 9: Polish & Data

#### [NEW] `src/data/portfolio.js`
- Centralized data file for all content
- Skills with categories, icons, proficiency levels
- Projects with titles, descriptions, tech stacks, images
- Personal info (name, bio, social links)

#### [NEW] `src/hooks/useMousePosition.js`
- Custom hook tracking mouse coordinates
- Normalized values (-1 to 1) for 3D parallax

#### [NEW] `src/hooks/useScrollAnimation.js`
- GSAP ScrollTrigger registration helper
- Cleanup on unmount

---

## Performance Optimization Strategy

1. **3D Scene**: Fixed position behind all content, single Canvas instance
2. **Particles**: BufferGeometry + direct mutation (no React re-renders)
3. **Post-processing**: Bloom with conservative settings (resolution/strength)
4. **Lazy loading**: Sections below fold use Framer Motion's `whileInView`
5. **Mobile**: Reduce particle count, disable post-processing on low-end devices
6. **CSS**: Tailwind purge unused styles in production

---

## Verification Plan

### Automated
- `npm run build` — ensure clean production build
- Lighthouse audit targeting 90+ performance score

### Manual
- Browser test: Chrome, Firefox, Safari
- Mobile responsiveness: 375px (iPhone SE) → 1920px (Desktop)
- Verify all animations are smooth at 60fps
- Test custom cursor behavior across all sections
- Verify scroll-triggered animations fire correctly

---

## Open Questions

> [!IMPORTANT]
> 1. **個人資料**: 請提供你希望在網站上展示的具體內容：
>    - 你的名字 / 暱稱
>    - 自我介紹文字（2-3 句）
>    - 技能清單與熟練度
>    - 專案名稱、描述、使用技術
>    - 社交連結 (GitHub, LinkedIn, Email 等)
> 
> 2. **專案截圖**: 你有現成的專案截圖嗎？還是我先用佔位圖生成？
> 
> 3. **部署需求**: 是否需要設定 Vercel / Netlify 部署？
> 
> 如果你希望我先用假資料 (placeholder) 快速建出完整網站，之後再替換真實內容，也可以直接告訴我「先用假資料」，我會立刻開始開發。
