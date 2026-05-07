# 📋 GestorTareas — Aplicación de gestión de tareas

Aplicación web SPA minimalista para crear, organizar y compartir tareas personales o de equipo. Interfaz responsive (mobile-first) y tema oscuro, desarrollada con React + TypeScript, Firebase y AWS SES.

## Contenido

- Stack tecnológico
- Instalación rápida
- Configuración (Firebase, AWS SES)
- Scripts útiles
- Estructura del proyecto
- Funcionalidades de la interfaz (UI)
- Variables de entorno
- Desarrollo y pruebas
- Deploy en Vercel

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Enrutamiento:** React Router 7
- **Backend / BBDD:** Firebase (Authentication + Firestore)
- **Emails:** AWS SES (vía Vercel Function)
- **Testing:** Vitest + React Testing Library
- **Deploy:** Vercel

**Principios de diseño:** mobile-first, accesibilidad básica (roles/aria), UI minimalista en tonos oscuros.

---

## 📦 Instalación rápida

### Requisitos
- Node.js 16+ y npm
- Cuenta de Firebase
- Cuenta de AWS (para SES)

### Pasos

1. Clona el repositorio:
```bash
git clone <https://github.com/juanandresariasutp/ProyectoM4_JuanArias.git>
cd proyecto-integrador
```

2. Instala dependencias:
```bash
npm install
```

3. Copia la plantilla de variables de entorno y rellena con tus credenciales:
```bash
cp .env.example .env
# Edita .env y completa con tus credenciales
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

Abre `http://localhost:5173` (o el puerto que muestre Vite).

---

## 📁 Estructura del Proyecto (resumen)

```
src/
├── pages/              # Páginas (Login, Register, Tasks, About)
├── components/         # Componentes reutilizables (Navbar, Footer, TodoForm, TodoList, TodoItem...)
├── features/           # Lógica por dominio (auth, tasks)
├── services/           # Integraciones (Firebase, API)
├── routes/             # Configuración de rutas
├── hooks/              # Custom hooks (useAuth, useTasks)
├── types/              # Tipos TypeScript
├── App.tsx             # Componente raíz
└── main.tsx            # Punto de entrada
functions/               # Vercel Functions (email)
tests/                   # Tests con Vitest
```

Archivos clave:
- `src/pages/LoginPage.tsx`, `src/pages/RegisterPage.tsx`: flujos de autenticación.
- `src/features/auth/AuthContext.tsx`, `src/hooks/useAuth.ts`: manejo de estado de autenticación y redirecciones.
- `src/pages/TasksPage.tsx`, `src/components/TodoForm.tsx`, `src/components/TodoList.tsx`, `src/components/TodoItem.tsx`: interfaz de tareas (CRUD y listado responsivo).
- `functions/sendEmail.ts`: función serverless para enviar resumen por AWS SES.

---

## ✨ Funcionalidades de la interfaz (UI)

La aplicación ofrece las siguientes funcionalidades directamente desde la interfaz:

### Autenticación
- Registro con email/contraseña y Google OAuth.
- Login con email/contraseña y Google.
- Redirección automática a `/tasks` tras autenticación exitosa.
- Mensajes de error y éxito visibles en UI (ej. confirmación de registro antes de redirigir).

### Gestión de tareas
- Crear tarea: título, descripción, opción de marcar como completada al crear.
- Editar tarea existente.
- Marcar/Desmarcar tarea con un click (badge de estado interactivo).
- Eliminar tarea.
- Listado ordenado en una tabla en desktop y cards apiladas en móvil (mobile-first).
- Fecha de creación visible y formateada.

### Compartir / Envíos
- Botón para enviar un resumen de las tareas por email (usa Vercel Function + AWS SES).

### Navegación y diseño
- Navbar minimalista con enlaces `Iniciar sesión`, `Registrarse` y `Acerca de`.
- No existe página pública "Inicio" ni "Contacto" en el menú (eliminadas por requerimiento).
- Footer con copyright y año dinámico.
- Tema oscuro, contraste y espaciado pensados para lectura y foco en la tarea.

### Accesibilidad y testing
- Controles con `aria-label` y roles cuando aplica (mejora para usuarios de lectores de pantalla).
- Tests unitarios y de componentes con selectors accesibles para asegurar estabilidad.

---

## 🔐 Variables de Entorno

Copiar y configurar en `.env` (no subir):

### Firebase
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### AWS SES
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SES_REGION`
- `AWS_SES_EMAIL`

> **Importante:** `.env` no debe subirse al repositorio (está en `.gitignore`).

---

## 🧑‍💻 Desarrollo y pruebas

Comandos principales:

```bash
npm install       # Instala dependencias
npm run dev       # Levanta servidor de desarrollo (Vite)
npm run build     # Compila para producción
npm run preview   # Preview de build
npm run test      # Ejecuta tests con Vitest
npm run lint      # Ejecuta linters (si están configurados)
```

Tests:
- La suite incluye tests de componentes y servicios con Vitest y React Testing Library.
- Estado local de tests: 29 tests unitarios pasan.

Buenas prácticas:
- Crear ramas para features: `git checkout -b feat/mi-feature`.
- Usar mensajes de commit semánticos (`feat:`, `fix:`, `chore:`...).

---

## 🚀 Deploy en Vercel

1. Conectar repositorio a Vercel.
2. Configurar variables de entorno en el dashboard de Vercel (usar `VITE_` para variables que se exponen al cliente).
3. Cada push a `main` puede disparar deploy automático.

URL de producción (ejemplo): `https://proyecto-m4-juan-arias.vercel.app` (ajusta según tu cuenta y proyecto).

---

## 📝 Hitos del Proyecto

- Hito 1: Setup Inicial
- Hito 2: Configuración de Firebase
- Hito 3: Autenticación
- Hito 4: Rutas Protegidas
- Hito 5: Modelo de Datos y Seguridad
- Hito 6: CRUD de Tareas
- Hito 7: Email con AWS SES
- Hito 8: Testing (tests unitarios y de componentes)
- Hito 9: Deploy en Vercel

---

## 🤖 Uso de IA Durante el Desarrollo <a id="uso-ia"></a>

Se usó GitHub Copilot para acelerar implementación y refactorización.

Registro completo del uso de IA en el proyecto:
- [Documentación IA](Documentación%20IA.md)

La arquitectura final y las validaciones fueron revisadas manualmente.

---


## Autor del proyecto ✍️

Juan Andrés Arias Tascón

🎓 Ingeniero de Sistemas | Desarrollador de Software  
👨‍💻 Desarrollador Web en formación – 2026

⭐ Proyecto creado con fines educativos y de práctica.

Módulo 4 - Proyecto Integrador  
Soy Henry - Bootcamp de Desarrollo Full Stack