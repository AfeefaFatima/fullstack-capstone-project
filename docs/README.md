# GiftLink Capstone

GiftLink is a full-stack MERN-style community reuse platform. Users can browse free household items, search by keyword/category, open item details, comment, register/login with JWT, and edit their profiles.

## Architecture
- Backend: Node.js + Express + MongoDB native driver, MVC structure.
- Frontend: React + Vite + React Router.
- Authentication: JWT + bcrypt.
- Containerization: Docker Compose.
- CI/CD: GitHub Actions.
- Search: MongoDB filtering plus `natural` package imported in `backend/index.js`.

## MVC backend
`config/` database connection; `models/` data definitions; `controllers/` business logic; `routes/` REST routes; `middleware/` authentication; `server.js` startup.

## Required API routes
- GET `/api/gifts`
- GET `/api/gifts/:id`
- GET `/api/search?q=&category=`
- POST `/api/auth/register`
- POST `/api/auth/login`
- PUT `/api/auth/profile`
- POST `/api/gifts/:id/comments`
