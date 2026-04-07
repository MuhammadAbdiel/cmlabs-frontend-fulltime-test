# Front-end Developer Practical Tasks

**PT CMLABS INDONESIA DIGITAL**  
Software Engineering Division  
Software Development and Maintenance Support Sector

---

_Doc Checked and Validated by Rifqi Ardhian (lead)_  
_12th March 2026_

---

## Front-end Developer Full-time / Part-time / Internship Practical Tasks

**Pre-assessment Test / FE-PT-02-2**

| Field              | Details                            |
| ------------------ | ---------------------------------- |
| Type               | Full-time / Part-time / Internship |
| Basic Requirements | VueJS / NuxtJS / React JS / Next   |

> **⏰ DEADLINE PENGERJAAN SEMUA SOAL: 72 Jam (3 Hari)**

---

## Petunjuk Pengerjaan

1. Baca soal baik-baik
2. Lakukan pengerjaan dengan membuat kode sesuai dengan petunjuk soal yang diberikan
3. Hasil kode pada semua soal dimasukkan ke dalam 1 folder project dan di upload / push ke dalam **Github Repository (Public)**
4. Kirimkan link Github Repository pada Google Form yang telah disediakan
5. Tambahkan `readme.md` untuk petunjuk running project — hasil clone repository wajib bisa di run untuk dilakukan audit
6. _(Opsional)_ Deploy hasil pengerjaan ke Netlify, Vercel, Github Pages dan jika deploy, sertakan linknya di dalam `Readme.md`

### Contoh Format Nama Github Repository

**Untuk Posisi Parttime**

```
github.com/account-name/cmlabs-frontend-parttime-test
```

**Untuk Posisi Fulltime**

```
github.com/account-name/cmlabs-frontend-fulltime-test
```

**Untuk Posisi Internship**

```
github.com/account-name/cmlabs-frontend-internship-test
```

---

## Project

### API Endpoints

| Name                 | URL                                                                      | Type     |
| -------------------- | ------------------------------------------------------------------------ | -------- |
| List of Ingredients  | `https://www.themealdb.com/api/json/v1/1/list.php?i=list`                | Required |
| Filter by Ingredient | `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient-name}` | Required |
| Detail Meal          | `https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal-id}`         | Optional |

---

## Tasks

### 1. Halaman & Tampilan Data

#### Halaman Ingredients

**Requirements:**

- a. Berisikan list data ingredients berdasarkan endpoint **List of Ingredients**
- b. Ketika list ingredient dipilih, halaman akan redirect menuju halaman **Ingredients Detail**
- c. Wajib ada fitur **Search Ingredients by Name** di sisi front-end
- d. Komponen: List Ingredients, Search Ingredients

---

#### Halaman Ingredients Detail

**Requirements:**

- a. Parameter → `ingredient-name`
- b. Berisikan list data meal berdasarkan data ingredient yang dipilih, endpoint dari **Filter by Ingredients**
- c. Jika data meal dipilih, halaman akan redirect menuju halaman **Meals Detail**
- d. Wajib ada fitur **Search Meal by Name** di sisi front-end
- e. Komponen: List meal dengan gambar, Search Meal

---

#### Meals Detail _(Opsional — nilai lebih jika dikerjakan)_

- a. Parameter → `meal-id`
- b. Tampilkan detail meal berdasarkan list yang dipilih
- c. Endpoint menggunakan **Detail Meal**
- d. Komponen: Gambar Meal, Judul/Nama Meal, Deskripsi/Tutorial, Recipe, Youtube Embedded

---

### 2. Requirements

- a. Wajib menggunakan framework **VueJS / ReactJS**
- b. **NuxtJS / NextJS** menjadi nilai lebih
- c. CSS, boleh pakai Bootstrap / Tailwind

### 3. Kreativitas Tampilan

Silakan gunakan kreativitas anda untuk membuat dan menyusun halaman di atas.

> Kualitas tampilan akan menjadi nilai lebih.

### 4. Atomic Component

Penggunaan atomic component lebih diutamakan.

### 5. Responsivitas

Halaman **wajib responsive** pada:

- Desktop browser
- iPad
- Mobile

### 6. Deploy _(Opsional)_

Deploy hasil pengerjaan boleh ke Netlify, Vercel, atau provider lainnya.

---

## Contoh Tampilan

### Page Ingredients

Menampilkan grid kartu ingredient (contoh: Beef, Chicken, Dessert, Lamb, Miscellaneous, Pasta, Seafood, Side, Starter, Vegan, Vegetarian, Breakfast, Goat) dengan gambar thumbnail dan nama di atasnya.

### Page Ingredients Filter

Menampilkan breadcrumb navigasi (Home > Foods > Pasta) dan grid kartu meal hasil filter berdasarkan ingredient yang dipilih. Setiap kartu menampilkan gambar meal beserta nama di atasnya.

**Contoh tampilan untuk ingredient "Pasta":**

- Chilli prawn linguine
- Fettucine alfredo
- Grilled Mac and Cheese Sandwich
- Lasagna Sandwiches
- Lasagne
- Pilchard puttanesca
- Spaghetti alla Carbonara
- Venetian Duck Ragu

### Page Meals Detail

Menampilkan detail lengkap dari meal yang dipilih:

- **Breadcrumb**: Home > Foods > Pasta > Fettucine alfredo
- **Judul/Nama Meal**: Fettucine alfredo
- **Tag/Label**: Italian Culinary
- **Gambar Meal**
- **Instructions** (deskripsi/tutorial memasak)
- **Recipes** (daftar bahan-bahan, contoh: 227g Clotted Cream, 25g Butter, 1 tsp Corn Flour, 100g Parmesan Cheese, Grated Nutmeg, 250g Fettuccine, Chopped Parsley)
- **Tutorials** (YouTube Embedded video)
