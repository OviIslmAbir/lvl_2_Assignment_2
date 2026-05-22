# Assignment 2

A collaborative issue tracking API where software teams can report bugs, suggest features, and manage issue workflows.

## 🚀 Features

- User Registration & Login
- JWT Authentication
- Role-Based Authorization (Contributor & Maintainer)
- Create Issue
- Get All Issues
- Get Single Issue
- Update Issue
- Delete Issue
- Filter & Sort Issues
- Password Hashing with bcrypt
- PostgreSQL with Raw SQL Queries

## 🛠️ Technology Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- pg
- bcrypt
- jsonwebtoken

## 📌 API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/signup` |
| POST | `/api/auth/login` |

### Issues

| Method | Endpoint |
|---------|----------|
| POST | `/api/issues` |
| GET | `/api/issues` |
| GET | `/api/issues/:id` |
| PATCH | `/api/issues/:id` |
| DELETE | `/api/issues/:id` |

## 👥 Roles

### Contributor
- Create Issues
- View Issues
- Update Own Open Issues

### Maintainer
- All Contributor Permissions
- Update Any Issue
- Delete Any Issue
- Change Issue Status

## 🔒 Security

- JWT Authentication
- Password Hashing with bcrypt
- Protected Routes
- Role-Based Access Control

## 👨‍💻 Author

**Abir Ovi**
