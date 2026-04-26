# Task Manager App

A clean, modern, and minimal full-stack Task Manager application. 

This project was built with a strict separation of concerns, utilizing a React frontend and a Node.js/Express backend with an in-memory data store. It features a polished, responsive UI with zero external UI dependencies (no Bootstrap, Tailwind, or Material UI) — everything is crafted with pure CSS.

![Task Manager UI](https://via.placeholder.com/800x400.png?text=Task+Manager+App)

## ✨ Features

- **Add & Delete Tasks:** Fully functional CRUD operations connecting to a REST API.
- **Modern UI/UX:** Centered card layout, soft gradient background, subtle hover/focus effects, and smooth transitions.
- **Zero UI Libraries:** 100% custom CSS utilizing CSS variables for consistent design tokens.
- **Responsive Design:** Works seamlessly across desktop and mobile devices.
- **In-Memory Store:** Backend uses a lightweight array to store tasks (resets on server restart).

---

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Functional Components & Hooks (`useState`, `useEffect`)
- Fetch API
- Pure CSS

**Backend:**
- Node.js
- Express.js
- CORS

---

## 🚀 Getting Started

To run this project locally, you will need to start both the backend server and the frontend development server.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Start the Backend

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
   *The backend API will run on `http://localhost:5000`.*

### 2. Start the Frontend

1. Open a **new** terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
   *The frontend will automatically open in your browser at `http://localhost:3000`.*

---

## 📡 API Endpoints

The Express backend exposes the following RESTful endpoints:

| Method   | Endpoint       | Description                                  |
| :---     | :---           | :---                                         |
| `GET`    | `/tasks`       | Fetch all tasks currently in the store.      |
| `POST`   | `/tasks`       | Create a new task. Expects `{ text: "..." }`.|
| `DELETE` | `/tasks/:id`   | Delete a specific task by its numeric ID.    |

---

## 📂 Project Structure

```text
.
├── backend/
│   ├── server.js          # Express API server and in-memory store
│   └── package.json       # Backend dependencies (express, cors, nodemon)
│
└── frontend/
    ├── public/
    │   └── index.html     # HTML entry point
    ├── src/
    │   ├── App.js         # Main React component (API logic & UI markup)
    │   ├── App.css        # Custom CSS styling & design tokens
    │   └── index.js       # React entry point
    └── package.json       # Frontend dependencies (react, react-scripts)
```

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
