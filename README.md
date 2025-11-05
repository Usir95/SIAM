# 🚀 Plantilla Base — Laravel 12 + Inertia.js + Vue 3 + Vuetify 3

Esta plantilla sirve como punto de partida para proyectos modernos utilizando **Laravel 12**, **Inertia.js**, **Vue 3** y **Vuetify 3**.  
Incluye autenticación básica, manejo de roles y una estructura modular lista para escalar en entornos de desarrollo profesional.

---

## 🧱 Tecnologías principales

| Tecnología | Descripción |
|-------------|--------------|
| **Laravel 12** | Framework backend en PHP, robusto y escalable. |
| **Inertia.js** | Conector entre Laravel y Vue sin necesidad de API REST. |
| **Vue 3 (Composition API)** | Framework frontend progresivo y moderno. |
| **Vuetify 3** | Librería de componentes basada en Material Design, con soporte para tema claro/oscuro. |
| **Vite** | Empaquetador rápido y moderno para el desarrollo frontend. |

---

## ⚙️ Características incluidas

- 🔐 **Autenticación lista para usar** (registro, login, logout, recuperación de contraseña).  
- 👥 **Manejo de roles y permisos** mediante políticas y middleware.  
- 🎨 **Layout base con Vuetify** (navbar, sidebar, footer, dark/light mode).  
- ⚡ **Integración completa con Inertia.js** (SPA sin APIs separadas).  
- 🧩 **Arquitectura modular y extensible** para agregar nuevas secciones o módulos.  
- 🧰 **Configuración de Vite optimizada** para Laravel 12.  
- 🧑‍💻 **Estructura limpia y mantenible** lista para equipos y proyectos grandes.  

---

## 📂 Estructura del proyecto

```plaintext
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   └── Requests/
│   └── Models/
│
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   ├── constants/
│   │   ├── interfaces/
│   │   ├── Layouts/
│   │   ├── Pages/
│   │   ├── utils/
│   │   ├── Plugins/
│   │   ├── Composables/
│   │   └── app.js
│   └── views/
│
├── routes/
│   ├── api.php
│   └── web.php
│
├── database/
│   ├── migrations/
│   └── seeders/
│
└── vite.config.js
```

---

## 🧩 Requerimientos

```text
PHP >= 8.3  
Composer >= 2.7  
Node.js >= 18  
NPM o PNPM  
Base de datos (MySQL, PostgreSQL, SQLite, etc.)
```

---

## 🚀 Instalación y configuración

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/antoniotoxquisosa/laravel-project.git
cd laravel-project
```

### 2️⃣ Instalar dependencias de Laravel

```bash
composer install
```

### 3️⃣ Instalar dependencias de Node

```bash
npm install
```

### 4️⃣ Configurar el entorno

```bash
cp .env.example .env
php artisan key:generate
```

> ✏️ **Nota:** Edita el archivo `.env` con tus credenciales de base de datos y configuraciones locales.

### 5️⃣ Ejecutar migraciones y seeders (opcional)

```bash
php artisan migrate --seed
```

### 6️⃣ Iniciar el servidor de desarrollo

```bash
php artisan serve
npm run dev
```

---

## 🧠 Estructura del frontend (Vue + Vuetify)

| Carpeta | Descripción |
|----------|--------------|
| `resources/js/app.js` | Punto de entrada principal (Inertia + Vuetify). |
| `resources/js/Layouts` | Plantillas base para las páginas. |
| `resources/js/Pages` | Páginas renderizadas por Inertia. |
| `resources/js/Components` | Componentes reutilizables. |
| `resources/js/Composables` | Lógica reactiva reutilizable (Composition API). |
| `resources/js/utils` | Funciones auxiliares y helpers. |
| `resources/js/constants` | Constantes globales o configuraciones. |

---

## 🧩 Scripts útiles

| Comando | Descripción |
|----------|--------------|
| `npm run dev` | Inicia el entorno de desarrollo con Vite. |
| `npm run build` | Compila los assets para producción. |
| `php artisan serve` | Inicia el servidor de Laravel. |
| `php artisan migrate` | Ejecuta las migraciones. |
| `php artisan db:seed` | Carga los seeders de prueba. |

---

## 🧰 Personalización

Puedes modificar el **tema global de Vuetify** en:

```bash
resources/js/Plugins/vuetify.js
```

Y definir tus **layouts base personalizados** en:

```bash
resources/js/Layouts/
```

---

## 🧑‍💻 Autor

**Antonio Toxqui Sosa**  
Desarrollador Full Stack

---

## 📄 Licencia

Este proyecto es **propietario** y no está autorizado para redistribución, modificación ni uso comercial sin permiso explícito de su autor.

<!-- Fin del archivo README.md -->
