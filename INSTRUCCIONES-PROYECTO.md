# Instrucciones para el Desarrollo del Proyecto Integrador M4

## 📋 Contexto del Proyecto

**Nombre:** Gestor Estratégico de Tareas  
**Cliente:** MateCode (startup de desarrollo web)  
**Objetivo:** Aplicación web SPA para gestionar tareas diarias de empleados de forma organizada, persistente y accesible desde cualquier dispositivo

---

## 🛠️ Stack Tecnológico

- **Frontend:** React + TypeScript
- **Backend:** Firebase (Authentication + Firestore)
- **Notificaciones:** AWS SES (correo electrónico)
- **Hosting:** Vercel
- **Testing:** Vitest + React Testing Library

---

## 🎯 Objetivos de Aprendizaje

1. Utilizar herramientas de IA como apoyo al desarrollo (documentar prompts y decisiones)
2. Construir interfaces modulares con JSX, componentes reutilizables y props
3. Aplicar TypeScript para estructuras de datos claras
4. Diseñar interfaces responsive con enfoque mobile-first
5. Integrar formularios, autenticación y operaciones CRUD con Firebase/Firestore
6. Aplicar buenas prácticas: testing, Git y despliegue en producción

---

## 📦 Alcance Funcional Mínimo

### Autenticación
- ✅ Registro con email/password y/o Google
- ✅ Login y logout
- ✅ Protección de rutas privadas
- ✅ Manejo claro de errores de autenticación

### Gestión de Tareas (usuario autenticado)
- ✅ Crear tarea (título + descripción)
- ✅ Listar tareas del usuario
- ✅ Editar tarea
- ✅ Eliminar tarea
- ✅ Marcar como completada
- ✅ Persistencia en Firestore
- ✅ Cada usuario solo ve sus propias tareas

### Persistencia y Sincronización
- ✅ Datos almacenados en Cloud Firestore
- ✅ Filtrado por userId
- ✅ Manejo de estados de carga y errores
- ✅ Actualización automática de UI tras operaciones CRUD

### Email
- ✅ Botón para enviar email con resumen de tareas
- ✅ Usar AWS SES para envío
- ✅ No exponer secretos en frontend

### Testing
- ✅ Tests unitarios de funciones clave
- ✅ Tests de componentes principales (TodoForm, TodoList)
- ✅ Mock de servicios externos

### Deploy
- ✅ Deploy en Vercel
- ✅ URL pública funcional
- ✅ Variables de entorno configuradas correctamente

### Seguridad
- ✅ Crear .env para desarrollo y .env.example sin datos
- ✅ Credenciales de AWS en variables de entorno
- ✅ Credenciales de Firebase en variables de entorno
- ✅ Agregar .env en .gitignore
- ✅ Commits sin variables de entorno

---

## 🚀 Los 9 Hitos del Proyecto (Secuencia Obligatoria)

### Hito 1: Setup Inicial
**Responsabilidad:** Estructura base, dependencias y entorno seguro

**Qué hacer:**
1. Crear estructura de carpetas según la arquitectura por capas
2. Instalar dependencias (React, TypeScript, Firebase, testing, etc.)
3. Configurar archivos de seguridad (.env, .gitignore, .env.example)
4. Inicializar proyecto Git
5. Crear configuración base de TypeScript

**Verificación:**
- ✅ Proyecto corre localmente sin errores
- ✅ Archivo .env existe localmente
- ✅ .env.example existe en repositorio sin valores reales
- ✅ .env está en .gitignore y no aparece en commits
- ✅ Estructura de carpetas refleja separación clara de responsabilidades

**Estructura de carpetas a crear:**
```
src/
├── pages/           # Vistas (Login, Register, Tasks)
├── components/      # Componentes UI (TodoForm, TodoList, etc.)
├── features/        # Lógica por dominio (auth, tasks)
├── services/        # Integraciones (Firebase, API calls)
├── routes/          # Router + rutas privadas (ProtectedRoute)
├── hooks/           # Custom hooks (useAuth, useTasks)
├── types/           # Interfaces y tipos compartidos
└── utils/           # Helpers (validaciones, formateo, etc.)
functions/          # Vercel Functions (envío de emails)
tests/              # Unit tests + tests de componentes
.env                # Local (NO se sube)
.env.example        # Plantilla sin secretos
.gitignore          # Excluir .env
README.md           # Documentación
```

---

### Hito 2: Configuración de Firebase
**Responsabilidad:** Conexión a Authentication y Firestore

**Qué hacer:**
1. Crear proyecto en Firebase Console
2. Configurar Authentication (email/password + Google)
3. Configurar Firestore Database
4. Obtener credenciales de Firebase
5. Guardar credenciales en .env
6. Crear archivo de configuración en `src/services/firebase.ts`
7. Separar inicialización de Auth y Firestore

**Verificación:**
- ✅ Aplicación se conecta a Firebase sin errores
- ✅ Credenciales en variables de entorno, no en código
- ✅ Se puede distinguir inicialización de Auth y Firestore

---

### Hito 3: Autenticación
**Responsabilidad:** Registro, login, logout y sesión persistente

**Qué hacer:**
1. Implementar registro de usuario (email/password)
2. Implementar login con persistencia de sesión
3. Implementar logout
4. Crear contexto o hook para gestionar estado de autenticación
5. Usar `onAuthStateChanged` para persistencia entre recargas
6. Traducir códigos de error de Firebase a mensajes útiles
7. Validar formularios antes de enviar

**Verificación:**
- ✅ Usuario puede registrarse, iniciar sesión y cerrar sesión
- ✅ Sesión persiste al recargar página
- ✅ Errores muestran mensajes comprensibles, no códigos internos
- ✅ Formularios validan datos antes de enviar

---

### Hito 4: Rutas Protegidas
**Responsabilidad:** Acceso controlado según estado de autenticación

**Qué hacer:**
1. Crear componente `ProtectedRoute` que valida autenticación
2. Manejo del estado "cargando" para evitar redirecciones prematuras
3. Configurar rutas públicas (Login, Register) y privadas (Tasks)
4. Implementar redirección a login si intenta acceder sin autenticación
5. Redireccionar a tasks si intenta acceder a login estando autenticado

**Verificación:**
- ✅ Rutas protegidas inaccesibles sin sesión
- ✅ Usuario no autenticado redirigido correctamente
- ✅ No hay parpadeos ni redirecciones inesperadas
- ✅ Cerrar sesión desde ruta protegida redirige a login

---

### Hito 5: Modelo de Datos y Seguridad
**Responsabilidad:** Tipos TypeScript y reglas de Firestore

**Qué hacer:**
1. Definir interfaz TypeScript para la tarea (id, title, description, completed, createdAt, userId, etc.)
2. Crear reglas de seguridad en Firestore que:
   - Solo usuarios autenticados pueden acceder a datos
   - Cada usuario solo ve sus propias tareas
   - Solo el propietario puede editar/eliminar sus tareas
3. Estructurar base de datos: `users/{userId}/tasks/{taskId}`
4. Especificar tipos de campos en Firestore

**Verificación:**
- ✅ Interface de tarea en TypeScript tiene todos los campos con tipos correctos
- ✅ Reglas de Firestore impiden acceso a datos de otro usuario
- ✅ Probado explícitamente que usuario A no puede ver tareas de usuario B

---

### Hito 6: CRUD de Tareas
**Responsabilidad:** Operaciones completas con sincronización en tiempo real

**Qué hacer:**
1. Implementar función para crear tarea
2. Implementar función para listar tareas del usuario (con `onSnapshot`)
3. Implementar función para editar tarea
4. Implementar función para eliminar tarea
5. Implementar función para marcar como completada
6. Crear custom hook `useTasks` que encapsule lógica
7. Manejar states: loading, error, success
8. Limpiar suscripciones en useEffect para evitar memory leaks

**Verificación:**
- ✅ Se pueden crear, editar, eliminar y marcar tareas
- ✅ Interfaz actualiza sin recargar página
- ✅ Solo se muestran tareas del usuario autenticado
- ✅ Estados de carga y error visibles
- ✅ Suscripciones se cancelan correctamente

---

### Hito 7: Email con AWS SES
**Responsabilidad:** Envío seguro desde función serverless

**Qué hacer:**
1. Configurar AWS SES (obtener credenciales, verificar email)
2. Crear Vercel Function en `api/sendEmail.ts` que:
   - Reciba solicitud del frontend
   - Construya resumen de tareas del usuario
   - Envíe email con AWS SES
   - Maneje errores
3. Desde frontend, crear botón que llama a la función serverless
4. Guardar credenciales de AWS en variables de entorno de Vercel
5. Manejar estados de carga y error en UI

**Verificación:**
- ✅ Función serverless envía email correctamente
- ✅ Credenciales de AWS NO visibles en código frontend
- ✅ Frontend llama a Vercel Function, no a AWS directamente
- ✅ Manejan estados de carga, éxito y error en UI

---

### Hito 8: Testing
**Responsabilidad:** Pruebas unitarias y de componentes

**Qué hacer:**
1. Configurar Vitest y React Testing Library
2. Crear tests unitarios para funciones clave
3. Crear tests de componentes principales:
   - TodoForm (renderiza correctamente, valida inputs, envía datos)
   - TodoList (lista tareas, permite edición, permite eliminación)
4. Mockear servicios de Firebase
5. Tests de estados: loading, error, éxito
6. Prueba al menos un caso de error o borde

**Verificación:**
- ✅ Tests corren sin errores con `npm run test`
- ✅ Componentes principales tienen tests
- ✅ Firebase está mockeado, no hace llamadas reales
- ✅ Hay al menos un test de caso de error o borde

---

### Hito 9: Deploy en Vercel
**Responsabilidad:** Aplicación en producción completamente funcional

**Qué hacer:**
1. Conectar repositorio GitHub con Vercel
2. Configurar variables de entorno en Vercel:
   - Frontend: VITE_FIREBASE_* (con prefijo VITE_)
   - Serverless: AWS_* (sin prefijo)
3. Hacer deploy
4. Verificar funcionamiento completo en producción
5. Probar flujo completo: registro → login → crear tarea → editar → completar → enviar email → logout

**Verificación:**
- ✅ Aplicación accesible desde URL pública
- ✅ Autenticación, CRUD y email funcionan en producción
- ✅ Sin errores en consola del navegador
- ✅ Variables de entorno en Vercel, no en código
- ✅ Usable en dispositivos móviles

---

## 🎨 Buenas Prácticas a Aplicar

### Arquitectura y Código
- Separar lógica de negocio de componentes UI
- Usar TypeScript consistentemente (evitar `any`)
- Mantener funciones pequeñas con una responsabilidad clara
- Limpiar suscripciones en useEffect para evitar memory leaks

### Frontend
- Diseño mobile-first
- Usar Flexbox o Grid para layout
- Estilos simples y consistentes

### Manejo de API
- Usar async/await
- Manejar errores de red
- Mostrar estados de carga

### Git
- Commits pequeños y descriptivos (ver GUIA-COMMITS.md)
- No subir .env
- Mantener repositorio público

---

## ⚠️ Errores Comunes a Evitar

1. **Seguridad:** Exponer credenciales de Firebase o AWS en el frontend
2. **Memory Leaks:** No limpiar suscripciones de Firestore en useEffect
3. **Estado de Carga:** No manejar estado "cargando" en ProtectedRoute (causa redirecciones prematuras)
4. **Variables de Entorno en Vercel:** Olvidar prefijo VITE_ para variables frontend
5. **Reglas de Firestore:** Dejar base de datos abierta sin protección
6. **Testing:** No mockear Firebase en tests
7. **Commits:** Incluir .env en repositorio
8. **Deploy:** No probar flujo completo en producción antes de considerar terminado

---

## 📝 Documentación de IA

Debes documentar en el README:
- Qué prompts utilizaste en cada etapa
- Cómo influyeron en tu implementación
- Qué decisiones tomaste a partir de las respuestas generadas
- En qué situaciones fue más efectiva la IA
- Patrones y buenas prácticas descubiertos

---

## 📦 Entregable Final

Debe incluir:

### 📁 Desarrollo
- Código organizado por capas
- Commits semánticos y descriptivos
- Aplicación desplegada en Vercel con:
  - Autenticación funcional
  - CRUD completo persistente
  - Envío real de email
  - AWS SES invocado desde Vercel Functions

### 📁 Documentación
- README con:
  - Descripción del proyecto
  - Decisiones arquitectónicas
  - Instrucciones de instalación
  - Variables de entorno necesarias
  - URL de producción
  - Flujo de envío de emails
  - Explicación de cómo integraste IA en el proceso

### 📦 Entregable
- Enlace con repositorio de GitHub público

---

## 🌟 Extra Credit (Opcional)

1. Agregar filtros: mostrar tareas completadas, pendientes o todas
2. Implementar drag & drop para reordenar tareas (usar dnd-kit)
3. Agregar fechas de vencimiento y ordenar por prioridad

Estos extras no son obligatorios pero demuestran iniciativa y profundidad técnica.

---

## ✅ Verificación Final

Antes de considerar el proyecto terminado:

1. **Autenticación:** Registro, login, logout funcionan
2. **CRUD:** Crear, leer, editar, eliminar tareas funciona
3. **Persistencia:** Los datos permanecen al recargar
4. **Seguridad:** Credenciales no expuestas, Firestore protegido
5. **Email:** Resumen de tareas se envía correctamente
6. **Testing:** Todos los tests pasan
7. **Deploy:** Funciona en Vercel con URL pública
8. **Documentación:** README completo con instrucciones
9. **Git:** Commits descriptivos, .env no incluido
10. **Mobile:** Interfaz responsive en dispositivos móviles

---

**Nota Final:** Cada hito habilita el siguiente. Las decisiones tomadas en el Hito 1 impactarán todos los hitos siguientes. Vale leer la consigna completa antes de escribir la primera línea de código.
