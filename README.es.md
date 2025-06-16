# 📱 Lista de Contactos - React + Context API

Este es un proyecto desarrollado como parte del bootcamp de **4Geeks Academy**. Se trata de una aplicación de lista de contactos construida con **React**, utilizando la **Context API** y **useReducer** para el manejo del estado global.

---

## 🧑‍🏫 Desarrollado por

**Adrián MRC**  
Proyecto del curso intensivo de desarrollo **Full Stack** en 4Geeks Academy.

---

## 🛠️ Tecnologías utilizadas

- [React](https://reactjs.org/) (última versión)
- [Vite](https://vitejs.dev/) (empaquetado y servidor de desarrollo)
- [Context API](https://reactjs.org/docs/context.html) (estado global)
- [React Router](https://reactrouter.com/) (navegación entre vistas)
- [Vercel](https://vercel.com/) (despliegue gratuito y rápido)

---

## 🚀 Cómo ejecutar el proyecto localmente

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/4GeeksAcademy/Lista_Contactos_React_Context_AdrianMRC.git
   cd Lista_Contactos_React_Context_AdrianMRC
   ```

2. **Asegúrate de tener instalada Node.js v20 o superior.**

3. **Instala las dependencias:**

   ```bash
   npm install
   ```

4. **Crea el archivo de entorno (si aplica):**

   ```bash
   cp .env.example .env
   ```

5. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

   Esto iniciará Vite en `http://localhost:3000` con recarga automática.

---

## 🗂️ Estructura del proyecto

```
src/
├── components/          # Componentes reutilizables
├── hooks/               # Hooks personalizados
├── pages/               # Vistas principales
├── services/            # Servicios y funciones API
│   └── apiCommunicator.jsx
├── store/               # Estado global con Context API
│   ├── agendaStore.js
│   └── contactStore.js
├── index.css            # Estilos globales
├── main.jsx             # Punto de entrada
└── routes.jsx           # Definición de rutas con React Router
```

---

## 🌐 Despliegue en Vercel

1. Instala Vercel globalmente si no lo tienes:

   ```bash
   npm i -g vercel
   vercel login
   ```

2. Despliega en producción:

   ```bash
   vercel --prod
   ```

¡Listo! Tu aplicación estará disponible públicamente en minutos.

---

## 🧠 Recursos útiles

- [Documentación de React](https://es.reactjs.org/)
- [Guía de Context API](https://reactjs.org/docs/context.html)
- [Hook useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)
- [Guía de Vercel](https://vercel.com/docs)

---

## ❤️ Inspiración y soporte

Este proyecto fue desarrollado siguiendo la guía de proyectos de 4Geeks Academy.)

---

## 📝 Licencia

Este proyecto está bajo la **licencia MIT**. Puedes usarlo, modificarlo y compartirlo libremente.
