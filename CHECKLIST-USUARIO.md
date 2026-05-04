# 📋 Checklist del Usuario - Qué Pedir en Cada Etapa

## 🎯 Introducción

Este archivo te ayuda a saber **QUÉ PEDIR** a Copilot en cada fase del desarrollo del Proyecto Integrador M4. Sigue los hitos en orden y usa este checklist como guía.

**Nota:** Siempre se preguntará antes de hacer commits. Los mensajes de commit serán en español.

---

## 🏗️ HITO 1: Setup Inicial

### Fase 1A: Estructura y Configuración Base
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Crea la estructura de carpetas del proyecto según la arquitectura por capas"
  - Se crearán: pages/, components/, features/, services/, routes/, hooks/, types/, utils/
  
- [ ] Pedir: "Configura el proyecto React + TypeScript + Vite"
  - Se instalará: dependencias principales, tsconfig, vite.config
  
- [ ] Pedir: "Crea los archivos .env, .env.example y actualiza .gitignore"
  - Incluir: .env (local), .env.example (plantilla), .gitignore con .env

- [ ] Pedir: "Instala y configura las librerías necesarias"
  - Firebase, React Router, Tailwind/CSS, Vitest, React Testing Library, etc.

### Fase 1B: Inicializar Git
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Inicializa el repositorio Git e haz el primer commit"
  - Mensaje: `feat(config): crear estructura base del proyecto`

- [ ] Pedir: "Sube el proyecto a GitHub"
  - Crear repo público, conectar remoto

---

## 🔥 HITO 2: Configuración de Firebase

### Fase 2A: Setup de Firebase
**Estado:** 🟡 No iniciado

- [ ] Crear proyecto en Firebase Console manualmente

- [ ] Pedir: "Configura la conexión a Firebase en el proyecto"
  - Crear: src/services/firebase.ts
  - Incluir: inicialización de Auth y Firestore por separado

- [ ] Pedir: "Configura las variables de entorno de Firebase"
  - Variables: VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, etc.
  - Llenar .env local, .env.example con nombres

- [ ] Pedir: "Prueba la conexión a Firebase"
  - Verificar: consola sin errores, Firebase conecta correctamente

### Fase 2B: Commit
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Haz un commit con la configuración de Firebase"
  - Mensaje: `feat(config): configurar Firebase y variables de entorno`

---

## 🔐 HITO 3: Autenticación

### Fase 3A: Componentes y Servicios de Auth
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Crea el servicio de autenticación en Firebase"
  - Crear: src/services/authService.ts
  - Incluir: registro, login, logout, observador de sesión

- [ ] Pedir: "Crea el hook useAuth para gestionar autenticación"
  - Crear: src/hooks/useAuth.ts
  - Incluir: estado usuario, funciones de auth, loading, error

- [ ] Pedir: "Crea el contexto de autenticación"
  - Crear: src/features/auth/AuthContext.tsx
  - Incluir: proveedor que inyecta useAuth en toda la app

- [ ] Pedir: "Crea el componente RegisterForm"
  - Crear: src/components/RegisterForm.tsx
  - Incluir: validación, manejo de errores, mensajes claros

- [ ] Pedir: "Crea el componente LoginForm"
  - Crear: src/components/LoginForm.tsx
  - Incluir: login con email/password, opción Google Sign-In

- [ ] Pedir: "Crea las páginas Login y Register"
  - Crear: src/pages/LoginPage.tsx, src/pages/RegisterPage.tsx

### Fase 3B: Prueba y Commits
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Prueba el registro y login en la aplicación"
  - Verificar: usuario se registra, inicia sesión, sesión persiste

- [ ] Pedir: "Haz commits de las funcionalidades de autenticación"
  - Mensaje 1: `feat(auth): crear servicio de autenticación`
  - Mensaje 2: `feat(auth): crear hook useAuth`
  - Mensaje 3: `feat(auth): crear componentes de registro y login`

---

## 🛡️ HITO 4: Rutas Protegidas

### Fase 4A: Componente ProtectedRoute
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Crea el componente ProtectedRoute"
  - Crear: src/routes/ProtectedRoute.tsx
  - Incluir: validación de autenticación, redirección, manejo de loading

- [ ] Pedir: "Configura el router con React Router"
  - Crear: src/routes/Router.tsx
  - Incluir: rutas públicas (Login, Register), privadas (Tasks)

- [ ] Pedir: "Crea la página de Tasks (vacía de momento)"
  - Crear: src/pages/TasksPage.tsx
  - Por ahora: solo estructura, sin funcionalidades CRUD

- [ ] Pedir: "Prueba las rutas protegidas"
  - Verificar: no se puede acceder a Tasks sin login
  - Verificar: se redirige automáticamente

### Fase 4B: Commit
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Haz un commit con las rutas protegidas"
  - Mensaje: `feat(routes): crear rutas protegidas y ProtectedRoute`

---

## 📊 HITO 5: Modelo de Datos y Seguridad

### Fase 5A: Tipos TypeScript
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Crea la interfaz Task en TypeScript"
  - Crear: src/types/Task.ts
  - Incluir: id, title, description, completed, createdAt, userId, updatedAt

- [ ] Pedir: "Define otros tipos necesarios"
  - Usuario, errores comunes, etc.

### Fase 5B: Firestore Rules
**Estado:** 🟡 No iniciado

- [ ] Configurar Firestore Rules manualmente en Firebase Console:
  ```
  match /users/{userId}/tasks/{taskId} {
    allow read, write: if request.auth.uid == userId;
  }
  ```

- [ ] Pedir: "Verifica que las reglas de Firestore están correctas"
  - Prueba: usuario A no puede leer tareas de usuario B

### Fase 5C: Commit
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Haz un commit con tipos y seguridad"
  - Mensaje: `feat(types): crear interfaz Task y configurar seguridad Firestore`

---

## ✅ HITO 6: CRUD de Tareas

### Fase 6A: Servicio de Tareas
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Crea el servicio de tareas (tasksService)"
  - Crear: src/services/tasksService.ts
  - Incluir: createTask, getTasks, updateTask, deleteTask, markComplete

- [ ] Pedir: "Crea el hook useTasks"
  - Crear: src/hooks/useTasks.ts
  - Incluir: encapsular lógica CRUD, manejar subscripciones con onSnapshot

### Fase 6B: Componentes CRUD
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Crea el componente TodoForm para crear/editar tareas"
  - Crear: src/components/TodoForm.tsx
  - Incluir: campos title y description, validación, envío

- [ ] Pedir: "Crea el componente TodoList para listar tareas"
  - Crear: src/components/TodoList.tsx
  - Incluir: mostrar tareas, botones editar/eliminar/completar

- [ ] Pedir: "Crea el componente TodoItem para una tarea individual"
  - Crear: src/components/TodoItem.tsx
  - Incluir: mostrar datos, botones de acciones

- [ ] Pedir: "Integra CRUD en TasksPage"
  - Implementar: usar useTasks, mostrar TodoForm y TodoList

### Fase 6C: Manejo de Estados
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Agrega manejo de estados de carga y error"
  - En componentes: mostrar loading, errores, mensajes de éxito

### Fase 6D: Prueba y Commits
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Prueba el CRUD completo en la aplicación"
  - Crear tarea, editar, eliminar, marcar completada
  - Verificar sincronización en tiempo real

- [ ] Pedir: "Haz commits del CRUD"
  - Mensaje 1: `feat(tasks): crear servicio de tareas`
  - Mensaje 2: `feat(tasks): crear hook useTasks`
  - Mensaje 3: `feat(ui): crear componentes TodoForm, TodoList, TodoItem`

---

## 📧 HITO 7: Email con AWS SES

### Fase 7A: Configuración de AWS
**Estado:** 🟡 No iniciado

- [ ] Crear cuenta AWS y configurar SES manualmente
  - Verificar email, pasar verificación de sandbox si es necesario

- [ ] Pedir: "Crea la Vercel Function para enviar email"
  - Crear: functions/api/sendEmail.ts
  - Incluir: conexión a AWS SES, envío de email con resumen

- [ ] Pedir: "Configura las variables de entorno de AWS"
  - Variables: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SES_REGION

### Fase 7B: Servicio Frontend
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Crea el servicio para llamar la función serverless"
  - Crear: src/services/emailService.ts
  - Incluir: llamar a /api/sendEmail con datos del usuario

- [ ] Pedir: "Crea el componente SendEmailButton"
  - Crear: src/components/SendEmailButton.tsx
  - Incluir: botón, manejo de estados, mensajes de éxito/error

- [ ] Pedir: "Integra el botón en TasksPage"
  - Mostrar botón de enviar resumen

### Fase 7C: Prueba y Commits
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Prueba el envío de email"
  - Verificar: email llega correctamente, contiene resumen de tareas

- [ ] Pedir: "Haz commits de email"
  - Mensaje 1: `feat(email): crear Vercel Function para AWS SES`
  - Mensaje 2: `feat(email): crear servicio y componente de email`

---

## 🧪 HITO 8: Testing

### Fase 8A: Tests Unitarios
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Crea tests unitarios de authService"
  - Crear: tests/services/authService.test.ts
  - Incluir: tests de registro, login, logout

- [ ] Pedir: "Crea tests unitarios de tasksService"
  - Crear: tests/services/tasksService.test.ts
  - Incluir: tests de CRUD con mocks de Firestore

### Fase 8B: Tests de Componentes
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Crea tests del componente TodoForm"
  - Crear: tests/components/TodoForm.test.tsx
  - Incluir: renderiza, valida, envía datos

- [ ] Pedir: "Crea tests del componente TodoList"
  - Crear: tests/components/TodoList.test.tsx
  - Incluir: lista tareas, botones funcionan

- [ ] Pedir: "Crea tests de LoginForm y RegisterForm"
  - Crear: tests/components/forms.test.tsx

### Fase 8C: Mocks y Setup
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Crea mocks de Firebase para tests"
  - Crear: tests/mocks/firebase.mock.ts
  - Incluir: mocks de Auth, Firestore

### Fase 8D: Ejecución y Commits
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Verifica que todos los tests pasan"
  - Ejecutar: npm run test

- [ ] Pedir: "Haz commit de tests"
  - Mensaje: `test: agregar tests unitarios y de componentes`

---

## 🚀 HITO 9: Deploy en Vercel

### Fase 9A: Preparación para Deploy
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Revisa el código antes de deploy"
  - Buscar: console.logs, datos sensibles, credenciales

- [ ] Pedir: "Prepara variables de entorno para Vercel"
  - Frontend: VITE_FIREBASE_*
  - Serverless: AWS_*

### Fase 9B: Deploy
**Estado:** 🟡 No iniciado

- [ ] Conectar GitHub con Vercel manualmente

- [ ] Pedir: "Configura las variables de entorno en Vercel"
  - Agregar: todas las variables necesarias

- [ ] Hacer deploy en Vercel

### Fase 9C: Verificación en Producción
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Prueba el flujo completo en producción"
  - Registro → Login → Crear tarea → Editar → Completar → Email → Logout

- [ ] Pedir: "Verifica que no hay errores en producción"
  - Revisar consola del navegador, logs de Vercel

### Fase 9D: Documentación Final
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Actualiza el README con instrucciones finales"
  - Incluir: descripción, instalación, variables, deploy, flujo email

- [ ] Pedir: "Agrega documentación sobre uso de IA"
  - Explicar: prompts utilizados, decisiones tomadas, situaciones efectivas

### Fase 9E: Commit Final
**Estado:** 🟡 No iniciado

- [ ] Pedir: "Haz commit final con deploy y documentación"
  - Mensaje: `feat(deploy): desplegar en Vercel y completar documentación`

---

## 📦 EXTRAS (Opcional)

Si quieres mejorar tu proyecto con funcionalidades adicionales:

### Extra 1: Filtros de Tareas
**Complejidad:** 🟡 Fácil

- [ ] Pedir: "Agrega filtros para mostrar tareas completadas, pendientes o todas"
  - Crear: componente Filter, lógica de filtrado

### Extra 2: Drag & Drop
**Complejidad:** 🔴 Medio

- [ ] Pedir: "Implementa drag & drop para reordenar tareas con dnd-kit"
  - Instalar: dnd-kit
  - Crear: componentes con soporte drag & drop

### Extra 3: Fechas de Vencimiento
**Complejidad:** 🔴 Medio

- [ ] Pedir: "Agrega fechas de vencimiento y ordenamiento por prioridad"
  - Extender: Task interface con dueDate y priority
  - Crear: componente date picker
  - Agregar: lógica de ordenamiento

---

## 🎓 Documentación y Reflexión Final

Una vez completados todos los hitos:

- [ ] Pedir: "Revisa todo el proyecto y documenta decisiones arquitectónicas"

- [ ] Pedir: "Crea una sección en el README explicando cómo usaste IA"
  - Qué prompts usaste
  - Cómo influyó en tu implementación
  - Qué patrones descubriste

- [ ] Hacer commit final con todas las documentaciones

---

## ✅ Checklist de Finalización

Antes de considerar el proyecto terminado:

- [ ] Todos los hitos completados
- [ ] Código organizado por capas
- [ ] Commits semánticos en español
- [ ] Todos los tests pasan
- [ ] Aplicación desplegada en Vercel
- [ ] README completo con instrucciones
- [ ] .env no está en el repositorio
- [ ] Interfaz funciona en móvil
- [ ] Flujo completo probado en producción
- [ ] Documentación de uso de IA incluida
- [ ] Repositorio público en GitHub

---

## 📞 Resumen: Cómo Trabajar con Copilot

1. **Sigue los hitos en orden** (1 al 9)
2. **Cumple cada fase** dentro de cada hito
3. **Pide explícitamente** qué necesitas (usa los ítems de arriba)
4. **Antes de commit:** Copilot preguntará y esperará tu confirmación
5. **Commits en español:** Todos los mensajes serán en español
6. **Documenta todo:** Especialmente uso de IA
7. **Prueba continuamente:** No esperes al final para probar

---

**¡Listo para empezar! 🚀 Comienza por el HITO 1.**
