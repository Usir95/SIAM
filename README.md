# 🚀 Plantilla Base — Laravel 12 + Inertia + Vue 3 + Vuetify

Esta plantilla sirve como punto de partida para proyectos modernos utilizando **Laravel 12**, **Inertia.js**, **Vue 3** y **Vuetify**.  
Incluye autenticación básica, manejo de roles y una estructura lista para escalar fácilmente en entornos de desarrollo profesional.

---

## 🧱 Tecnologías principales

- **Laravel 12** — Framework backend en PHP, robusto y escalable.  
- **Inertia.js** — Conector entre Laravel y Vue sin necesidad de API REST.  
- **Vue 3 (Composition API)** — Framework frontend progresivo y moderno.  
- **Vuetify 3** — Librería de componentes Material Design, con soporte para tema claro/oscuro.  
- **Vite** — Empaquetador rápido y moderno para el desarrollo frontend.

---

## ⚙️ Características incluidas

- 🔐 **Autenticación lista para usar** (registro, login, logout, recuperación de contraseña).  
- 👥 **Manejo de roles y permisos** usando políticas y middleware.  
- 🎨 **Layout base con Vuetify** (navbar, sidebar, footer, sistema de temas).  
- ⚡ **Integración completa con Inertia.js** (SPA sin APIs separadas).  
- 🧩 **Arquitectura modular y extensible** para agregar nuevas secciones o módulos.  
- 🧰 **Configuración de Vite** optimizada para Laravel 12.  
- 🧑‍💻 **Estructura de carpetas limpia** para mantener escalabilidad y mantenibilidad.  

---

## 📂 Estructura del proyecto

├── app/
│ ├── Http/
│ │ ├── Controllers/
│ │ ├── Middleware/
│ │ └── Requests/
│ └── Models/
│
├── resources/
│ ├── js/
│ │ ├── Components/
│ │ ├── constants/
│ │ ├── interfaces/
│ │ ├── Layouts/
│ │ ├── Pages/
│ │ ├── utils/
│ │ ├── Plugins/
│ │ ├── Composables/
│ │ └── app.js
│ └── views/
│
├── routes/
│ ├── api.php
│ ├── web.php
│
├── database/
│ ├── migrations/
│ └── seeders/
│
└── vite.config.js

## 🧩 Requerimientos

- PHP >= 8.3  
- Composer >= 2.7  
- Node.js >= 18  
- NPM o PNPM  
- Base de datos (MySQL, PostgreSQL, SQLite, etc.)  

---

## 🚀 Instalación y configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/antoniotoxquisosa/laravel-project.git
   cd laravel-project