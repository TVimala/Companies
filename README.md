# 📌 Company API Development

## 📖 Overview

This project is about developing a RESTful API for managing company data using **Node.js**, **Express**, and **MongoDB**, with an optional **React** frontend for displaying and managing companies.  
The backend provides CRUD operations, filtering, search, and pagination features.  
The frontend offers a simple user interface to interact with the API.

---
## 🎬 Demo Video

[Watch the demo](https://drive.google.com/file/d/1FdLiAKOSv19n9IYeXuv-QiECROdvKb1f/view?usp=sharing)

---
## 🛠 Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (Native Driver)
- **Frontend:** React.js
- **Validation:** express-validator
- **Styling:** CSS 

---

## 🚀 Features

### 🔹 Backend (API)
- Create a company (`POST /api/companies`)
- Get all companies with filters, search, pagination, sorting (`GET /api/companies`)
- Get a single company (`GET /api/companies/:id`)
- Update a company (`PUT /api/companies/:id`)
- Delete a company (`DELETE /api/companies/:id`)
- MongoDB text index for searching across name, description, and tags

### 🔹 Frontend (React)
- View all companies in a styled table
- Add a new company via a form
- Delete a company with one click
- Search/filter companies by name or industry

---

## 📂 Project Structure

```
backend/
│── routes/
│   └── companyRoutes.js      # Routes for API endpoints
│── controllers/
│   └── companyController.js  # Controller logic
│── utils/
│   └── db.js                 # MongoDB connection
│── index.js                  # App entry point

frontend/
│── src/
│   ├── App.jsx               # Main React component
│   ├── App.css               # Styling
│   └── index.js              # React entry point
```

---

## ⚙️ Setup Instructions

### 🔹 Backend

1. **Clone the repository:**
    ```bash
    git clone <your-repo-link>
    cd backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env` file:**
    ```
    PORT=5000
    MONGO_URI=your-mongodb-connection-string
    DB_NAME=companyDB
    ```

4. **Start the server:**
    ```bash
    npm start
    ```
    
---

### 🔹 Frontend

1. **Go to frontend folder:**
    ```bash
    cd frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the frontend:**
    ```bash
    npm start
    ```
---

## 📊 API Endpoints

| Method | Endpoint                | Description           |
|--------|------------------------ |----------------------|
| GET    | `/api/companies`        | Get all companies    |
| GET    | `/api/companies/:id`    | Get single company   |
| POST   | `/api/companies`        | Create a company     |
| PUT    | `/api/companies/:id`    | Update company details|
| DELETE | `/api/companies/:id`    | Delete a company     |

---

## 🎨 Frontend Preview

- Simple user-friendly interface 
- Features: Search, Add, View, Delete Companies

---

## ✅ Conclusion

This project demonstrates how to build a complete MERN-style application with a well-structured backend and a connected React frontend.  
It showcases how APIs can be used to manage real-world data (like companies) with CRUD operations, search, filtering, and user-friendly UI.
