# AI-Native MERN Stack Bootcamp: From Zero to Full-Stack Architect
### 18-Class Instructor & Student Master Playbook

Welcome to the **AI-Native MERN Stack Bootcamp**. This curriculum is purpose-built for students with **zero prior programming experience** in the era of AI coding assistants (Cursor, Antigravity, Claude, ChatGPT, Copilot).

---

## 💡 The Core Philosophy: "System Architect" vs "Code Typist"

In traditional coding bootcamps, students spent 60-70% of their time memorizing JavaScript syntax, semicolon placement, and boilerplate loops. In this course, we teach students to operate as **Lead System Architects**:
1. **Understand the System Mental Model:** Know how data flows between Client (React) ↔ Server (Express/Node) ↔ Database (MongoDB).
2. **Master Folder & File Anatomy:** Know *where to place what*. When an AI generates a snippet, students must immediately recognize whether it goes into a route, controller, Mongoose model, React component, or `.env` file.
3. **Master Spec-Driven Prompting:** Don't write generic prompts like *"make me an app"*. Write precise architectural prompts with schemas, HTTP methods, and component hierarchies.
4. **Master the Verification & Debugging Loop:** Read terminal errors, browser console logs, and network status codes, and feed them into AI to diagnose and repair code.

---

## 📁 Repository Structure

```
├── index.html                  # Master Course Dashboard & Portal (Open in any browser)
├── styles/
│   └── common.css              # Shared dark luxury design system & presentation engine
├── cheat-sheets/
│   ├── where-does-it-go.md     # The definitive folder & file placement matrix
│   ├── ai-prompting-guide.md   # Plug-and-play prompt templates for students
│   └── debugging-handbook.md   # Step-by-step error reading & AI troubleshooting
├── lessons/
│   ├── lesson-01/  # The Mental Model of the Web & Modern AI Dev Setup
│   ├── lesson-02/  # Visual Anatomy of a Webpage (HTML, CSS & Blueprinting)
│   ├── lesson-03/  # JavaScript as the Glue (Data Shapes & Mental Tracing)
│   ├── lesson-04/  # Backend Mental Model (Node.js & Express Server)
│   ├── lesson-05/  # REST APIs & The HTTP Language (GET, POST, PUT, DELETE)
│   ├── lesson-06/  # The Database (MongoDB & Mongoose Schemas)
│   ├── lesson-07/  # Complete Backend CRUD (Routes + Controllers + DB)
│   ├── lesson-08/  # Authentication & Security (JWT, Passwords & Secrets)
│   ├── lesson-09/  # React Mental Model & Modular Thinking
│   ├── lesson-10/  # State & User Interactivity (useState & Events)
│   ├── lesson-11/  # Side Effects & Fetching Real Data (useEffect & Axios)
│   ├── lesson-12/  # Multi-Page Navigation (React Router DOM)
│   ├── lesson-13/  # Frontend Authentication & Protected Routes
│   ├── lesson-14/  # The Full-Stack Handshake (Connecting React to Express & CORS)
│   ├── lesson-15/  # Capstone Project Architecture & PRD Prompting
│   ├── lesson-16/  # Live Capstone Building & AI Pairing Workflows
│   ├── lesson-17/  # Modern Debugging Masterclass (Network, Console & Server Logs)
│   └── lesson-18/  # Going Live (Deploying MongoDB Atlas, Render & Vercel)
└── README.md                   # This master guide
```

---

## 🖥️ How to Use the Teaching Decks & Visualizers

Every single lesson in `lessons/lesson-XX/` contains two files:
1. **`README.md`**: Complete teacher lesson plan, minute-by-minute lecture script, concept breakdown, exact file placement instructions, and **The Non-Negotiable Key Takeaways**.
2. **`visualizer.html`**: A plug-and-play, standalone interactive visualizer you can open in any browser. It includes:
   - Live interactive animations and simulators (e.g. data packet flow, state changes, token exchanges).
   - Rendered Mermaid architecture diagrams.
   - Interactive file anatomy trees highlighting where code belongs.
   - Copyable prompt cards students can click to copy directly to their clipboard.

To get started right now, open `index.html` in your browser!
