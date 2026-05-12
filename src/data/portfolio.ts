import {
  Code2, Brain, Gamepad2,
  Github, Mail, Youtube,
  Server
} from 'lucide-react';

export const personalInfo = {
  name: "林明昌",
  enName: "Ming-Chang Lin",
  title: "AI 系統架構師 & 底層遊戲引擎開發者",
  roles: [
    "AI Agent 開發者",
    "C++ 遊戲工程師",
    "進階 RAG 系統架構師",
    "演算法與資料結構愛好者"
  ],
  bio: "目前就讀金門大學資工系，專注於高效能 AI 系統（RAG / GraphRAG）與底層遊戲引擎開發。熱衷於探索運算極限，從建構具備圖譜推理能力的 AI 代理，到撰寫從零開始的程式化生成演算法，致力於將賽博龐克的未來科技化為現實的程式碼。",
};

export const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/Rafu2102", color: "#e0e0e0" },
  { name: "Email", icon: Mail, url: "mailto:s111210534@student.nqu.edu.tw", color: "#00F0FF" },
  { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@Aisle99Nightmares", color: "#FF0000" },
];

export const aboutHighlights = [
  { label: "主修領域", value: "AI & Game Dev" },
  { label: "核心專注", value: "極致效能最佳化" },
  { label: "信仰原則", value: "拒絕依賴引擎" },
  { label: "視覺實驗室", value: "Aisle 99" },
];

export const skillCategories = [
  {
    name: "Languages (程式語言)",
    icon: Code2,
    color: "#00F0FF",
    skills: [
      { name: "Python", level: 95 },
      { name: "C / C++", level: 90 },
      { name: "JavaScript / React", level: 80 },
    ]
  },
  {
    name: "AI / ML (系統架構)",
    icon: Brain,
    color: "#B026FF",
    skills: [
      { name: "RAG & GraphRAG", level: 95 },
      { name: "Local LLM Deploy", level: 90 },
      { name: "Reinforcement Learning", level: 85 },
    ]
  },
  {
    name: "Game Dev (遊戲開發)",
    icon: Gamepad2,
    color: "#FF2E97",
    skills: [
      { name: "Procedural Generation", level: 90 },
      { name: "SDL2 / 底層架構", level: 85 },
      { name: "Modding & Sandbox", level: 85 },
    ]
  },
  {
    name: "Infra (佈署與環境)",
    icon: Server,
    color: "#FFE600",
    skills: [
      { name: "Linux / Docker", level: 85 },
      { name: "NVIDIA DGX Spark", level: 80 },
      { name: "Git Workflow", level: 90 },
    ]
  },
];

export const projects = [
  {
    title: "荒野迴音：遠古遺跡",
    description: "一款從零打造底層架構的 2D/3D 動作 RPG。自主實作了程序化地形生成與動態區塊載入系統，極大化記憶體使用效率，打造無縫的廣袤開放世界。",
    tech: ["C++", "SDL2", "狀態機架構", "記憶體最佳化"],
    category: "Game Dev",
    color: "#FF2E97",
    github: "#",
    live: "#",
  },
  {
    title: "次世代校園課程導覽 AI 系統",
    description: "為大學校園設計的智慧導覽中樞。深度整合 RAG 與 GraphRAG 架構，突破傳統語言模型的知識幻覺與語境限制，提供具備深度邏輯推理能力的精準推薦。",
    tech: ["Python", "GraphRAG", "向量資料庫", "Local LLM"],
    category: "AI / ML",
    color: "#B026FF",
    github: "https://github.com/Rafu2102/RAG-",
    live: "#",
  },
  {
    title: "神經網路自主代理：RL AI Snake",
    description: "基於強化學習訓練的全自主遊戲 Agent。透過精緻的獎勵機制設計與神經網路演算法，讓 AI 在複雜邊界條件下能進行每秒數千次的高速運算與路徑決策。",
    tech: ["Python", "強化學習 (RL)", "類神經網路", "演算法設計"],
    category: "AI / ML",
    color: "#39FF14",
    github: "#",
    live: "#",
  },
  {
    title: "Aisle 99 數位視覺實驗室",
    description: "結合生成式 AI 與超現實主義的數位內容專案。專注於 Analog Horror 與 Liminal Space 美學，透過 Prompt Engineering 探索 AI 視覺生成的恐怖谷邊界。",
    tech: ["Generative AI", "Prompt", "數位影像合成"],
    category: "Creative",
    color: "#00F0FF",
    github: "#",
    live: "https://www.youtube.com/@Aisle99Nightmares",
  },
];

export const navLinks = [
  { label: "首頁", href: "#home" },
  { label: "網站介紹", href: "#introduction" },
  { label: "個人簡介", href: "#about" },
  { label: "專業技能", href: "#skills" },
  { label: "專案經歷", href: "#projects" },
  { label: "小遊戲", href: "#minigame" },
  { label: "聯絡我", href: "#contact" },
];
