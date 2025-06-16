# 📱 Contact List - React + Context API

This is a project developed as part of the **4Geeks Academy** bootcamp. It's a contact list application built with **React**, using the **Context API** and **useReducer** for global state management.

---

## 🧑‍🏫 Developed by

**Adrián MRC**  
Project created during the **Full Stack Development** course at 4Geeks Academy.

---

## 🛠️ Technologies Used

- [React](https://reactjs.org/) (latest version)
- [Vite](https://vitejs.dev/) (for bundling and dev server)
- [Context API](https://reactjs.org/docs/context.html) (for global state)
- [React Router](https://reactrouter.com/) (page navigation)
- [Vercel](https://vercel.com/) (for fast and free deployment)

---

## 🚀 How to Run the Project Locally

1. **Clone this repository:**

   ```bash
   git clone https://github.com/4GeeksAcademy/Lista_Contactos_React_Context_AdrianMRC.git
   cd Lista_Contactos_React_Context_AdrianMRC
   ```

2. **Make sure you have Node.js v20 or higher installed.**

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Create the environment file (if needed):**

   ```bash
   cp .env.example .env
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   This will launch Vite on `http://localhost:3000` with live reload enabled.

---

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/               # Custom hooks
├── pages/               # Main views/pages
├── services/            # API and helper services
│   └── apiCommunicator.jsx
├── store/               # Global state via Context API
│   ├── agendaStore.js
│   └── contactStore.js
├── index.css            # Global styles
├── main.jsx             # App entry point
└── routes.jsx           # Routing definitions with React Router
```

---

## 🌐 Deployment with Vercel

1. Install Vercel CLI and login:

   ```bash
   npm i -g vercel
   vercel login
   ```

2. Deploy the app:

   ```bash
   vercel --prod
   ```

Your app will be live on the web within a few minutes.

---

## 🧠 Useful Resources

- [React Documentation](https://reactjs.org/)
- [Context API Guide](https://reactjs.org/docs/context.html)
- [useReducer Hook](https://reactjs.org/docs/hooks-reference.html#usereducer)
- [Vercel Docs](https://vercel.com/docs)

---

## ❤️ Inspiration & Support

This project was built using the learning materials and structure provided by 4Geeks Academy.

---

## 📝 License

This project is licensed under the **MIT License**. Feel free to use, modify, and share it.
