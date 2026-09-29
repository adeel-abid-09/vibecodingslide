# 🗺️ "Where Does It Go?" — The Definitive File & Folder Placement Matrix

The #1 point of confusion for beginners using AI to write code is:
> *"The AI gave me this code snippet... WHERE do I paste it?!"*

Keep this cheat-sheet open during every single class and coding session.

---

## 🏛️ The Full-Stack Monorepo Anatomy

```
my-mern-app/
├── client/                     # FRONTEND (Everything the user sees in the browser)
│   ├── public/                 # Static assets (favicons, public images)
│   ├── src/
│   │   ├── assets/             # Images, logos, SVG icons
│   │   ├── components/         # Reusable UI widgets (Buttons, Modals, Cards, Navbars)
│   │   ├── pages/              # Full screens corresponding to URLs (Home, Login, Dashboard)
│   │   ├── context/            # Global state (User authentication, shopping cart, theme)
│   │   ├── services/           # API helper functions (Axios calls to backend)
│   │   ├── App.jsx             # Top-level router & page layout
│   │   ├── main.jsx            # React root mount point (don't touch often)
│   │   └── index.css           # Global typography, color variables, and styling
│   ├── index.html              # HTML shell where React mounts into <div id="root">
│   ├── package.json            # Frontend libraries (React, Lucide icons, Axios, etc.)
│   └── vite.config.js          # Build configuration & dev port
│
├── server/                     # BACKEND (Everything running silently on your machine/cloud)
│   ├── config/
│   │   └── db.js               # MongoDB connection logic (mongoose.connect)
│   ├── models/                 # Database Schema Blueprints (Mongoose models)
│   ├── controllers/            # The Brains: Functions that query DB and return JSON
│   ├── routes/                 # The Traffic Directors: URL endpoints (GET /api/items, etc.)
│   ├── middleware/             # Gatekeepers: Auth verification (JWT), error handlers
│   ├── .env                    # ULTRA SECRET: Database passwords, JWT keys, PORT
│   ├── .gitignore              # Ignores node_modules, .env from Git
│   ├── package.json            # Backend libraries (Express, Mongoose, dotenv, cors, bcrypt)
│   └── server.js               # Entry point: Express initialization, middleware, routes
│
└── README.md
```

---

## 🎯 Quick Lookup Decision Matrix

| What does this code do? | Technology | Target File / Folder | Example Filename |
| :--- | :--- | :--- | :--- |
| Defines the fields in a database record | **Mongoose** | `server/models/` | `User.js`, `Product.js`, `Task.js` |
| Listens to a URL path like `/api/products` | **Express Router** | `server/routes/` | `productRoutes.js`, `authRoutes.js` |
| Queries MongoDB (`.find()`, `.create()`) | **Express Controller** | `server/controllers/` | `productController.js`, `authController.js` |
| Checks if user has a valid JWT token | **Middleware** | `server/middleware/` | `authMiddleware.js`, `errorMiddleware.js` |
| Stores DB connection string or secrets | **Environment** | `server/.env` | `.env` |
| Registers route URLs with Express app | **Express App** | `server/server.js` | `server.js` (`app.use('/api/users', userRoutes)`) |
| Connects to MongoDB cluster | **Mongoose** | `server/config/db.js` | `db.js` |
| A reusable button, card, modal, or header | **React Component** | `client/src/components/` | `Navbar.jsx`, `TaskCard.jsx`, `Modal.jsx` |
| A full page view attached to a URL route | **React Page** | `client/src/pages/` | `HomePage.jsx`, `LoginPage.jsx`, `Dashboard.jsx` |
| Sets up URL routing (`<Route path=... />`) | **React Router** | `client/src/App.jsx` | `App.jsx` |
| Global user state (logged-in user object) | **React Context** | `client/src/context/` | `AuthContext.jsx` |
| Axios/fetch functions that talk to backend | **API Helper** | `client/src/services/` | `api.js` |
| Global CSS, font imports, background colors | **CSS** | `client/src/index.css` | `index.css` |

---

## ⚠️ The 3 Cardinal Rules of Placement

1. **Rule 1: Secrets NEVER touch the frontend.**
   - Never put database passwords, private API keys, or secret tokens inside `client/`. Anyone can open Chrome DevTools and read everything in the frontend.
2. **Rule 2: Keep routes thin and controllers smart.**
   - `routes/*.js` should only declare the URL and HTTP verb (`router.get('/', getProducts)`).
   - `controllers/*.js` should contain the `async (req, res) => { ... }` database logic.
3. **Rule 3: Pages assemble Components.**
   - A page in `pages/Dashboard.jsx` shouldn't be 800 lines long. It should import `<Navbar />`, `<Sidebar />`, and `<StatCard />` from `components/`.
