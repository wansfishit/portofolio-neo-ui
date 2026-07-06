# 🚀 Portfolio Neo Brutalism — Erwansyah

Website portfolio pribadi dengan style Neo Brutalism, dibangun dengan Next.js 16 + Supabase + Tailwind CSS v4.

## ✅ SETUP GUIDE

### Step 1 — Setup Supabase Tables

Kamu perlu buat tables di Supabase dulu. Caranya:

1. Buka: https://supabase.com/dashboard/project/quflfbtlkipmbgaqlqgo/sql/new
2. Login jika diminta
3. Copy semua isi file `supabase-schema.sql`
4. Paste di SQL Editor
5. Klik **Run**
6. Pastikan muncul "Success. No rows returned"

### Step 2 — Create Admin User di Supabase Auth

1. Buka: https://supabase.com/dashboard/project/quflfbtlkipmbgaqlqgo/auth/users
2. Klik **"Add user"** → **"Create new user"**
3. Masukkan:
   - Email: `pereman0813@gmail.com`
   - Password: buat password yang kamu ingat
4. Klik **Create User**

Dengan ini kamu bisa login ke `/admin` dengan kredensial tersebut.

### Step 3 — Run Development Server

```bash
npm run dev
```

Buka: http://localhost:3000

---

## 🌐 PAGES

| Route | Description |
|---|---|
| `/` | Public portfolio page |
| `/admin` | Admin dashboard (protected) |
| `/admin/login` | Admin login page |

---

## 🎨 FITUR

### Public Portfolio
- ✅ Hero section dengan terminal code block
- ✅ About me section dengan education info
- ✅ Skills section grouped by category
- ✅ Projects section dengan featured cards
- ✅ Contact section dengan mailto form
- ✅ Export CV (window.print)
- ✅ GitHub link

### Admin Panel (`/admin`)
- ✅ Login dengan Supabase Auth
- ✅ Edit Profile (nama, role, about, location, email, github)
- ✅ Manage Skills (add/delete)
- ✅ Manage Projects (add/edit/delete dengan tech stack)
- ✅ UI Settings (accent color, dark mode)
- ✅ Toast notifications
- ✅ Responsive (mobile + desktop)

---

## 🎨 THEME SYSTEM

Accent colors available:
- `yellow` (default) — `#f5e642`
- `green` — `#00ff88`
- `red` — `#ff3b3b`
- `teal` — `#00c2a8`

Ubah dari Admin Panel → Settings tab.

---

## 🚀 DEPLOY

### Vercel (recommended)
```bash
npm install -g vercel
vercel
```
Set env vars di Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### GitHub Pages
Tidak direkomendasikan untuk Next.js dengan SSR. Gunakan Vercel atau Railway.

---

## 📁 STRUKTUR FILE

```
src/
├── app/
│   ├── page.tsx              → Public portfolio
│   ├── layout.tsx            → Root layout + fonts
│   ├── globals.css           → Neo Brutal design system
│   └── admin/
│       ├── page.tsx          → Admin dashboard
│       ├── login/page.tsx    → Admin login
│       └── layout.tsx        → Admin layout
├── components/
│   └── portfolio/
│       ├── Nav.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
└── lib/
    ├── supabase.ts           → Supabase client
    ├── data.ts               → CRUD operations
    ├── theme.ts              → Theme management
    └── types.ts              → TypeScript types
```

---

## 🔧 TECH STACK

- **Next.js 16** (App Router + Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Supabase** (PostgreSQL + Auth)
- **@phosphor-icons/react**
- **Space Grotesk** + **JetBrains Mono** fonts
