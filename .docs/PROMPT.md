Kamu adalah Senior Front-end Engineer dengan keahlian mendalam di Next.js 16 (App Router), TypeScript strict, Tailwind CSS, Zustand, dan Axios. Kamu juga seorang UI/UX practitioner yang mengutamakan design system enterprise-grade dengan estetika minimal & clean — terinspirasi dari Vercel, Linear, dan Raycast.

---

## KONTEKS PROYEK

Aku sedang mengerjakan pre-assessment test Front-end Developer di sebuah perusahaan teknologi. Proyek ini adalah aplikasi **Meal Explorer** berbasis data dari TheMealDB API.

**Tech Stack:**
| Package | Versi / Keterangan |
|---------------|---------------------------------------------|
| Next.js | 16 (App Router, latest stable) |
| TypeScript | Strict mode (`strict: true`) |
| Tailwind CSS | Latest |
| Zustand | Latest |
| Axios | ^1.3.4 — digunakan untuk SEMUA API call |

> **Catatan penting:** Karena semua API call menggunakan Axios (bukan native fetch), seluruh data fetching dilakukan di **Client Components** dengan pattern `useEffect` + Zustand store, KECUALI ada justifikasi kuat untuk server-side. Gunakan `'use client'` secara eksplisit pada komponen yang memerlukan Axios/Zustand.

---

## API ENDPOINTS

| Nama                 | URL                                                                      | Status   |
| -------------------- | ------------------------------------------------------------------------ | -------- |
| List of Ingredients  | `https://www.themealdb.com/api/json/v1/1/list.php?i=list`                | Required |
| Filter by Ingredient | `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient-name}` | Required |
| Detail Meal          | `https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal-id}`         | Required |

---

## HALAMAN YANG DIBUTUHKAN

### 1. `/` — Halaman Ingredients (Index)

- Fetch list ingredients dari API saat mount
- Tampilkan grid kartu semua ingredients
- Search ingredients **by name di sisi front-end** (filter dari Zustand store, bukan re-fetch)
- Klik kartu → navigate ke `/ingredients/[name]`

### 2. `/ingredients/[name]` — Ingredients Detail

- Fetch meals berdasarkan `ingredient-name` dari URL param
- Tampilkan grid kartu meal (gambar + nama)
- Search meal **by name di sisi front-end** (filter dari Zustand store)
- Klik kartu meal → navigate ke `/meals/[id]`
- Breadcrumb: Home > Ingredients > {name}

### 3. `/meals/[id]` — Meal Detail

- Fetch detail meal berdasarkan `meal-id` dari URL param
- Tampilkan: gambar, judul, tag/kategori, instruksi memasak, daftar resep (ingredient + measure), YouTube embedded
- Breadcrumb: Home > Ingredients > {ingredient} > {meal name}

---

## TUGAS YANG AKU MINTA

### TAHAP 1 — Arsitektur & Struktur Folder

Buatkan struktur folder lengkap mengikuti konvensi **Next.js 16 App Router** + **Atomic Design** + **Zustand store pattern**, dengan layout berikut sebagai acuan:

```
meal-explorer/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Halaman Ingredients (index)
│   ├── ingredients/
│   │   └── [name]/
│   │       └── page.tsx          # Halaman Ingredients Detail
│   └── meals/
│       └── [id]/
│           └── page.tsx          # Halaman Meal Detail
│
├── components/                   # Atomic Design
│   ├── atoms/                    # Unit terkecil, tanpa dependency internal
│   │   ├── Badge/
│   │   ├── SearchInput/
│   │   └── SkeletonCard/
│   ├── molecules/                # Kombinasi atoms
│   │   ├── IngredientCard/
│   │   ├── MealCard/
│   │   └── Breadcrumb/
│   ├── organisms/                # Kombinasi molecules + logic
│   │   ├── IngredientGrid/
│   │   ├── MealGrid/
│   │   └── MealDetailPanel/
│   └── templates/                # Layout wrapper per halaman
│       ├── IngredientsTemplate/
│       ├── IngredientsDetailTemplate/
│       └── MealDetailTemplate/
│
├── stores/                       # Zustand stores
│   ├── useIngredientStore.ts     # State: ingredients, searchQuery, status
│   ├── useMealStore.ts           # State: meals, searchQuery, status
│   └── useMealDetailStore.ts     # State: mealDetail, status
│
├── services/                     # Axios instance + API calls
│   ├── axiosInstance.ts          # Base Axios config (baseURL, interceptors)
│   └── mealService.ts            # Semua fungsi API call
│
├── types/                        # TypeScript type definitions
│   ├── ingredient.types.ts
│   ├── meal.types.ts
│   └── api.types.ts              # Generic API response wrapper
│
├── hooks/                        # Custom hooks
│   ├── useIngredients.ts         # Trigger fetch + expose store state
│   ├── useMeals.ts
│   └── useMealDetail.ts
│
├── lib/                          # Pure utilities
│   └── utils.ts                  # cn(), slugify(), formatText(), dll
│
├── constants/                    # Static values
│   └── api.constants.ts          # API base URL, endpoint paths
│
└── public/
    └── images/                   # Static assets (favicon, og-image, dll)
```

Sertakan keterangan singkat fungsi tiap file/folder penting. Jika ada penyesuaian yang perlu dilakukan terhadap struktur di atas, jelaskan alasannya.

---

### TAHAP 2 — TypeScript Type Definitions

Buatkan semua type/interface di folder `types/` untuk:

**`ingredient.types.ts`**

- `Ingredient` — shape dari API response list ingredients
- `IngredientCardProps` — props untuk komponen IngredientCard

**`meal.types.ts`**

- `MealSummary` — shape dari API response filter by ingredient (id, name, thumbnail)
- `MealDetail` — shape lengkap dari API response detail meal (semua field termasuk ingredients array yang sudah di-parse)
- `MealCardProps`, `MealDetailPanelProps`

**`api.types.ts`**

- `ApiStatus` — union type: `'idle' | 'loading' | 'success' | 'error'`
- Generic response wrapper untuk TheMealDB API

---

### TAHAP 3 — Axios Instance & Services

**`services/axiosInstance.ts`**

- Konfigurasi base URL ke `https://www.themealdb.com/api/json/v1/1`
- Request interceptor: log request di development
- Response interceptor: handle error global (401, 500, network error)
- Timeout: 10000ms

**`services/mealService.ts`**

- `getIngredients()` → fetch list ingredients
- `getMealsByIngredient(ingredientName: string)` → fetch meals by ingredient
- `getMealDetail(mealId: string)` → fetch detail meal
- Semua fungsi fully typed dengan return type eksplisit

---

### TAHAP 4 — Zustand Stores

Rekomendasikan dan implementasikan pola Zustand terbaik untuk proyek ini.

Untuk setiap store, buatkan skeleton dengan:

- State shape (data, searchQuery, status, error)
- Actions (fetch + setSearch + reset)
- Derived/computed value (filteredData berdasarkan searchQuery)
- Gunakan `immer` middleware jika cocok, atau plain Zustand jika lebih simpel

**Stores yang dibutuhkan:**

- `useIngredientStore.ts`
- `useMealStore.ts`
- `useMealDetailStore.ts`

---

### TAHAP 5 — Custom Hooks

Buatkan custom hooks di folder `hooks/` sebagai jembatan antara komponen dan store:

- `useIngredients()` → trigger fetch on mount, expose `{ ingredients, filteredIngredients, searchQuery, setSearch, status, error }`
- `useMeals(ingredientName: string)` → sama, untuk meals
- `useMealDetail(mealId: string)` → expose detail meal

---

### TAHAP 6 — Kode Skeleton Komponen (Atomic Design)

Berikan skeleton (struktur + JSX placeholder + komentar `// TODO:`) untuk:

**Atoms:**

- `SearchInput` — controlled input dengan debounce 300ms, ikon search
- `Badge` — label tag/kategori dengan variant (default, outline)
- `SkeletonCard` — animated pulse placeholder

**Molecules:**

- `IngredientCard` — gambar (`next/image`) + nama, hover lift effect
- `MealCard` — gambar + nama, sama dengan IngredientCard pattern
- `Breadcrumb` — terima array `{ label, href }`, render dengan separator

**Organisms:**

- `IngredientGrid` — pakai `useIngredients()` hook, render grid + SearchInput + empty state
- `MealGrid` — pakai `useMeals()` hook, render grid + SearchInput + empty state
- `MealDetailPanel` — layout 2 kolom: gambar + info kiri, instruksi + resep kanan, YouTube embed bawah

---

### TAHAP 7 — Design System & Tailwind Config

Definisikan design system dengan arah **minimal & clean enterprise** (Vercel/Linear):

**Color Palette:**

- Base: Zinc/Neutral scale
- Accent: 1 warna saja (pilihkan yang cocok untuk food app)
- Semantic: success, warning, error

**Typography:**

- Font pairing via `next/font/google`
- Scale: xs → 4xl, dengan line-height dan weight yang terdefinisi

**Component Tokens:**

- Card: border radius, shadow, hover transition
- Input: focus ring, border style

**`tailwind.config.ts`:**

- Custom color tokens
- Custom font family
- Extended animation (skeleton pulse, fade-in)
- Dark mode: `class` strategy

---

### TAHAP 8 — Contoh Implementasi Penuh (2 Komponen)

Implementasikan 2 komponen berikut secara **lengkap dan production-ready** sebagai referensi standar visual:

1. **`IngredientCard`** — dengan `next/image`, hover state, skeleton loading, fully typed
2. **`SearchInput`** — dengan debounce, clear button, loading indicator, accessible (aria-label)

---

## STANDAR KODE

- `'use client'` wajib dideklarasikan di setiap komponen yang menggunakan Axios, Zustand, atau browser API
- Semua komponen fully typed — tidak ada `any`
- Error boundary dan Suspense wajib ada di setiap page
- Gunakan `next/image` untuk semua gambar
- Gunakan `next/navigation` (`useRouter`, `useParams`) untuk routing di client components
- Penamaan: folder `kebab-case`, file komponen `PascalCase.tsx`, hooks `camelCase.ts`
- Setiap komponen dalam folder sendiri dengan `index.ts` sebagai barrel export
- Tambahkan komentar `// TODO:` pada bagian yang perlu diisi implementasi penuh

---

## FORMAT OUTPUT

Berikan output **satu tahap per respons**. Setelah setiap tahap selesai, **tunggu konfirmasi atau instruksiku** sebelum lanjut ke tahap berikutnya.

Mulai dari **Tahap 1 — Arsitektur & Struktur Folder**.
