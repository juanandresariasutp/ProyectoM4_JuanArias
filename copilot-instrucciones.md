# 🧠 Proyecto Integrador M4 - Instrucciones para Copilot

## 🎯 Contexto

Estoy desarrollando una aplicación SPA de gestión de tareas con el siguiente stack:

* React + TypeScript
* Firebase (Auth + Firestore)
* AWS SES (email)
* Vercel (deploy + serverless functions)
* Testing con Vitest + React Testing Library

## 🎯 Objetivo

Construir una aplicación que permita:

* Registro, login y logout
* Rutas protegidas
* CRUD completo de tareas
* Persistencia por usuario en Firestore
* Envío de resumen de tareas por email (AWS SES)
* Testing de componentes y lógica
* Deploy en Vercel

---

## 🧱 Estructura del proyecto

Usar esta estructura obligatoriamente:

```
src/
 ├─ pages/
 ├─ components/
 ├─ features/
 ├─ services/
 ├─ routes/
 ├─ hooks/
 ├─ types/
 └─ utils/

functions/ (serverless para email)
tests/
```

---

## ⚠️ Reglas importantes

* NO usar `any` en TypeScript
* Separar lógica de UI (usar hooks/services)
* NO poner credenciales en el frontend
* Usar variables de entorno
* Código limpio, modular y escalable
* Usar async/await
* Manejar estados: loading, error, success

---

## 🧩 Fases de desarrollo

### 1. Setup inicial

* Crear proyecto con Vite + React + TS
* Configurar estructura de carpetas
* Configurar .env y .env.example

---

### 2. Firebase

* Configurar Auth
* Configurar Firestore
* Crear archivo de inicialización

---

### 3. Autenticación

* Registro con email/password
* Login
* Logout
* Persistencia con onAuthStateChanged
* Manejo de errores amigables

---

### 4. Rutas protegidas

* Crear ProtectedRoute
* Redirigir usuarios no autenticados

---

### 5. Modelo de datos

Definir tipo Task:

* id
* title
* description
* completed
* userId
* createdAt

---

### 6. CRUD de tareas

* Crear tarea
* Listar tareas (solo del usuario)
* Editar
* Eliminar
* Marcar como completada
* Usar onSnapshot (tiempo real)

---

### 7. Email con AWS SES

* Crear función serverless en /functions
* El frontend llama a la función
* NO exponer credenciales

---

### 8. Testing

* Tests unitarios
* Tests de componentes
* Mock de Firebase

---

### 9. Deploy

* Deploy en Vercel
* Configurar variables de entorno
* Verificar funcionamiento completo

---

## 🧠 Cómo responder

Cuando te pida algo:

* Explica brevemente qué haces
* Luego genera código limpio y tipado
* Divide en archivos si es necesario
* Usa buenas prácticas

---

## 🚀 Estilo de código

* Funciones pequeñas
* Tipado fuerte
* Componentes reutilizables
* Hooks personalizados para lógica
* Servicios para Firebase

---

## ❗ IMPORTANTE

No generar todo el proyecto de una vez.
Ir paso a paso según lo que solicite.
