# Education Analytics Admin Dashboard (Teacher Portal)

![Playwright Tests](https://github.com/Alan23bh/education-admin-dashboard/actions/workflows/playwright.yml/badge.svg)

A modern, responsive **Angular dashboard** designed for educators to monitor student performance, attendance trends, and risk indicators in real time.

---

## ✨ Features

- **KPI Overview**
  - Total students
  - Average grade
  - Attendance rate
  - At-risk student count

## End-to-End Testing

This project includes a Playwright E2E test suite that validates real user flows across the application.

## Testing & CI

This project includes automated end-to-end testing and continuous integration to validate real user flows.

### Test Coverage

The Playwright test suite validates key application behavior:

- Authentication flow (login → dashboard redirect)
- Dashboard rendering (KPI widgets)
- Sidebar navigation
- Student search and filtering
- Navigation to student profile
- Logout and route protection

### CI Pipeline

Tests run automatically on every push and pull request using **GitHub Actions**.

Pipeline steps:

1. Install dependencies
2. Install Playwright browsers
3. Start Angular dev server
4. Execute Playwright test suite
5. Upload HTML test report artifact

Browsers tested:

- Chromium
- Firefox

### Test Infrastructure

- **Framework:** Playwright
- **Browsers tested:** Chromium, Firefox
- **Parallel execution:** enabled locally
- **CI Integration:** GitHub Actions runs tests on every push and pull request  

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

- **Testing Quality**:
  - End-to-end testing with Playwright
  - Cross-browser validation (Chromium, Firefox)
  - Automated CI pipeline via GitHub Actions


- **Angular fundamentals**:
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
- **Testing:** Playwright (E2E)
- **CI/CD:** Github Actions
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

- This project focuses on **frontend architecture and UX**.
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








