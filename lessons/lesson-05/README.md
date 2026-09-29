# Lesson 05: REST APIs & The HTTP Language (GET, POST, PUT, DELETE)

## ⏱️ Class Agenda (90 Minutes)
* **00:00 - 00:25:** The 4 Verbs: GET (Read), POST (Create), PUT (Update), DELETE (Remove).
* **00:25 - 00:45:** Anatomy of an HTTP Request: Headers, Body (payload), Params (`/items/:id`).
* **00:45 - 01:15:** Testing Endpoints with Postman or VS Code Thunder Client.
* **01:15 - 01:30:** Live Exercise: Building an in-memory CRUD API for a bookstore or task list.

---

## 💡 What We Teach & Why (The Concept)
A REST API is just an **orderly menu of URLs and HTTP verbs**. 
Students must understand that the URL `/api/products` can do completely different things depending on the verb:
* `GET /api/products` ➔ "Please send me the list of products."
* `POST /api/products` ➔ "Here is a new product in the request body; please save it."
* `PUT /api/products/123` ➔ "Here is updated data for product 123."
* `DELETE /api/products/123` ➔ "Please remove product 123."

They also learn status code intuition:
* **2xx:** Success (200 OK, 201 Created)
* **4xx:** Client Mistake (400 Bad Data, 401 Not Logged In, 404 Doesn't Exist)
* **5xx:** Server Crash (500 Internal Server Error)

---

## 🏛️ Mermaid Diagram: REST API Action Mapping
```mermaid
flowchart TD
    Client[Client / Postman Request]
    
    subgraph ExpressRouter ["Express Router (/api/tasks)"]
        direction TB
        G[GET /api/tasks] -->|Fetch all| C1[res.status(200).json(tasks)]
        P[POST /api/tasks] -->|Create new| C2[res.status(201).json(newTask)]
        U[PUT /api/tasks/:id] -->|Update| C3[res.status(200).json(updated)]
        D[DELETE /api/tasks/:id] -->|Delete| C4[res.status(200).json({ message: 'Deleted' })]
    end

    Client --> ExpressRouter
```

---

## 📁 Where Things Live: Today's Focus
```
backend/
├── routes/
│   └── taskRoutes.js       <-- Declares router.get(), router.post(), etc.
├── server.js               <-- Mounts routes: app.use('/api/tasks', taskRoutes)
└── package.json
```

---

## 🤖 AI Prompt Recipe for Today
Students practice prompting for complete REST routes:
```markdown
I am building an Express REST API. 
Please create a route file at `server/routes/itemRoutes.js` using an in-memory JavaScript array for data.

Requirements:
- Endpoints:
  1. `GET /api/items` - Return all items (200 OK)
  2. `POST /api/items` - Validate that `req.body.title` exists; if missing return 400 Bad Request; otherwise add to array and return 201 Created.
  3. `DELETE /api/items/:id` - Remove item by ID; return 404 if not found, or 200 with success message.
- Show me how to mount this route file inside `server/server.js`.
```

---

---

## 📖 Glossary of Critical Terminologies (The Beginner Dictionary)

| Term | Plain-English Definition & Real-World Analogy |
| :--- | :--- |
| **API (Application Programming Interface)** | A defined digital contract of rules and endpoints that allows two separate software systems (like a React browser and an Express server) to talk to each other. |
| **REST (Representational State Transfer)** | The industry-standard architectural style for building web APIs using standard URLs and HTTP methods. |
| **Endpoint** | A specific URL path on a server that performs a specific action (e.g. `http://localhost:5000/api/products`). |
| **HTTP Verbs (Methods)** | The 4 primary action words of the web: GET (read), POST (create new), PUT (update existing), and DELETE (remove). |
| **HTTP Status Codes** | Standardized 3-digit numbers telling the client what happened: 2xx (Success), 3xx (Redirect), 4xx (Client mistake/missing data), 5xx (Server crashed). |
| **Request Body (Payload)** | The JSON data package sent inside a POST or PUT request from the client to the server. |
| **URL Parameter (`:id`)** | A dynamic placeholder in a route path (`/api/items/:id`) used to target a specific record, accessed via `req.params.id`. |
| **Query String (`?search=term`)** | Key-value pairs appended to the end of a URL after a `?` used for sorting, filtering, or searching, accessed via `req.query`. |

---

## 🎯 The Non-Negotiable Key Takeaways
At the end of this class, every single student **MUST** be able to answer:
1. **What is the difference between GET and POST?**
   - *Answer:* GET asks for data without altering the server. POST sends new data in `req.body` to create a record.
2. **What does status code 201 mean vs 400?**
   - *Answer:* 201 means "Created successfully". 400 means "Bad request" (the client forgot a required field or sent invalid data).
3. **What is a route parameter (`:id`)?**
   - *Answer:* A placeholder in the URL path (`req.params.id`) used to target a specific record.
