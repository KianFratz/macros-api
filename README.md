# Macro API

A RESTful API for managing food, nutrition data, and serving sizes. Built with Express, TypeScript, and Prisma for tracking macros (calories, protein, carbs, fat, etc.) across foods and their serving options.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT (jsonwebtoken) + bcryptjs
- **Validation:** Joi

## Project Structure

```
macro-api/
├── prisma/
│   └── schema.prisma          # Database schema & models
├── src/
│   ├── api/v1/
│   │   ├── controllers/      # Request handlers
│   │   ├── data/             # Table creation scripts
│   │   ├── interfaces/       # TypeScript types
│   │   ├── lib/              # Prisma client
│   │   ├── middlewares/      # Auth, authorization, error handling
│   │   ├── models/           # Data access layer
│   │   ├── routes/           # API route definitions
│   │   └── utils/            # Helpers
│   ├── config/               # Database configuration
│   ├── generated/prisma/     # Generated Prisma client
│   ├── index.ts              # Entry point
│   └── server.ts             # Express app setup
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
# Server
PORT=3001
NODE_ENV=development

# Database (for pg Pool - legacy)
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
PASSWORD=your_db_password
DB_PORT=5432

# Prisma connection string
DATABASE_URL="postgresql://user:password@localhost:5432/your_db_name"

# JWT
JWT_SECRET=your_jwt_secret_key
```

3. Generate the Prisma client and sync the database:

```bash
npx prisma generate
npx prisma db push
```

Or use migrations:

```bash
npx prisma migrate dev --name init
```

4. Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3001`.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload (nodemon + tsx) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled production build |

## API Endpoints

Base URL: `/v1/api`

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login` | Login (returns JWT) |
| POST | `/logout` | Logout |

### Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/users` | Public | Register a new user |
| GET | `/users` | manager, admin | Get all users |
| GET | `/users/:id` | manager, admin | Get user by ID |
| PUT | `/users/:id` | manager, admin | Update user |
| DELETE | `/users/:id` | manager, admin | Delete user |

### Categories

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/categories` | Public | Get all categories |
| GET | `/categories/:id` | Public | Get category by ID |
| POST | `/categories` | admin, manager | Create category |
| PUT | `/categories/:id` | admin, manager | Update category |
| DELETE | `/categories/:id` | admin, manager | Delete category |

### Foods

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/foods` | Public | Get all foods |
| GET | `/foods/:id` | Public | Get food by ID |
| POST | `/foods` | admin, manager | Create food |
| PUT | `/foods/:id` | admin, manager | Update food |
| DELETE | `/foods/:id` | admin, manager | Delete food |

### Nutrition

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/nutrition` | Public | Get all nutrition entries |
| GET | `/nutrition/:id` | Public | Get nutrition by ID |
| POST | `/nutrition` | admin, manager | Create nutrition entry |
| PUT | `/nutrition/:id` | admin, manager | Update nutrition |
| DELETE | `/nutrition/:id` | admin, manager | Delete nutrition |

### Servings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/servings` | Public | Get all servings |
| GET | `/servings/:id` | Public | Get serving by ID |
| POST | `/servings` | admin, manager | Create serving |
| PUT | `/servings/:id` | admin, manager | Update serving |
| DELETE | `/servings/:id` | admin, manager | Delete serving |

### Protected Routes

For protected routes, include the JWT in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

## Data Models

- **User** – name, email, password, role (user/manager/admin)
- **Category** – name (e.g. Fruits, Vegetables)
- **Food** – name, description, category, verification status
- **Nutrition** – calories, protein, fat, fiber, sugar, sodium, carbs (per food)
- **Serving** – serving name, grams (per food, e.g. "1 cup", "100g")

Relations: Category → Foods → Nutrition, Servings

## License

ISC
