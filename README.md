# MERN Travel Blog — Wanderlust

A fully responsive travel-magazine blog built with the MERN stack.

## Structure

```
Blog-Site/
  backend/    Express + MongoDB API (port 5000)
  frontend/   Public React blog (port 5173)
  admin/      Admin React panel (port 5174)
```

## Features

- User register / login / logout (JWT)
- Public blog: home, stories list, post detail, about, contact
- Dark / light mode on the public site
- Admin panel: create, update, delete posts with cover image upload
- Seeded admin account (role cannot be claimed via register)
- Responsive UI with Framer Motion animations

## Prerequisites

- Node.js 18+
- MongoDB Atlas connection string

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI, JWT_SECRET, and admin credentials
npm install
npm run dev
```

Default admin (keep `backend/.env` and `admin/.env` in sync):

- Email: `Haris@gmail.com`
- Password: `Haris@123`

Cloudinary credentials go in `backend/.env` (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`). Cover images upload to Cloudinary.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

### 3. Admin

```bash
cd admin
npm install
npm run dev
```

Open http://localhost:5174 and sign in with the seeded admin account.

## Environment

### backend/.env

| Variable | Description |
|----------|-------------|
| `PORT` | API port (default `5000`) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret for signing tokens |
| `ADMIN_EMAIL` | Seeded admin email |
| `ADMIN_PASSWORD` | Seeded admin password |
| `CLIENT_URL` | Frontend origin for CORS |
| `ADMIN_URL` | Admin origin for CORS |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_CALLBACK_URL` | `http://localhost:5000/api/auth/google/callback` |

In Google Cloud Console, add authorized redirect URI:

`http://localhost:5000/api/auth/google/callback`

Also add authorized JavaScript origin: `http://localhost:5173`

### frontend/.env

```
VITE_API_URL=http://localhost:5000/api
VITE_ASSET_URL=http://localhost:5000
```

### admin/.env

```
VITE_API_URL=http://localhost:5000/api
VITE_ASSET_URL=http://localhost:5000
VITE_ADMIN_EMAIL=Haris@gmail.com
VITE_ADMIN_PASSWORD=Haris@123
```

Vite only exposes variables prefixed with `VITE_`.

## API overview

| Method | Path | Access |
|--------|------|--------|
| POST | `/api/auth/register` | public |
| POST | `/api/auth/login` | public |
| GET | `/api/auth/google` | public (Google OAuth start) |
| GET | `/api/auth/google/callback` | public (Google OAuth callback) |
| GET | `/api/auth/me` | auth |
| GET | `/api/posts` | public |
| GET | `/api/posts/:slug` | public |
| GET | `/api/admin/posts` | admin |
| POST | `/api/admin/posts` | admin (multipart) |
| PUT | `/api/admin/posts/:id` | admin (multipart) |
| DELETE | `/api/admin/posts/:id` | admin |

Uploaded images are stored in `backend/uploads` and served at `/uploads/...`.

## Security note

Do not commit `.env` files. If a database password was shared in chat or committed, rotate it in MongoDB Atlas.
