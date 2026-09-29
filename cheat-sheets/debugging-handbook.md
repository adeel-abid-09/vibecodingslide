# 🔍 The MERN Debugging Handbook: How to Never Stay Stuck

When code breaks, beginners panic and randomly change lines.  
Engineers use the **4-Layer Detective Framework**.

---

## 🧭 The 4-Layer Detective Framework

```
Layer 1: IDE Squiggly Lines      ──► Did you misspell a variable or forget an import?
Layer 2: Terminal (Backend)      ──► Did Node/Express crash or fail to connect to Mongo?
Layer 3: Browser Console (UI)    ──► Did React crash on undefined props or bad hooks?
Layer 4: Network Tab (Wire)      ──► Did the HTTP request travel? What status code came back?
```

---

## 🚨 Common Status Codes & What They Mean

| Code | Label | Plain English Meaning | Common Cause & Fix |
| :--- | :--- | :--- | :--- |
| **200** | OK | Everything worked! | Data received successfully. |
| **201** | Created | Record successfully saved in DB | New user or item created. |
| **400** | Bad Request | You sent malformed data | Missing required fields in `req.body`. |
| **401** | Unauthorized | "Who are you?" | Missing or invalid JWT token in headers. |
| **403** | Forbidden | "You can't touch this" | Token valid, but user is not admin/owner. |
| **404** | Not Found | Route or ID doesn't exist | Misspelled URL or item deleted from DB. |
| **500** | Server Error | Backend crashed! | Uncaught error in controller; check Terminal logs! |

---

## 🌐 The #1 Beginner Nightmare: CORS Error

### What it looks like in Browser Console:
> `Access to XMLHttpRequest at 'http://localhost:5000/api/items' from origin 'http://localhost:5173' has been blocked by CORS policy`

### Why it happens:
Your browser has a built-in security shield. It refuses to let a website running on port 5173 (React) talk to port 5000 (Express) unless Express explicitly gives permission.

### The 2-minute fix:
1. In `server/`: run `npm install cors`
2. In `server/server.js`:
```javascript
const cors = require('cors');

// Allow requests from React frontend
app.use(cors({
  origin: 'http://localhost:5173', // or simply app.use(cors()) for development
  credentials: true
}));
```

---

## 💥 The #2 Beginner Nightmare: `Cannot read properties of undefined (reading 'map')`

### What it looks like:
Your React screen goes completely blank or white.

### Why it happens:
You tried to do `products.map(...)` before the server finished sending the data, so `products` was initially `undefined`.

### The fix (Safe navigation or default state):
```jsx
// Solution A: Default to empty array in useState
const [products, setProducts] = useState([]);

// Solution B: Optional chaining
{products?.map(product => (
  <Card key={product._id} item={product} />
))}

// Solution C: Guard clause
{isLoading ? <Spinner /> : products.map(...)}
```

---

## 📋 The 30-Second Debug Checklist

1. **Is the backend server running?** Look at terminal: does it say `Server listening on port 5000` and `MongoDB Connected`?
2. **Is the frontend server running?** Look at terminal: is Vite active on `http://localhost:5173`?
3. **Open DevTools (`F12` or `Cmd + Option + I`):**
   - Click **Console**: Any red messages?
   - Click **Network**: Filter by **Fetch/XHR**. Did the request happen? Did it return red (404/500)?
4. **Copy the exact error log** and feed it into AI using the prompt from `cheat-sheets/ai-prompting-guide.md`!
