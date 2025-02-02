# full-stack-todo
Todo App - Backend

A simple, authentication-protected Todo App built with Node.js, Express.js, Prisma, PostgreSQL, and Docker.

Features

User Authentication: Register and log in with JWT-based authentication.

Todo Management: Create, update, delete, and view todos (protected routes).

Database Management: Uses Prisma ORM with PostgreSQL.

Dockerized Setup: Easily run the app in a containerized environment.

Project Structure

backend-todo-app/
│
├── prisma/                 # Prisma schema & migrations
│   ├── schema.prisma       # Database schema definition
│   ├── migrations/         # Database migration files
│
├── src/
│   ├── middleware/         # JWT authentication middleware
│   ├── routes/             # API routes (auth & todos)
│   ├── prismaClient.js     # Prisma database setup
│   ├── server.js           # Main Express server
│
├── Dockerfile              # Docker setup
├── docker-compose.yaml     # Docker Compose configuration
├── package.json            # Dependencies & scripts
├── .env                    # Environment variables
└── todo-app.rest           # REST client for testing API requests

Setup Instructions

1. Clone the Repository

git clone https://github.com/your-username/backend-todo-app.git
cd backend-todo-app

2. Generate Prisma Client

npx prisma generate

3. Build and Run with Docker

docker compose up --build

4. Apply Database Migrations

docker compose run app npx prisma migrate dev --name init

5. Access the App

API will be available at: http://localhost:5003

Frontend (if connected) can interact with this backend.

6. Testing API Requests (Optional)

Use the todo-app.rest file in VS Code with the REST Client extension to send requests for:✅ User registration✅ Login (get JWT token)✅ Creating, updating, deleting, and fetching todos

Stopping the App