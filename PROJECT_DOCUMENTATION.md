# 🚀 AI/ML & Developer Portfolio — Complete Setup & Deployment Guide

Welcome to the **AI/ML & Developer Portfolio Project**. This is a modern, high-performance, full-stack portfolio application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **Prisma ORM**, and **PostgreSQL**.

---

## 📋 Table of Contents
1. [Key Features](#-key-features)
2. [Tech Stack](#-tech-stack)
3. [Step-by-Step Installation & Setup](#-step-by-step-installation--setup)
4. [Environment Variables Reference](#-environment-variables-reference)
5. [Database Schema & Seed Data Files](#-database-schema--seed-data-files)
6. [Admin Panel Access](#-admin-panel-access)
7. [Free Deployment Guide (Vercel & Netlify)](#-free-deployment-guide-vercel--netlify)
8. [Troubleshooting & FAQs](#-troubleshooting--faqs)

---

## ✨ Key Features
- **Dynamic Content & Admin Panel**: Fully manageable via `/admin` dashboard (edit bio, projects, stats, experiences, and site settings without touching code).
- **Interactive UI & Animations**: Smooth animations powered by Framer Motion & GSAP with modern dark mode aesthetic.
- **Image Hosting**: Cloudinary integration for seamless image uploads (profile picture, project screenshots, CV file).
- **Contact Form & Email Notifications**: Automated email delivery via Resend API and storing messages in PostgreSQL.
- **Secure Authentication**: JWT session-based admin authentication with Bcrypt password hashing.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Lucide Icons
- **Database & ORM**: PostgreSQL + Prisma ORM (`@prisma/adapter-pg`)
- **Authentication**: JsonWebToken (JWT) + Bcryptjs
- **Media Storage**: Cloudinary SDK
- **Email Service**: Resend SDK

---

## 💻 Step-by-Step Installation & Setup

### Prerequisites
Before running the project locally, ensure you have installed:
- **Node.js**: v18.17.0 or higher
- **npm** (v9+) or **pnpm** or **yarn**
- **PostgreSQL Database** (Local PostgreSQL instance or free cloud database like [Neon.tech](https://neon.tech) / [Supabase](https://supabase.com))

---

### Step 1: Clone / Extract Project
```bash
cd portfolio-main
```

### Step 2: Install Project Dependencies
Run the following command in your terminal to install all required packages:
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` or `.env.local` file in the root directory of the project and add the following variables:

```env
# Database Connection URL (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db?sslmode=require"

# Initial Admin Credentials (Used during database seeding)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="YourSecurePassword123"

# Authentication Secret Key (Generate any random string)
JWT_SECRET="super-secret-random-jwt-key-change-this"

# Cloudinary Setup (Optional - for image upload feature)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Resend Email Setup (Optional - for contact form emails)
RESEND_API_KEY="re_123456789"
CONTACT_RECEIVE_EMAIL="your-email@example.com"
```

---

### Step 4: Generate Prisma Client & Push Database Schema
To generate the Prisma client and push the schema to your PostgreSQL database, run:

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Sync Database Schema with PostgreSQL
npx prisma db push
```

---

### Step 5: Seed Database with Initial Data
To populate the database with default projects, work experience, stats, site settings, and the initial admin user, run:

```bash
npx prisma db seed
```

*(Note: You can also use `schema.sql` to import the tables and seed data directly via SQL GUI tool like pgAdmin, DBeaver, or Neon SQL Editor).*

---

### Step 6: Start Local Development Server
Run the local dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to view your portfolio!

---

## 🔒 Admin Panel Access

- **Admin URL**: `http://localhost:3000/admin`
- **Default Email**: `admin@example.com` (or the value set in `ADMIN_EMAIL`)
- **Default Password**: `password123` (or the value set in `ADMIN_PASSWORD`)

From the `/admin` panel, you can:
1. Update Headline, Bio, Contact Information, Profile Picture, and CV Download Link.
2. Add, edit, reorder, or delete Projects.
3. Manage Work Experience and Education timelines.
4. Update Highlight Statistics (CGPA, Projects completed, etc.).
5. Read incoming contact messages.

---

## 🖼️ How to Attach / Change Profile Picture & Images

The buyer can update their Profile Picture, Project Images, and CV using any of the 3 methods below:

### Method 1: Admin Panel Direct Upload (Recommended)
1. Go to `http://localhost:3000/admin` (or your live site `/admin`).
2. Log in using `ADMIN_EMAIL` & `ADMIN_PASSWORD`.
3. Click on **Site Settings** in the left navigation sidebar.
4. Under **Images & Documents**:
   - Click **"Click to upload"** under **Profile Photo (Hero section)**.
   - Select your image file (PNG, JPG, WEBP).
5. Click **"Save Changes"**. The image will automatically upload to Cloudinary and display on the homepage.

### Method 2: Local Static Image (`/public` Folder Method)
If Cloudinary is not configured or you prefer keeping images local:
1. Copy your picture (e.g., `my-photo.jpg`) into the `public/` directory of the project.
2. Open `/admin` -> **Site Settings**.
3. Set the Profile Photo URL input to: `/my-photo.jpg`.
4. Click **"Save Changes"**.

### Method 3: External Direct Image URL
If your image is hosted online (e.g. Google Drive, GitHub, Imgur):
1. Copy the direct image link (e.g. `https://i.imgur.com/example.jpg`).
2. Paste the link into `/admin` -> **Site Settings** under Profile Photo URL.
3. Click **"Save Changes"**.

---

## 🗄️ Database Schema & Seed Data Files

The database structure consists of **6 primary models**:

1. **`SiteSettings`**: Stores hero section texts, bio, social links, email, and location.
2. **`Project`**: Stores portfolio project details (title, tags, images, links, gradient).
3. **`Experience`**: Stores work and education background details.
4. **`Stat`**: Key stats displayed on the home page.
5. **`ContactMessage`**: Stores messages submitted via contact form.
6. **`AdminUser`**: Holds admin account authentication data.

### Schema & Seed File Locations:
- **Prisma Schema File**: `prisma/schema.prisma`
- **TypeScript Seed Script**: `prisma/seed.ts`
- **Raw SQL Migration & Seed Script**: `schema.sql` *(Use this if importing directly into PostgreSQL without Prisma CLI)*

---

## 🌐 Free Deployment Guide (Vercel & Netlify)

### 1. Free PostgreSQL Database Setup (Neon.tech - Recommended)
1. Go to [Neon.tech](https://neon.tech) and create a free account.
2. Click **Create Project**, name your project `portfolio-db`.
3. Copy the PostgreSQL Connection String provided on the dashboard:
   `postgresql://neondb_owner:***@ep-***.us-east-2.aws.neon.tech/neondb?sslmode=require`
4. Set this URL as your `DATABASE_URL` environment variable.

---

### 2. Deploying on Vercel (100% Free & Recommended for Next.js)

Vercel is the native platform for Next.js applications.

#### Step 1: Push Code to GitHub
Upload/Push your project repository to GitHub.

#### Step 2: Import to Vercel
1. Log in to [Vercel.com](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.

#### Step 3: Configure Build & Environment Variables
- **Framework Preset**: Next.js
- **Build Command**: `prisma generate && next build`
- **Environment Variables**: Add all your environment variables in Vercel:
  - `DATABASE_URL`
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`
  - `JWT_SECRET`
  - `CLOUDINARY_CLOUD_NAME` (Optional)
  - `CLOUDINARY_API_KEY` (Optional)
  - `CLOUDINARY_API_SECRET` (Optional)
  - `RESEND_API_KEY` (Optional)
  - `CONTACT_RECEIVE_EMAIL` (Optional)

#### Step 4: Deploy & Seed DB
1. Click **Deploy**. Vercel will build and host your portfolio.
2. To seed your production database on Neon:
   Run locally:
   ```bash
   DATABASE_URL="your-production-neon-url" npx prisma db push
   DATABASE_URL="your-production-neon-url" npx prisma db seed
   ```
   Or run the SQL queries inside `schema.sql` directly inside Neon's SQL Editor console.

---

### 3. Deploying on Netlify (Free Tier)

#### Step 1: Connect Repository
1. Log in to [Netlify.com](https://netlify.com).
2. Click **Add new site** -> **Import an existing project**.
3. Select GitHub and pick your portfolio repository.

#### Step 2: Build Settings Configuration
- **Build command**: `npx prisma generate && npm run build`
- **Publish directory**: `.next`

#### Step 3: Add Environment Variables
Under **Site Settings** -> **Environment variables**, add:
- `DATABASE_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `JWT_SECRET`
- (Optional Cloudinary & Resend keys)

#### Step 4: Deploy
Click **Deploy site**. Netlify will automatically install `@netlify/plugin-nextjs` and serve your portfolio!

---

## ❓ Troubleshooting & FAQs

- **Q: Database connection error on Vercel?**
  - Ensure `?sslmode=require` is attached at the end of your `DATABASE_URL`.
- **Q: Admin password isn't working after seed?**
  - Verify your `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` before running `npx prisma db seed`.
- **Q: Cloudinary image uploads fail?**
  - Check that `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` are correctly configured.

---
*Created for AI/ML & Software Developer Portfolio project delivery.*
