# BlogEditor

BlogEditor is a full-stack web application for creating, editing, auto-saving, and managing blog posts. It features a modern React + TypeScript frontend with a rich text editor and a Node.js/Express/MongoDB backend.

## Features

- Create, edit, and delete blog posts
- Auto-save drafts while editing
- Publish posts
- Tagging support
- Dashboard for managing drafts and published posts
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** React, TypeScript, Vite, TipTap Editor, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Other:** Axios, React Router, React Hot Toast

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB database

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with your MongoDB URI:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```
   The backend runs on [http://localhost:5000](http://localhost:5000) by default.

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file if you want to override the API URL (optional):
   ```
   VITE_API_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```sh
   npm run dev
   ```
   The frontend runs on [http://localhost:5173](http://localhost:5173) by default.

## Folder Structure

```
backend/
  models/
  routes/
  server.js
  package.json
frontend/
  src/
    components/
    context/
    pages/
    App.tsx
    main.tsx
  index.html
  package.json
```
