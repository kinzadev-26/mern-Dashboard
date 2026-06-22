#  Mini MERN Admin Dashboard

A full-stack admin dashboard built with the MERN stack as part of Week 2 Internship Task at **Dawood Tech NextGen**.

---

##  Project Overview

This project is a real-world admin dashboard system connected with REST APIs, featuring JWT authentication, user management, task management, and a fully responsive UI.

---

##  Features

###  Authentication
- User Registration & Login
- JWT-based authentication
- Protected Routes (unauthorized users redirected to login)
- Logout functionality

###  Dashboard
- Analytics cards (Users, Revenue, Tasks, Growth)
- Recent Activity feed
- Today's Tasks with toggle (Pending/Completed)
- Clickable elements navigating to relevant pages

###  User Management
- View all users in a table
- Add new users
- Edit existing users
- Delete users
- Search/filter users by name or email

###  Task Management
- Create tasks with title & description
- Toggle task status (Pending ↔ Completed)
- Delete tasks
- Filter by All / Pending / Completed

###  Analytics
- Weekly Task Activity (Bar Chart)
- Task Status breakdown (Pie/Donut Chart)
- User Growth over 6 months (Line Chart)

###  Time Tracking
- View daily task activity
- Play/Pause task timers
- Weekly hours summary with visual bar chart

###  Inbox
- View messages with read/unread status
- Star important messages
- Click to read full message in modal

###  Settings
- View & edit profile information
- Password change UI
- Notification preferences toggle

###  Calendar
- Interactive monthly calendar
- Navigate between months
- Click events to view details
- Upcoming events list

---

##  Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js (Functional Components) | UI Framework |
| Tailwind CSS | Styling |
| React Router DOM | Client-side routing |
| Axios | API calls |
| Context API | Global state management |
| Recharts | Data visualization |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Server framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT (jsonwebtoken) | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variables |
| nodemon | Development server |

---

##  Folder Structure
```
mern-dashboard/

├── client/                   # React Frontend
│   └── src/
│       ├── components/      
│       │   ├── Sidebar.jsx
│       │   ├── Navbar.jsx
│       │   ├── DashboardLayout.jsx
│       │   ├── StatsCard.jsx
│       │   └── ProtectedRoute.jsx
│       ├── pages/            
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Analytics.jsx
│       │   ├── TaskList.jsx
│       │   ├── Users.jsx
│       │   ├── Tracking.jsx
│       │   ├── Inbox.jsx
│       │   ├── Settings.jsx
│       │   └── CalendarPage.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── services/
│       │   └── api.jsx
│       ├── App.jsx
│       |── main.jsx
├       |── .env
│
└── server/               # Express Backend
├── controllers/
│   ├── authController.js
│   ├── taskController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   └── Task.js
├── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
├── .env
└── index.js
```
---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed locally OR MongoDB Atlas account

### 1. Clone the Repository
```bash
git clone https://github.com/kinzadev-26/mern-Dashboard
cd mern-dashboard
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create `.env` file in `/server`:

MONGO_URI=mongodb://localhost:27017/mern-dashboard
PORT=5000
JWT_SECRET=your_secret_key_here

Start the server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../client
npm install
npm run dev
```

### 4. Open in Browser
http://localhost:5173

---

##  API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

### Tasks
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

### Users
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/users | Get all users |
| POST | /api/users | Create user |
| PUT | /api/users/:id | Update user |
| DELETE | /api/users/:id | Delete user |

---

## Developer

**Kinza Imtiaz**
Intern — Dawood Tech NextGen
Week 2 Task: Advanced React.js + REST API Integration

---