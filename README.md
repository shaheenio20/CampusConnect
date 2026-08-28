# 🎓 CampusConnect — Campus Event Management & Registration Platform

![CampusConnect Banner](https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80)

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-4.12-5A0E2D?style=flat&logo=daisyui)](https://daisyui.com/)
[![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-12.18-FFCA28?style=flat&logo=firebase)](https://firebase.google.com/)
[![SweetAlert2](https://img.shields.io/badge/SweetAlert2-11.26-Smarter_Alerts-red)](https://sweetalert2.github.io/)

---

## 📌 Project Overview

**CampusConnect** is a modern, full-featured web application designed for university students to discover, search, filter, and register for campus activities—ranging from technology workshops and guest lectures to programming contests and cultural festivals. 

Built with **React 19**, **Vite**, **Tailwind CSS**, and **Firebase Authentication**, CampusConnect provides a seamless experience for students to manage their personal event schedules, stay organized with real-time schedule conflict detection, and securely track registered events across devices.

---

## 🛠️ Technology Stack

| Layer | Technology | Usage & Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** | Modern UI rendering using Functional Components, Custom Hooks, Context API, and React Router v7. |
| **Build & Tooling** | **Vite 8** | Ultra-fast development server with Hot Module Replacement (HMR) and optimized production bundler. |
| **Styling & Design** | **Tailwind CSS v3 + DaisyUI v4** | Utility-first CSS framework with DaisyUI components, custom color palettes, dynamic glassmorphism, and responsive grid layouts. |
| **Authentication** | **Firebase Auth v12** | Secure user authentication supporting Email/Password sign-up/login and 1-click Google OAuth authentication. |
| **State Management** | **React Context API (`AuthContext`)** | Global auth state management, session monitoring, and per-user persistent event storage. |
| **Data Persistence** | **LocalStorage (Per-User Isolated)** | Per-user event schedule persistence bound to Firebase User UIDs (`campus_events_${uid}`). |
| **Alerts & Dialogs** | **SweetAlert2** | Custom-themed modal alerts, conflict confirmation dialogs, and toast notifications. |

---

## 🎯 Specific Problem & Technical Solution

### ⚠️ Problem: Firebase Session Auto-Bypass During Account Registration

* **The Problem Context:** 
  In standard Firebase Authentication, when a new user registers an account using `createUserWithEmailAndPassword()`, Firebase automatically signs in the user on the client side. In CampusConnect, this created an issue where new users registering for an account bypassed the required **Login page** and were immediately logged in to complete event booking without verifying their login credentials first.

* **Impact:** 
  This broken flow meant users could not experience a structured **Register → Log In → Book & Save Event** pipeline, which is essential for user identity verification and account setup.

* **The Solution Implemented:**
  1. **Session Revocation & Logout (`Register.jsx`)**: Immediately after account creation via `createUser()`, the application calls `logoutUser()` to revoke the auto-authenticated session.
  2. **Seamless Redirection with Pre-Filled Credentials**: The user is redirected to `/login` with their newly registered email pre-filled into the form and a success alert (`"🎉 Registration successful! Please log in with your credentials to proceed."`).
  3. **Intelligent Google OAuth Handling**: For users registering via Google OAuth ("Continue with Google"), since Google already verifies user identity in 1-click, the app maintains the session and directly navigates to complete event booking.
  4. **Post-Login Auto-Booking (`EventDetails.jsx`)**: Once the user enters their password and logs in on `/login`, they are navigated back to the event page where an automated effect completes their event booking and saves it to their personal schedule.

---

## ✨ Key Features

- 🔍 **Event Discovery & Filtering:** Search by keyword, filter by categories (Tech, Design, Business, Cultural, Sports), and sync parameters directly with URL search queries.
- 🔒 **Gated Event Registration:** Restricts event booking to authenticated users, protecting personal schedule data using `PrivateRoute`.
- ⚠️ **Smart Schedule Conflict Engine:** Detects and flags overlapping event dates and times before registration.
- 📅 **Personal Event Schedule ("My Events"):** View booked events, inspect conflict groups, and cancel registrations with 1-click confirmation.
- 👤 **User Profile & Authentication:** Support for custom user avatars, profile display names, Firebase Email/Password, and Google OAuth.
- 📱 **Responsive & Accessible UI:** Mobile drawer sidebar, dark/light modern themes, hover micro-animations, and glassmorphism components.

---

## 🚀 Getting Started

Follow these steps to run CampusConnect locally on your machine:

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/shaheenio20/CampusConnect.git
   cd CampusConnect
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Architecture

```
CampusConnect/
├── src/
│   ├── components/       # Reusable UI components (Navbar, Footer, EventCard, StatusBadge, PrivateRoute)
│   ├── context/          # Context API providers (AuthContext for user state & event management)
│   ├── data/             # Static mock events dataset (events.json)
│   ├── firebase/         # Firebase app configuration & initialization (firebase.config.js)
│   ├── pages/            # Page components (Home, Events, EventDetails, MyEvents, Login, Register, About)
│   ├── utils/            # Utility functions (alerts.js with SweetAlert2, conflictUtils.js for schedule checks)
│   ├── App.jsx           # Main App component
│   └── main.jsx          # React entry point with React Router routes setup
├── public/               # Static assets & favicon
├── tailwind.config.js    # Tailwind CSS & DaisyUI theme setup
└── package.json          # Dependencies and npm scripts
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/shaheenio20/CampusConnect/issues).

---

## 📄 License

This project is open-source and available under the **MIT License**.
