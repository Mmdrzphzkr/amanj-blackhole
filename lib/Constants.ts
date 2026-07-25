export const SECTIONS = [
  { id: "hero", label: "Origin" },
  { id: "about", label: "Entity" },
  { id: "skills", label: "Elements" },
  { id: "experience", label: "Timeline" },
  { id: "projects", label: "Galaxies" },
  { id: "services", label: "Forces" },
  { id: "techstack", label: "Arsenal" },
  { id: "contact", label: "Singularity" },
];

export const SKILLS = [
  { name: "React", level: 95, color: "#61DAFB", category: "Frontend" },
  { name: "Next.js", level: 90, color: "#ffffff", category: "Frontend" },
  { name: "TypeScript", level: 85, color: "#3178C6", category: "Frontend" },
  { name: ".NET", level: 88, color: "#512BD4", category: "Backend" },
  { name: "Python", level: 87, color: "#3776AB", category: "Backend" },
  { name: "Node.js", level: 80, color: "#339933", category: "Backend" },
  { name: "Three.js", level: 75, color: "#ffffff", category: "3D" },
  { name: "PostgreSQL", level: 78, color: "#4169E1", category: "Database" },
  { name: "MongoDB", level: 82, color: "#47A248", category: "Database" },
  { name: "Docker", level: 72, color: "#2496ED", category: "DevOps" },
  { name: "Trading Bots", level: 90, color: "#f59e0b", category: "Specialty" },
  { name: "Tailwind", level: 92, color: "#06B6D4", category: "Frontend" },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Nebula Commerce",
    category: "E-Commerce",
    desc: "Full-featured online store with AI recommendations, real-time inventory, and payment systems.",
    tech: ["Next.js", ".NET", "PostgreSQL", "Stripe"],
    color: "#7c3aed",
    year: "2024",
  },
  {
    id: 2,
    title: "Quantum Trader",
    category: "Trading Bot",
    desc: "Automated crypto trading system with ML predictions, backtesting engine, and live signals.",
    tech: ["Python", "TensorFlow", "WebSocket", "FastAPI"],
    color: "#f59e0b",
    year: "2024",
  },
  {
    id: 3,
    title: "Void Analytics",
    category: "SaaS Dashboard",
    desc: "Real-time analytics platform with advanced data visualization and team collaboration.",
    tech: ["React", "TypeScript", "D3.js", "Node.js"],
    color: "#06b6d4",
    year: "2023",
  },
  {
    id: 4,
    title: "Stellar Health",
    category: "Healthcare App",
    desc: "Patient management platform with appointment scheduling and electronic medical records.",
    tech: ["Next.js", ".NET", "PostgreSQL", "Docker"],
    color: "#10b981",
    year: "2023",
  },
  {
    id: 5,
    title: "Cosmos Social",
    category: "Social Platform",
    desc: "Community platform with real-time messaging, content creation tools, and monetization.",
    tech: ["React Native", "Node.js", "MongoDB", "Socket.io"],
    color: "#ef4444",
    year: "2023",
  },
  {
    id: 6,
    title: "Apex Signals",
    category: "Forex Bot",
    desc: "Forex signal generation system using technical analysis and sentiment analysis.",
    tech: ["Python", "Pandas", "MetaTrader", "FastAPI"],
    color: "#f59e0b",
    year: "2022",
  },
];

export const EXPERIENCE = [
  {
    year: "2024 — Present",
    role: "Founder & Lead Developer",
    company: "Amanj Devs",
    type: "founder",
    desc: "Leading a team of 3 specialists building digital products. Architecting solutions, managing clients, and delivering high-quality web apps, mobile apps, and trading systems.",
    color: "#7c3aed",
  },
  {
    year: "2022 — 2024",
    role: "Freelance Developer",
    company: "Independent",
    type: "freelance",
    desc: "Built 20+ projects for international clients. Specialized in React, Next.js, Python trading bots, and full-stack web applications.",
    color: "#f59e0b",
  },
  {
    year: "2020 — 2022",
    role: "Software Developer",
    company: "Faratech Dara Processing",
    type: "company",
    desc: "Worked in enterprise software development. Built data processing systems, REST APIs, and .NET applications in an agile team environment.",
    color: "#06b6d4",
  },
];

export const SERVICES = [
  {
    icon: "🌐",
    title: "Web Development",
    desc: "Blazing fast, SEO-optimized web applications built with React and Next.js",
    color: "#7c3aed",
  },
  {
    icon: "📱",
    title: "App Development",
    desc: "Cross-platform mobile applications with native performance",
    color: "#06b6d4",
  },
  {
    icon: "📈",
    title: "Trading Bots",
    desc: "Automated trading systems with ML-powered predictions and signals",
    color: "#f59e0b",
  },
  {
    icon: "⚙️",
    title: "Backend Systems",
    desc: "Scalable APIs, microservices, and cloud infrastructure",
    color: "#10b981",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    desc: "Award-worthy interfaces crafted for emotional impact",
    color: "#ef4444",
  },
  {
    icon: "🔬",
    title: "Consulting",
    desc: "Technical strategy, architecture review, and team leadership",
    color: "#a855f7",
  },
];
