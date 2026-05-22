# DevPulse API

> A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.

**Live URL:** https://devpulse-api-mocha.vercel.app

---

## ✨ Features

- User registration & login with JWT authentication
- Role-based access control (`contributor` / `maintainer`)
- Create, view, update, and delete issues
- Filter issues by type and status
- Sort issues by newest or oldest
- Secure password hashing with bcrypt
- Centralized error handling
- Modular, scalable codebase

---

## 🛠️ Tech Stack

| Technology    | Usage                          |
|---------------|-------------------------------|
| Node.js       | Runtime environment            |
| TypeScript    | Type-safe development          |
| Express.js    | Web framework                  |
| PostgreSQL    | Relational database (NeonDB)   |
| `pg`          | Native PostgreSQL driver       |
| bcryptjs      | Password hashing               |
| jsonwebtoken  | JWT auth token generation      |
| cors          | Cross-origin resource sharing  |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- PostgreSQL database (e.g., [NeonDB](https://neon.tech))

### 1. Clone the repository

```bash
git clone https://github.com/webpromahdi/devpulse.git
cd devpulse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=
CONNECTIONSTRING=
JWT_SECRET=
```

### 4. Run the development server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint           | Access  | Description              |
|--------|--------------------|---------|--------------------------|
| POST   | `/api/auth/signup` | Public  | Register a new user      |
| POST   | `/api/auth/login`  | Public  | Login and receive JWT    |

### Issues

| Method | Endpoint          | Access                        | Description                  |
|--------|-------------------|-------------------------------|------------------------------|
| POST   | `/api/issues`     | Authenticated                 | Create a new issue           |
| GET    | `/api/issues`     | Public                        | Get all issues (with filters)|
| GET    | `/api/issues/:id` | Public                        | Get a single issue           |
| PATCH  | `/api/issues/:id` | Authenticated                 | Update an issue              |
| DELETE | `/api/issues/:id` | Maintainer only               | Delete an issue              |

### Query Parameters for `GET /api/issues`

| Param    | Values                              | Default   |
|----------|-------------------------------------|-----------|
| `sort`   | `newest`, `oldest`                  | `newest`  |
| `type`   | `bug`, `feature_request`            | (none)    |
| `status` | `open`, `in_progress`, `resolved`   | (none)    |

### Request Headers (protected routes)

```
Authorization: <JWT_TOKEN>
```

---

## 🗄️ Database Schema

### `users` table

| Column       | Type         | Description                              |
|--------------|--------------|------------------------------------------|
| `id`         | SERIAL PK    | Auto-incrementing unique ID              |
| `name`       | VARCHAR(150) | Full display name (required)             |
| `email`      | VARCHAR(255) | Unique login address (required)          |
| `password`   | TEXT         | Bcrypt hashed password (required)        |
| `role`       | VARCHAR(20)  | `contributor` or `maintainer` (default: `contributor`) |
| `created_at` | TIMESTAMP    | Auto-generated on insert                 |
| `updated_at` | TIMESTAMP    | Auto-updated on change                   |

### `issues` table

| Column        | Type         | Description                                              |
|---------------|--------------|----------------------------------------------------------|
| `id`          | SERIAL PK    | Auto-incrementing unique ID                              |
| `title`       | VARCHAR(150) | Short headline (required, max 150 chars)                 |
| `description` | TEXT         | Detailed explanation (required, min 20 chars)            |
| `type`        | VARCHAR(20)  | `bug` or `feature_request`                               |
| `status`      | VARCHAR(20)  | `open`, `in_progress`, `resolved` (default: `open`)      |
| `reporter_id` | INT          | ID of the user who submitted the issue                   |
| `created_at`  | TIMESTAMP    | Auto-generated on insert                                 |
| `updated_at`  | TIMESTAMP    | Auto-updated on change                                   |

---

## 📁 Project Structure

```
src/
├── config/         # Environment variable configuration
├── db/             # Database pool and schema initialization
├── middleware/     # Auth middleware, global error handler
├── module/
│   ├── auth/       # Signup & login (controller, service, route, interface)
│   └── issues/     # Issues CRUD (controller, service, route, interface)
├── utility/        # Reusable helpers (sendResponse, catchAsync)
├── app.ts          # Express app setup
└── server.ts       # Server entry point
```

---

## 👤 Author

Built with webpromahdi.
