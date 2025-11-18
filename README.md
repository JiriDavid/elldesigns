# EllDesigns Couture Platform

A futuristic fashion experience for **EllDesigns**, a premium tailoring house based in Zimbabwe. Built with **Next.js 14 App Router** (JavaScript), the platform showcases luxury collections, handles client enquiries, and equips administrators with an end-to-end studio dashboard.

## ✨ Feature Overview

- **Immersive hero** with Cloudinary-hosted runway visuals, Framer Motion micro-interactions, and bold branding.
- **Collections explorer** displaying MongoDB-powered product data, responsive galleries, and deep dives per garment.
- **Product stories** with wishlists, authenticated comments, bespoke order requests, and WhatsApp concierge links.
- **About & Contact experiences** blending narrative, mission, embedded maps, and a secure message form.
- **Admin atelier dashboard** (Clerk-protected) featuring product CRUD with Cloudinary uploads, order pipeline tracking, and message triage.
- **Dynamic SEO metadata**, sticky navigation, responsive Tailwind theming, and lazy-loaded media.

## 🧱 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS, Framer Motion, React Icons
- **Auth**: Clerk
- **Database**: MongoDB with Mongoose
- **Media**: Cloudinary + `next-cloudinary`
- **Tooling**: ESLint, Tailwind Forms & Line Clamp plugins

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Duplicate `.env.example` to `.env.local` and populate the secrets:

```
MONGODB_URI=your-mongodb-connection-string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
ADMIN_CLERK_USER_ID=user_123
NEXT_PUBLIC_ADMIN_CLERK_USER_ID=user_123
CLOUDINARY_CLOUD_NAME=ellstudio
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=unsigned_or_signed_preset
```

> The `ADMIN_CLERK_USER_ID` gates the dashboard. Set both server and client IDs to your Clerk admin user.

### 3. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` to explore the experience.

## 🗄️ Database Models

`models/Product.js`

- `name`, `category`, `description`, `price`, `sizes[]`, `media[]`

`models/Order.js`

- `productId`, `userId`, `quantity`, `size`, `color`, `notes`, `status`

`models/Comment.js`

- `productId`, `userId`, `authorName`, `content`

`models/Message.js`

- `name`, `email`, `message`, `source`

`models/Wishlist.js`

- `userId`, `productId` (unique pair)

## 📦 Cloudinary Setup

1. Create an upload preset (unsigned or signed).
2. Ensure the preset allows images and short-form video if needed.
3. Provide the preset name via `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.
4. The admin dashboard uses the `/api/cloudinary/signature` endpoint for secure uploads when a signature is required.

## 🔐 Authentication & Authorization

- Public pages are accessible to everyone.
- Clerk handles sign-in and sign-up flows at `/sign-in` and `/sign-up`.
- Wishlist + comment features require an authenticated user.
- Dashboard routes are protected both client-side (navigation) and server-side (redirect) using the `ADMIN_CLERK_USER_ID` guard.

## 🛠️ Admin Dashboard Highlights

- **Product studio**: add, edit, delete items with live Cloudinary gallery previews.
- **Order lane**: monitor bespoke requests, update statuses (`new`, `in-progress`, `completed`), and archive.
- **Message desk**: read and clear customer messages submitted via the contact form.

## 🧪 Quality Checklist

- Tailwind configuration extends the EllDesigns palette and fonts.
- Remote Cloudinary assets whitelisted in `next.config.mjs`.
- Mongoose connection cached in `lib/db.js` for serverless efficiency.
- All API routes return JSON payloads with meaningful status codes and error handling.

## 📸 Customisation Tips

- Replace placeholder Cloudinary public IDs (`fashion-runway-video`, demo images) with brand-specific media.
- Update hero copy, statistics, and testimonial voices in `lib/constants.js` and home components.
- Expand the dashboard with analytics, bulk uploads, or multi-admin roles as the atelier grows.

Enjoy crafting couture software for EllDesigns! ✂️
