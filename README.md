#  Expense Tracker (Full Stack Application)

A full-stack Expense Tracker application built using **Spring Boot, React (Vite), and PostgreSQL**.
It allows users to add, view, filter, and manage daily expenses with a clean and responsive UI.

---

## Live Demo

*  Frontend (Vercel): Not Live
*  Backend (Render): Not Live

---

##  Tech Stack

###  Frontend

* React (Vite)
* JavaScript (ES6+)
* CSS (custom styling)
* Fetch API

###  Backend

* Spring Boot
* Spring Data JPA
* Hibernate
* REST APIs

###  Database

* PostgreSQL (Supabase)

###  Deployment

* Frontend: Vercel
* Backend: Render
* Database: Supabase


## ✨ Features

* ➕ Add new expenses
* 📋 View all expenses
* 🔍 Filter by category
* 🔃 Sort by date (ascending / descending)
* 💰 Total expense calculation
* 🔁 Idempotent API (prevents duplicate submissions)
* ⚡ Fast frontend with Vite
* 🌐 RESTful backend architecture

---

##  Project Structure

```
expense-tracker/
├── frontend/          # React (Vite) app
│   ├── src/
│   └── package.json
│
├── backend/           # Spring Boot app
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
│
└── README.md
```

---

##  Backend Setup (Spring Boot)

### 1. Navigate to backend

```
cd backend
```

### 2. Configure environment variables

Create `application-local.yml` (not committed):

```yaml
spring:
  datasource:
    url: jdbc:postgresql://<your-db-host>:5432/postgres
    username: postgres
    password: YOUR_PASSWORD

  jpa:
    hibernate:
      ddl-auto: update
```

### 3. Run the backend

```
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

---

## Frontend Setup (React + Vite)

### 1. Navigate to frontend

```
cd frontend
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env`

```
VITE_API_URL=http://localhost:8080
```

### 4. Run the app

```
npm run dev
```

---

##  API Endpoints

| Method | Endpoint                   | Description        |
| ------ | -------------------------- | ------------------ |
| POST   | `/expenses`                | Create expense     |
| GET    | `/expenses`                | Get all expenses   |
| GET    | `/expenses?category=Food`  | Filter by category |
| GET    | `/expenses?sort=date_desc` | Sort expenses      |
| GET    | `/expenses/categories`     | Get all categories |

---

##  Security & Best Practices

* Environment variables used for sensitive data
* Credentials not stored in repository
* Idempotency key implemented for safe API retries
* Clean separation of concerns (Controller → Service → Repository)

---

##  Key Learnings

* Building REST APIs with Spring Boot
* Handling idempotency in APIs
* Integrating React frontend with backend
* Managing environment variables securely
* Deploying full-stack apps (Vercel + Render + Supabase)

---

##  Future Improvements

*  Edit & delete expenses
*  Dashboard with charts (category-wise spending)
*  User authentication (JWT)
*  Mobile responsive UI improvements
*  Pagination & performance optimizations

---

##  Contributing

Feel free to fork the repo and submit a PR.

---

##  License

This project is open-source and available under the MIT License.

---

##  Author

**Anurag Prasad**

---

 If you found this useful, consider giving it a star on GitHub!
