# 🚀 TaskFlow - Modern MERN Stack ToDo Application

A full-stack, responsive, and aesthetic **MERN (MongoDB, Express.js, React, Node.js)** ToDo Application crafted specifically for **fresher portfolio showcases**. It demonstrates clean code architecture, RESTful API design, state management, modern UI/UX design with dark/light themes, and 1-click cloud deployment readiness for **Render** (backend) and **Netlify** (frontend).

---

## ✨ Features

- **Modern Glassmorphic UI**: Custom Vanilla CSS design system with smooth gradients, card shadows, and micro-animations.
- **Dark / Light Mode**: Persistent theme toggle with smooth CSS transitions.
- **Task Management (Full CRUD)**:
  - Create tasks with **Title**, **Description**, **Priority** (High, Medium, Low), **Category** (Work, Personal, Study, Health, General), and **Due Date**.
  - Interactive status checkbox with **celebratory confetti burst 🎉** upon task completion.
  - In-place editing and quick deletion.
- **Smart Filtering & Real-time Search**:
  - Filter by status: **All**, **Active**, **Completed**.
  - Filter by category & priority.
  - Live instant keyword search.
- **Visual Stats & Progress Bar**: Dynamic completion progress percentage and motivating messages.
- **Recruiter-Friendly Hybrid Mode**: Works with live MongoDB or gracefully falls back to persistent local storage if MongoDB isn't connected yet—guaranteeing your portfolio demo never breaks!
- **Overdue Task Indicators**: Highlights tasks whose deadlines have passed.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Vanilla CSS Design System, Lucide Icons, Canvas Confetti |
| **Backend** | Node.js, Express.js, CORS, Dotenv |
| **Database** | MongoDB with Mongoose ODM |
| **Hosting** | Render (Backend) + Netlify (Frontend) |

---

## 📁 Project Structure

```text
ToDo-List/
├── client/                     # React Frontend (Vite)
│   ├── public/
│   │   ├── _redirects          # Fixes Netlify 404 on page refresh
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Header, logo, theme toggle & status indicator
│   │   │   ├── StatsWidget.jsx # Metric cards & progress bar
│   │   │   ├── FilterBar.jsx   # Search & category/priority filters
│   │   │   ├── TodoForm.jsx    # Add/Edit task form
│   │   │   ├── TodoItem.jsx    # Task card with badges & confetti
│   │   │   ├── TodoList.jsx    # List renderer & empty states
│   │   │   └── Toast.jsx       # Action feedback toasts
│   │   ├── services/
│   │   │   └── api.js          # Centralized API service with offline fallback
│   │   ├── App.jsx             # Main application state
│   │   ├── index.css           # Vanilla CSS design tokens & animations
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express Backend API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # Mongoose MongoDB connection
│   │   ├── models/
│   │   │   └── Todo.js         # Mongoose schema
│   │   ├── controllers/
│   │   │   └── todoController.js # CRUD handlers & statistics
│   │   ├── routes/
│   │   │   └── todoRoutes.js   # REST API routes
│   │   └── server.js           # Server entry point
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 💻 Running Locally

### 1. Prerequisites
- Node.js installed (v18+ recommended)
- (Optional) Local MongoDB or free MongoDB Atlas account

### 2. Setup Backend
```bash
cd server
npm install

# Create .env (use defaults or your MongoDB URI)
# PORT=5000
# MONGODB_URI=mongodb://127.0.0.1:27017/todo-app
# CLIENT_URL=*

npm run dev    # Starts server on http://localhost:5000
```

### 3. Setup Frontend
Open a new terminal window:
```bash
cd client
npm install

# Start development server
npm run dev    # Runs on http://localhost:3000
```
Open `http://localhost:3000` in your browser!

---

## 🌐 Deployment Guide (Step-by-Step)

### Part 1: Setup Free Database (MongoDB Atlas)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free M0 cluster.
2. Under **Database Access**, create a user with username and password.
3. Under **Network Access**, click **Add IP Address** -> Select **Allow Access from Anywhere (0.0.0.0/0)**.
4. Under **Clusters**, click **Connect** -> Choose **Drivers (Node.js)** and copy your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
   ```

---

### Part 2: Deploy Backend on Render (Free)
1. Push your project to a GitHub repository.
2. Sign up / Log in to [render.com](https://render.com).
3. Click **New +** -> Select **Web Service**.
4. Connect your GitHub repository.
5. Configure the following settings:
   - **Name**: `todo-api` (or any name)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Scroll down to **Environment Variables** and add:
   - `MONGODB_URI`: `<Your MongoDB Atlas connection string>`
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `CLIENT_URL`: `*`
7. Click **Create Web Service**. Once deployed, copy your Render URL (e.g., `https://todo-api-xxxx.onrender.com`).

---

### Part 3: Deploy Frontend on Netlify (Free)
1. Sign up / Log in to [netlify.com](https://netlify.com).
2. Click **Add new site** -> **Import an existing project** -> Choose **GitHub**.
3. Select your repository.
4. Configure Build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
5. Click **Environment variables** -> **Add a variable**:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-render-app.onrender.com/api` *(Your Render backend URL followed by `/api`)*
6. Click **Deploy Site**.
7. In a minute, your website will be live with a free `.netlify.app` URL!

> **Note**: The `_redirects` file is already pre-configured in `client/public/_redirects` to prevent any 404 issues on page reloads!

---

## 👨‍💻 Author
- **Developer**: Adil Raza
- **Role**: Full Stack MERN Developer (Fresher)
- **License**: MIT
