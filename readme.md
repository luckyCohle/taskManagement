# 🚀 Team Task Manager (Full-Stack)

A full-stack task management application where teams can create, assign, and track tasks with role-based access control.

Built with a focus on clean architecture, real-world workflows, and production-ready patterns.

---

## ✨ Features

### 🔐 Authentication

* Secure Signup/Login with JWT
* Role-based access (Admin / Member)

### 📋 Task Management

* Admin can:

  * Create tasks
  * Assign tasks to users
  * View all tasks
* Members can:

  * View assigned tasks
  * Update task status (To Do → In Progress → Done)

### 📊 Dashboard

* Kanban-style task view
* Tasks grouped by status
* Real-time UI updates on status change
* Proper empty states for new users

---

## 🧠 System Design

### Roles

| Role   | Capabilities                   |
| ------ | ------------------------------ |
| Admin  | Create, assign, view all tasks |
| Member | View & update assigned tasks   |

---

### Data Models

#### User

* name
* email
* password (hashed)
* role (ADMIN / MEMBER)

#### Task

* title
* status (TODO / IN_PROGRESS / DONE)
* assignedTo
* assignedBy
* dueDate

---

## 🛠️ Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS

### Backend

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication

---

## 📦 Project Structure

```bash
backend/
  controllers/
  models/
  routes/
  middlewares/

frontend/
  app/
  components/
  utils/
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone <your-repo-url>
cd <project-folder>
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

## 🌐 API Endpoints

### Auth

* `POST /auth/signup`
* `POST /auth/login`

### Tasks

* `GET /task` → Admin (all tasks)
* `GET /task/me` → Member (assigned tasks)
* `POST /task` → Create task
* `PATCH /task/:id/status` → Update status

---

## 🧪 Demo Credentials

```txt
Admin:
email: admin@test.com
password: 123456

Member:
email: john@test.com
password: 123456
```

---

## 🎥 Demo

👉 [Add your demo video link here]

---

## 🌍 Live Deployment

👉 [Add your Railway deployed URL here]

---

## 🚧 Future Improvements

* Project-based task grouping
* Drag & drop Kanban board
* Notifications
* Task comments
* Role-based UI restrictions

---

## 💡 Key Highlights

* Clean separation of frontend and backend
* Role-based API design
* Scalable task structure
* Optimistic UI updates
* Error handling and edge-case handling

---

## 👨‍💻 Author

**Aayush Yadav**
Full-Stack Developer

---

## ⭐ If you like this project

Give it a star ⭐ — it helps!
