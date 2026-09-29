# 🤖 AI Prompting Guide for MERN Stack Developers

The difference between a frustrating AI experience and an incredible one is **context and specificity**. 

Never say: *"Make me an e-commerce website."*  
Instead, prompt as a **System Architect**.

---

## 🏗️ 1. Prompting for Database Schemas (Mongoose)

### Bad Prompt:
> *"Create a schema for blog posts."*

### Architect Prompt:
```markdown
I am building a MERN stack application. 
Please create a Mongoose model file located at `server/models/Post.js`.

Requirements:
- Schema fields:
  - title (String, required, trimmed, max 120 chars)
  - slug (String, required, unique, lowercase)
  - content (String, required)
  - author (ObjectId referencing the 'User' model, required)
  - tags (Array of strings, default empty)
  - coverImage (String, optional URL)
  - isPublished (Boolean, default false)
- Enable timestamps (createdAt, updatedAt).
- Export the Post model.
Provide only the code for `server/models/Post.js`.
```

---

## ⚡ 2. Prompting for Express Routes & Controllers

### Bad Prompt:
> *"Write routes for my posts."*

### Architect Prompt:
```markdown
I am building an Express REST API with Mongoose. 
I have a Post model in `server/models/Post.js`.

Please create two files:
1. `server/controllers/postController.js`:
   - `getPosts`: Fetch all published posts, sorted by newest first, populate author name.
   - `getPostBySlug`: Fetch single post by slug parameter.
   - `createPost`: Create a post. Use `req.user.id` as the author (from auth middleware).
   - `deletePost`: Delete post only if `req.user.id === post.author`.
   - Wrap all database calls with proper try/catch and return appropriate HTTP status codes (200, 201, 400, 403, 404, 500).

2. `server/routes/postRoutes.js`:
   - Setup Express router.
   - Attach controllers to RESTful paths (`/`, `/:slug`, etc.).
   - Protect `createPost` and `deletePost` using an imported `protect` middleware from `../middleware/authMiddleware.js`.
```

---

## 🎨 3. Prompting for Modern React Components

### Bad Prompt:
> *"Make me a card for products."*

### Architect Prompt:
```markdown
I am working on a React (Vite) frontend with Tailwind CSS / Vanilla CSS.
Create a component at `client/src/components/ProductCard.jsx`.

Requirements:
- Props received:
  - `product`: object containing `{ _id, title, price, image, rating, inStock }`
  - `onAddToCart`: callback function
- Design & UX:
  - Sleek modern dark-themed card with rounded corners, subtle border, and soft hover lift animation.
  - Image with object-cover and aspect-ratio 4/3.
  - Formatted currency price (e.g. $49.99).
  - Out-of-stock badge if `inStock === false` and disable the button.
  - "Add to Cart" button with an active click micro-animation.
- Keep the component modular and clean.
```

---

## 🔄 4. Prompting for Full-Stack Integration (Axios + React)

### Bad Prompt:
> *"How do I connect React to my backend?"*

### Architect Prompt:
```markdown
I have an Express backend running on `http://localhost:5000/api/posts`.
I want to create a page component at `client/src/pages/FeedPage.jsx` in React.

Requirements:
- Use `axios` to fetch data from `http://localhost:5000/api/posts` inside a `useEffect` hook.
- Implement 3 distinct states:
  1. `isLoading`: Show a clean skeleton loader or spinner while fetching.
  2. `error`: Show an error banner with a "Try Again" button if fetch fails.
  3. `posts`: Render a responsive grid of `<PostCard post={post} key={post._id} />`.
- Show an empty state message if no posts are returned.
```

---

## 🐞 5. The Golden Prompt for Debugging Errors

When you hit an error, **do not guess**. Copy this prompt format:

```markdown
I encountered an error in my MERN stack app.

1. The exact error message from the [Terminal / Browser Console / Network Tab]:
```
[PASTE EXACT ERROR MESSAGE HERE]
```

2. What I was trying to do:
[Explain: e.g., "I clicked the Submit button on the login form to authenticate."]

3. Here is the relevant file content:
[File path: e.g., `server/controllers/authController.js`]
```javascript
[PASTE CODE HERE]
```

Please:
1. Explain what caused this error in simple plain English.
2. Tell me exactly which file and line number needs to be changed.
3. Provide the corrected code.
```
