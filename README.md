# Product-Management-App

A full-stack product management system built with the **MEAN stack** (MongoDB, Express.js, Angular, Node.js).  
The application provides complete CRUD workflows for products, secure authentication and authorization, and a responsive, user-friendly interface.

---

## 🚀 Features

- **Product CRUD:** Add, view, update, and delete products  
- **User Authentication (JWT):** Secure login, protected APIs, and Angular route guards  
- **Role-Based Access Control (RBAC):** Admin and standard user permissions  
- **Responsive Interface:** Works smoothly on desktop and mobile  
- **Form Validation:** Client-side and server-side validation  
- **Error Handling:** Global backend error middleware + friendly frontend messages  
- **Modular Architecture:** Clear separation of components, services, routes, and controllers  

---

## 🧩 Tech Stack

### Frontend
- Angular (latest)
- TypeScript
- Angular Router, Services, Interceptors
- HTML, CSS

### Backend
- Node.js
- Express.js
- RESTful APIs
- JWT authentication
- bcrypt password hashing

### Database
- MongoDB + Mongoose  
- User & Product schemas  
- Indexes for efficient querying  

### Tools
- Angular CLI  
- npm  
- Git & GitHub  
- Environment-based configuration  

---

## 🛠️ Architecture Overview

    Frontend (Angular)
      └── Components (UI)
      └── Services (API & Auth)
      └── Guards (Route Protection)

    Backend (Node + Express)
      └── Routes
      └── Controllers
      └── Middleware (Auth, Error Handling)
      └── Models (Mongoose)

    Database (MongoDB)
      └── Collections for Users & Products

---

## 🔒 Security

- JWT authentication with secure token storage  
- Role-based authorization  
- Password hashing (bcrypt)  
- CORS protection  
- Request validation and sanitization  
