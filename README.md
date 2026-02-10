# Education Analytics Admin Dashboard (Teacher Portal)

A modern, responsive **Angular dashboard** designed for educators to monitor student performance, attendance trends, and risk indicators in real time.

This project simulates a real-world school admin/teacher portal with interactive data visualization, clean UI architecture, and state-driven updates — built as a portfolio case study for frontend engineering roles.

---

## ✨ Features

- **KPI Overview**
  - Total students
  - Average grade
  - Attendance rate
  - At-risk student count

- **Attendance Trend Visualization**
  - Line chart showing attendance percentage over time
  - Built with ApexCharts
  - Automatically recalculates as attendance data changes

- **Grade Distribution**
  - Donut chart grouping students by grade ranges (A / B / C / D-F)

- **Top 5 Students**
  - Ranked by average grade
  - Pure CSS progress bars (no chart library)

- **At-Risk Students Table**
  - Auto-flagging based on grade and attendance thresholds
  - Clear severity ordering and reason indicators

- **Recent Activity Feed**
  - Real activity log generated from CRUD actions
  - Tracks grade updates and attendance changes
  - Displays human-readable timestamps (e.g. “5m ago”)

- **Responsive Layout**
  - Desktop-first dashboard
  - Mobile drawer sidebar with hamburger toggle
  - Fully usable on tablet and phone viewports

---

## 🧠 What This Project Demonstrates

- Strong **Angular fundamentals**:
  - Standalone components
  - Signals (`signal`, `computed`, `effect`)
  - Dependency injection
  - Component-driven architecture

- **State management without external libraries**
  - Centralized data service
  - Derived state via computed signals
  - Persistent state using `localStorage`

- **Data-driven UI**
  - Charts update automatically from state
  - Risk detection logic separated from presentation
  - Realistic dashboard behavior without mock-only UI

- **Responsive UI & layout architecture**
  - CSS Grid + Flexbox
  - Mobile sidebar drawer pattern
  - Adaptive dashboard layout

---

## 🛠️ Tech Stack

- **Framework:** Angular 21
- **Language:** TypeScript
- **Charts:** ApexCharts / ng-apexcharts
- **Styling:** SCSS, CSS Grid, Flexbox
- **State:** Angular Signals
- **Deployment:** Vercel

---

## 🚀 Live Demo

🔗 **Live Site:**  
https://education-admin-dashboard.vercel.app

> Best experienced on desktop, but fully functional on mobile.

---

---

## 🧪 Notes & Tradeoffs

- This project focuses on **frontend architecture and UX**, not backend integration.
- Data is stored locally to simulate a real admin workflow.
- Authentication is mocked for demo purposes.
- Assignment tracking is planned as a future enhancement.

---

## 📈 Future Improvements

- Settings / preferences page
- Role-based access (teacher vs admin)
- Backend integration (REST or Firebase)
- Exportable reports (CSV / PDF)
- Dark mode

---

## 👤 Author

**Alan Hernandez**  
Frontend Developer

- GitHub: https://github.com/Alan23bh
- LinkedIn: *(https://www.linkedin.com/in/alan-hernandez-aa8458326/)*

---

## 📝 Why This Project Exists

This dashboard was built as a **case study** to demonstrate how a frontend developer approaches:
- real-world data modeling
- UI composition
- responsive layouts
- maintainable application structure

It reflects how I build production-ready interfaces, not just visual demos.




