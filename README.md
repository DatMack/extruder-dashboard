# Extruder Dashboard – Data Entry App

A robust, modular web application for logging, reviewing, and managing shift-based extrusion production data. Designed for operators and supervisors on the plant floor, this dashboard captures and visualizes operational metrics in real time.

---

## 📌 Project Purpose

The Extruder Dashboard streamlines data entry during manufacturing operations by:
- Capturing operator input every 30 minutes
- Supporting order start/end, shutdown tracking, and end-of-shift reporting
- Presenting clean, structured inputs with future-ready architecture for user roles and persistent storage

---

## 🧠 Core Features

- 📋 **Dynamic Data Entry Forms** — generated from a centralized config (`sections.ts`) for consistency
- 🕓 **Time-aware Forms** — end-of-shift section only visible in last 30 minutes, enforced modal in final 10
- 👤 **Operator Tracking** — shows who is logged in, with placeholder login modal
- 📦 **Top Bar UI** — live system clock, lot #, product name, and operator shown persistently
- 🧭 **Sidebar Navigation** — links to Home, Shift History, Reports, and Settings
- ✅ **Modular Components** — all UI built with reusable components (`SectionCard`, `Modals`, etc.)

---

## 🛠 Tech Stack

- **React** with **TypeScript** — typed front-end logic
- **Vite** — fast dev server & build tool
- **TailwindCSS** — utility-first styling
- **React Router DOM** — multi-page routing
- **LocalStorage** — temporary data retention (for now)

---

## 📁 Directory Structure

```bash
src/
├── components/       # Shared UI: SectionCard, modals, top bar, sidebar
├── pages/            # Home, Reports, Shift History, Settings
├── utils/            # Form section definitions (sections.ts)
├── App.tsx           # Root layout & routing
└── main.tsx          # Entry point with React Router setup
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
https://github.com/DatMack/extruder-dashboard.git

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

> This app runs on Vite at `http://localhost:5173` by default

---

## 🔄 In-Progress Features

- [x] Sidebar navigation & sticky top bar
- [x] End-of-shift modal with time gating
- [x] Login placeholder (mock operator selector)
- [ ] Persist data to localStorage or backend
- [ ] Full shift history listing by day/operator
- [ ] Export/report generation (CSV, PDF)
- [ ] Authentication & role-based access (admin/supervisor/operator)

---

## 🧪 Testing UX

- Simulate "end of shift" by setting system time to 05:30–06:00 or 17:30–18:00
- Use Login modal to impersonate an operator (not yet persisted)
- Use DevTools to inspect saved localStorage data (coming soon)

---

## 👥 Contributors

- **John** – Design, UX, architecture
- **ChatGPT (Code Copilot)** – Implementation guidance, full-stack scaffolding

---

## 📄 License

This project is licensed for internal use only. Contact the repository owner for permission to reuse, distribute, or contribute.

---

## 📬 Feedback or Help?

Open an issue or reach out on GitHub: [@DatMack](https://github.com/DatMack)
