# Meal Explorer - CMLabs Frontend Test

![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)

A modern, high-performance web application built to explore ingredients and discover meals using **TheMealDB API**. This project was developed as part of the CMLabs Frontend Full-time technical assessment.

### 🚀 **[Live Demo](https://cmlabs-frontend-fulltime-test-psi.vercel.app/)**

## ✨ Features

- **Ingredient & Meal Explorer**: Browse hundreds of ingredients and meals with a highly responsive layout.
- **Client-Side Infinite Scroll**: Performance-optimized data chunking via `IntersectionObserver` to render large lists seamlessly without lag.
- **Smart Client Filtering**: Lightning-fast, debounced search filtering utilizing Zustand global stores and optimized React `useMemo` computations.
- **Dynamic Routing**: Next.js App Router for dynamic traversal across `/`, `/ingredients/[name]`, and `/meals/[id]`.
- **Rich Meal Details**: Comprehensive recipe instruction views, dynamic ingredient measurements lists, and cleanly integrated YouTube tutorial embeds.
- **Atomic Design Pattern**: Enterprise-grade, scalable folder architecture maintaining strict isolation of Atoms, Molecules, and Organisms.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript (Strict Mode applied)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Data Fetching**: Axios (Configured with custom interceptors & error boundaries)
- **Icons**: Lucide React

---

## 💻 Getting Started

Follow these simple instructions to clone and run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/MuhammadAbdiel/cmlabs-frontend-fulltime-test.git
cd cmlabs-frontend-fulltime-test
```

### 2. Install Dependencies

The project works perfectly across modern package managers. Install dependencies using your preferred tool:

Using **pnpm** _(Recommended)_:

```bash
pnpm install
```

Using **npm**:

```bash
npm install
```

Using **yarn**:

```bash
yarn install
```

### 3. Run the Development Server

Start up the local dev server using the appropriate command:

Using **pnpm**:

```bash
pnpm dev
```

Using **npm**:

```bash
npm run dev
```

Using **yarn**:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) with your browser to see the result.

## 📁 Architecture & Folder Structure

This application adheres to the **Atomic Design Pattern** combined with the Next.js App Router paradigm:

```text
src/
├── app/                  # Next.js App Router pages and layout structure
├── components/           # Reusable UI Components
│   ├── atoms/            # Smallest building blocks (SearchInputs, Badges, Skeletons)
│   ├── molecules/        # Combined atoms serving specific usages (Cards, Breadcrumbs)
│   └── organisms/        # Complex, self-contained sections (Data Grids, Detail Panels)
├── constants/            # Immutable application-wide config (API Endpoints)
├── hooks/                # Custom domain logic hooks and utilities (Infinite Scroll)
├── lib/                  # Generic helper functions (Tailwind string merge, Data Parser)
├── services/             # Axios instance, Interceptors, and API handlers
├── stores/               # Zustand global state repositories
└── types/                # Typescript interface & model definitions
```

## 🤝 Key Design Decisions

- **Normalized API Data**: The 20 scattered and dynamic ingredient keys (`strIngredient1..20`) from the raw TheMealDB JSON payload are cleanly parsed into structured, map-able arrays entirely within the transparent service layer, keeping UI components pure.
- **React Concurrency**: Array filtering and searches are detached from direct store updates and correctly processed via `useMemo()` inside isolated hooks to prevent unnecessary DOM re-renders.
