# Codebase Summary & File Inventory

## Directory Structure Overview

```
tupe-fork/
├── .agent/                             # Project memory & documentation
│   ├── architecture.md                 # System architecture & data flow
│   ├── codebase-summary.md             # Component & module breakdown
│   ├── project-status.md               # Audit, bugs & technical debt
│   └── production-roadmap.md           # Production-readiness action plan
├── Backend/                            # Node.js / Express backend
│   ├── config/
│   │   └── db.js                       # Mongoose MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js          # Admin auth, dashboard statistics
│   │   ├── emailController.js          # Nodemailer email response dispatch
│   │   ├── enquiryController.js        # Lead capture & status management
│   │   ├── galleryController.js        # Gallery asset management
│   │   ├── landingController.js        # Dynamic landing page content CMS
│   │   ├── portfolioController.js      # Portfolio projects CRUD
│   │   └── postController.js           # Journal / Blog post CRUD
│   ├── middleware/
│   │   ├── authMiddleware.js           # JWT authentication guard
│   │   └── uploadMiddleware.js         # Multer disk upload config
│   ├── models/
│   │   ├── Admin.js                    # Admin auth schema & password hashing
│   │   ├── Blog.js                     # Legacy blog schema (superseded by Post)
│   │   ├── Enquiry.js                  # Customer enquiry schema
│   │   ├── Feature.js                  # Feature model (standalone)
│   │   ├── Gallery.js                  # Gallery image schema
│   │   ├── LandingContent.js           # Full landing page document schema
│   │   ├── Portfolio.js                # Portfolio project schema
│   │   ├── Post.js                     # Journal / Post schema with slug
│   │   ├── Testimonial.js              # Testimonial schema (standalone)
│   │   └── User.js                     # Redundant user schema
│   ├── routes/
│   │   ├── adminRoutes.js              # /api/admin
│   │   ├── enquiryRoutes.js            # /api/enquiry
│   │   ├── galleryRoutes.js            # /api/gallery
│   │   ├── landingRoutes.js            # /api/landing
│   │   ├── portfolioRoutes.js          # /api/portfolio
│   │   └── postRoutes.js               # /api/posts
│   ├── services/
│   │   └── whatsappService.js          # WhatsApp click-to-chat URL builder
│   ├── .env                            # Backend environment configuration
│   ├── .env.example                    # Template environment variables
│   ├── package.json                    # Backend dependencies & scripts
│   └── server.js                       # App bootstrap, seed admin, middleware
└── frontend/                           # React 19 + Vite frontend
    ├── public/                         # Static public assets
    ├── src/
    │   ├── api/
    │   │   └── axios.js                # Configured Axios instance with JWT interceptor
    │   ├── assets/                     # High-res Day/Night images & icons
    │   ├── components/
    │   │   ├── AdminSidebar.jsx        # Admin navigation sidebar & mobile drawer
    │   │   ├── Footer.jsx              # Global public footer with hours & links
    │   │   ├── InquiryForm.jsx         # Reusable interactive lead intake form
    │   │   └── Navbar.jsx              # Responsive header with Theme Toggle & Logo
    │   ├── context/
    │   │   ├── AuthContext.jsx         # Admin authentication state & methods
    │   │   └── ThemeContext.jsx        # Day/Night theme state & body class sync
    │   ├── hooks/
    │   │   └── useLenis.js             # Smooth scrolling integration via Lenis
    │   ├── pages/
    │   │   ├── admin/
    │   │   │   ├── AdminDashboard.jsx  # Metrics overview & quick workspace actions
    │   │   │   ├── AdminLogin.jsx      # Authentication form
    │   │   │   ├── BlogManagement.jsx  # Blog post CRUD interface
    │   │   │   ├── EnquiriesManagement.jsx # Lead tracking, status toggles & email replies
    │   │   │   ├── FrontUIDesign.jsx   # Live CMS editor for hero, footer & badges
    │   │   │   ├── PortfolioManagement.jsx # Portfolio CRUD with image/video preview
    │   │   │   └── SettingsPage.jsx    # Brand identity & contact info settings
    │   │   ├── AboutPage.jsx           # Studio ethos, founders, milestones
    │   │   ├── ArchitecturalDesign.jsx # Architectural design deep-dive
    │   │   ├── BlogDetail.jsx          # Individual blog post article reader
    │   │   ├── BlogPage.jsx            # Blog listing & insights
    │   │   ├── CommercialDesignPage.jsx# Commercial workplace design service
    │   │   ├── ConsultationPage.jsx    # Design consultation booking
    │   │   ├── ContactPage.jsx         # Contact form, direct inquiry & office info
    │   │   ├── GalleryPage.jsx         # Category-filtered visual photo gallery
    │   │   ├── LandingPage.jsx         # Flagship interactive landing experience
    │   │   ├── NotFoundPage.jsx        # Architectural luxury 404 error page
    │   │   ├── PortfolioPage.jsx       # Masonry grid, day/night toggles, project inquiry
    │   │   ├── RenovationPage.jsx      # Renovation & remodeling service
    │   │   ├── ResidentialDesignPage.jsx # Residential architecture & styling
    │   │   └── ServicesPage.jsx        # Master services overview with accordions
    │   ├── App.css                     # Custom styling rules
    │   ├── App.jsx                     # Route definitions & global layout wrapper
    │   ├── index.css                   # Tailwind CSS imports & theme definitions
    │   └── main.jsx                    # React root entrypoint
    ├── package.json                    # Frontend dependencies & scripts
    └── vite.config.js                  # Vite configuration with React plugin & Tailwind
```

---

## Key Modules & Responsibilities

### 1. State Management & Contexts
- **`AuthContext`**: Manages `admin`, `loading`, `login()`, `logout()`. Stores JWT in `localStorage`.
- **`ThemeContext`**: Controls `isNightMode` state, reads/writes `localStorage.getItem('elevatura-theme')`, toggles `.dark` class on root HTML elements.
- **`useLenis`**: Initializes high-performance smooth inertia scrolling.

### 2. Frontend Routing Structure (`App.jsx`)
- Public Pages:
  - `/` -> `LandingPage`
  - `/about` -> `AboutPage`
  - `/contact` -> `ContactPage`
  - `/portfolio` -> `PortfolioPage`
  - `/blog` -> `BlogPage`
  - `/services` -> `ServicesPage`
  - `/services/residential` -> `ResidentialDesignPage`
  - `/services/commercial` -> `CommercialDesignPage`
  - `/services/architectural` -> `ArchitecturalDesign`
  - `/services/consultation` -> `ConsultationPage`
  - `/services/renovation` -> `RenovationPage`
- Admin Studio (Protected):
  - `/admin/login` -> `AdminLogin`
  - `/admin/dashboard` -> `AdminDashboard`
  - `/admin/front-ui` -> `FrontUIDesign`
  - `/admin/portfolio` -> `PortfolioManagement`
  - `/admin/enquiries` -> `EnquiriesManagement`
  - `/admin/blog` -> `BlogManagement`
  - `/admin/settings` -> `SettingsPage`

### 3. Backend Endpoints Summary
| Method | Route | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/admin/login` | Authenticate admin & receive JWT | No |
| `POST` | `/api/admin/register` | Initial admin registration | No |
| `GET` | `/api/admin/profile` | Get current logged-in admin details | Yes |
| `GET` | `/api/admin/stats` | Aggregate dashboard numbers | Yes |
| `POST` | `/api/admin/send-email` | Send customer response via Nodemailer | Yes |
| `POST` | `/api/enquiry/add` | Submit contact / project lead form | No |
| `GET` | `/api/enquiry/all` | List all inquiries | Yes |
| `GET` | `/api/enquiry/:id` | Get single inquiry | Yes |
| `PUT` | `/api/enquiry/:id` | Update inquiry status (Pending/Contacted/Closed) | Yes |
| `GET` | `/api/landing/content` | Fetch live landing page content | No |
| `PUT` | `/api/landing/content` | Update landing page hero/stats/footer | Yes |
| `GET` | `/api/portfolio` | List all portfolio projects | No |
| `POST` | `/api/portfolio` | Create new portfolio project | Yes |
| `PUT` | `/api/portfolio/:id` | Edit portfolio project | Yes |
| `DELETE`| `/api/portfolio/:id` | Delete portfolio project | Yes |
| `GET` | `/api/posts` | List published blog posts | No |
| `GET` | `/api/posts/:slug` | Get single blog post by slug | No |
| `POST` | `/api/posts` | Create blog post | Yes |
| `PUT` | `/api/posts/:id` | Edit blog post | Yes |
| `DELETE`| `/api/posts/:id` | Delete blog post | Yes |
| `GET` | `/api/gallery` | List gallery images | No |
| `GET` | `/api/gallery/category/:category` | Filter gallery images by category | No |
| `POST` | `/api/gallery` | Add gallery image | Yes |
| `DELETE`| `/api/gallery/:id` | Delete gallery item | Yes |
