# System Architecture Blueprint

## 1. Overview
**Elevatura / Tupe Brothers Interior Studio** is a full-stack web application designed for luxury architectural and interior design services. The system features a public-facing website with dynamic day/night visual theming, interactive project showcases, service breakdowns, lead capture/inquiries, and an administrative control panel (CMS) for managing enquiries, portfolio projects, journals/blogs, and landing page content.

---

## 2. Tech Stack

### Frontend
- **Framework**: React 19 (`react` + `react-dom` v19.2.8) with Vite 8 (`@vitejs/plugin-react` v6.0.4)
- **Routing**: React Router DOM v7 (`react-router-dom` v7.18.2)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite` v4.3.3) + Custom CSS Variables & Animations
- **Animations & Smooth Scroll**: Framer Motion v13 (`framer-motion` v13.1.0) & Lenis Scroll (`lenis` v1.3.26)
- **Icons**: React Icons (`react-icons` v5.7.0)
- **HTTP Client**: Axios (`axios` v1.19.0) with Request Interceptors

### Backend
- **Runtime & Framework**: Node.js (ES Modules `type: "module"`) with Express v5 (`express` v5.2.1)
- **Database**: MongoDB Atlas with Mongoose ODM (`mongoose` v9.9.2)
- **Authentication**: JSON Web Tokens (`jsonwebtoken` v9.0.3) & Bcrypt (`bcryptjs` v3.0.3)
- **File Uploads & Media**: Multer (`multer` v2.2.0) & Cloudinary SDK (`cloudinary` v2.10.0)
- **Notifications & Mailers**: Nodemailer (`nodemailer` v9.0.5) & WhatsApp Click-to-Chat Service
- **Dev Tools**: Nodemon (`nodemon` v3.1.14), Dotenv (`dotenv` v17.4.2), Cors (`cors` v2.8.6)

---

## 3. High-Level Architecture Diagram

```
+-------------------------------------------------------------------------+
|                              CLIENT TIER                                |
|                                                                         |
|   Public UI Pages (Day/Night Theme)        Admin Studio (Protected)     |
|   - Landing Page (Interactive Hero)        - Dashboard & Analytics      |
|   - Services (Residential/Commercial)      - Portfolio Project Manager  |
|   - Portfolio (Masonry & Inquiries)        - Journal / Blog CMS         |
|   - Blog & Article Reader                  - Customer Enquiry CRM       |
|   - Contact & Quote Request                - Live Front UI Configurator |
|                                            - Brand & Profile Settings   |
+------------------------------------+------------------------------------+
                                     |
                       Axios API Layer (JWT Bearer)
                                     |
+------------------------------------+------------------------------------+
|                              SERVER TIER                                |
|                                                                         |
|                          Express v5 REST API                            |
|                                                                         |
|   [Public Routes]                          [Protected Admin Routes]     |
|   - GET  /api/landing/content              - POST /api/admin/login      |
|   - POST /api/enquiry/add                  - GET  /api/admin/stats      |
|   - GET  /api/portfolio                    - PUT  /api/landing/content  |
|   - GET  /api/posts & /posts/:slug         - CRUD /api/portfolio/*      |
|   - GET  /api/gallery                      - CRUD /api/posts/*          |
|                                            - GET/PUT /api/enquiry/*     |
|                                            - POST /api/admin/send-email |
+------------------+----------------------------------+-------------------+
                   |                                  |
            Mongoose Models                     Third-Party Integrations
                   |                                  |
+------------------+------------------+   +-----------+-------------------+
|          DATABASE TIER              |   |       EXTERNAL SERVICES       |
|                                     |   |                               |
|   MongoDB Atlas Collections:        |   |   - Cloudinary (CDN & Media)  |
|   - admins                          |   |   - Nodemailer / Gmail SMTP   |
|   - enquiries                       |   |   - WhatsApp API (wa.me)      |
|   - landingcontents                 |   |   - Google Fonts (Outfit)     |
|   - portfolios                      |   +-------------------------------+
|   - posts                           |
|   - galleries                       |
+-------------------------------------+
```

---

## 4. Database Schema & Data Models

### 1. `Admin` (`Backend/models/Admin.js`)
- `name` (String, required)
- `email` (String, required, unique, lowercase)
- `password` (String, required, bcrypt-hashed via pre-save hook)
- Methods: `matchPassword(enteredPassword)`

### 2. `Enquiry` (`Backend/models/Enquiry.js`)
- `name` (String, required)
- `email` (String, required)
- `phone` (String, required)
- `message` (String, required)
- `status` (String, enum: `['Pending', 'Contacted', 'Closed']`, default: `'Pending'`)
- Timestamps: `createdAt`, `updatedAt`

### 3. `LandingContent` (`Backend/models/LandingContent.js`)
- `hero`: `{ badge, title, subtitle, backgroundImage, buttonText, trustBadges: [{ icon, text }] }`
- `stats`: `[{ number, label }]`
- `features`: `[{ icon, title, desc }]`
- `portfolio`: `[{ title, category, image }]`
- `testimonials`: `[{ name, location, text, rating, image }]`
- `footer`: `{ companyName, tagline, quickLinks, contact: { phone, whatsapp, email, address }, hours, copyright }`

### 4. `Portfolio` (`Backend/models/Portfolio.js`)
- `title` (String, required)
- `category` (String, required)
- `image` (String, required - supports image URLs and video URLs)
- `description` (String)
- Timestamps: `createdAt`, `updatedAt`

### 5. `Post` (`Backend/models/Post.js`)
- `title` (String, required)
- `slug` (String, required, unique)
- `category` (String, required)
- `description` (String, required)
- `content` (String, required - rich HTML or Markdown)
- `featuredImage` (String, required)
- Timestamps: `createdAt`, `updatedAt`

### 6. `Gallery` (`Backend/models/Gallery.js`)
- `title` (String, required)
- `category` (String, required)
- `imageUrl` (String, required)
- Timestamps: `createdAt`, `updatedAt`

---

## 5. Security & Authentication Flow

1. **Authentication Strategy**:
   - Stateless JWT tokens stored in Client `localStorage` under `adminToken`.
   - Admin details stored under `adminData`.
   - Default seed admin generated automatically on server startup if no admin exists (`admin@tupebrothers.in`).
2. **Authorization Middleware (`authMiddleware.js`)**:
   - Parses `Authorization: Bearer <token>`.
   - Decodes JWT using `process.env.JWT_SECRET`.
   - Attaches decoded admin payload to `req.admin`.
3. **CORS & Data Validation**:
   - `cors()` enabled globally.
   - Input payloads parsed via `express.json()`.
