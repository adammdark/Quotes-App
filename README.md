# 📝 Quotes App

A full-stack web application built with the **MERN stack** that lets users manage their favorite quotes — add new ones, update existing ones, and delete them with ease.

---

## 🚀 Features

- ✅ View all quotes
- ➕ Add a new quote
- ✏️ Update an existing quote
- 🗑️ Delete a quote

---

## 🛠️ Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Frontend | React.js            |
| Backend  | Node.js + Express.js|
| Database | MongoDB + Mongoose  |
| Runtime  | Node.js             |

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/quotes-app.git
cd quotes-app
```

---

### 2. Set Up Environment Variables

Create a `.env` file in the `server/` directory (or root, depending on your setup):

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

### 3. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

---

### 4. Run the App

**Start the backend server:**
```bash
cd server
npm run server
```

**Start the React frontend:**
```bash
cd client
npm run dev
```

The app will be running at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 📡 API Endpoints

| Method | Endpoint          | Description         |
|--------|-------------------|---------------------|
| GET    | `/api/quotes`     | Get all quotes      |
| POST   | `/api/quotes`     | Add a new quote     |
| PUT    | `/api/quotes/:id` | Update a quote      |
| DELETE | `/api/quotes/:id` | Delete a quote      |

---

## 📷 Deployments



---

<p align="center">Made with ❤️ and a lot of creative prompts</p>
<p align="center">⭐ Star this repo if you find it useful!</p>
