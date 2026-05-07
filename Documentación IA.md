# Documentación de uso de IA en el proyecto GestorTareas

Este documento registra cómo se utilizó IA (GitHub Copilot y asistentes LLM) durante el desarrollo del proyecto GestorTareas — una SPA para gestionar tareas. Incluye los prompts principales, decisiones tomadas con ayuda de IA y buenas prácticas observadas.

## 1) Prompt: Estructura inicial del proyecto
Contexto: inicio del proyecto GestorTareas con requisitos de SPA, autenticación y serverless para emails.
Objetivo: crear la base del repositorio (carpetas, configuración Vite, setup de testing y template de funciones serverless).
Instrucciones principales: separar `src`, `functions`/`api`, `tests`, añadir `.env.example`, configurar `vitest` y `vercel.json`.
Resultado aplicado: repositorio inicial con scaffolding, scripts y templates para desarrollo local y deploy.

## 2) Prompt: Páginas públicas y rutas
Contexto: necesitábamos páginas públicas mínimas (`Login`, `Register`, `About`) y una página protegida `/tasks`.
Objetivo: crear las páginas, rutas y layout (Navbar + Footer) con navegación clara.
Instrucciones principales: implementar `Router.tsx`, `ProtectedRoute`, y páginas básicas; establecer `Login` como ruta raíz.
Resultado aplicado: estructura de rutas y componentes públicos/protegidos lista para integrarse con Auth.

## 3) Prompt: Diseño minimalista, mobile-first y tema oscuro
Contexto: requerimiento del usuario para UI sutil, minimalista y en tonos oscuros.
Objetivo: aplicar diseño mobile-first, centrar formularios y mantener consistencia visual en Login/Register/Tasks.
Instrucciones principales: paleta oscura, `box-sizing: border-box`, espaciado responsivo, botones prominentes y accesibilidad básica.
Resultado aplicado: estilos para `Navbar`, `LoginPage`, `RegisterPage`, `TasksPage` y `Footer`.

## 4) Prompt: Autenticación y redirecciones
Contexto: al iniciar sesión debía redirigirse a `/tasks`, y el root debía mostrar `Login`.
Objetivo: implementar flujo de login/registro con redirecciones correctas y protección de rutas.
Instrucciones principales: usar `useAuthContext`, observar `user` en `useEffect` y `navigate('/tasks')` cuando corresponda; agregar mensaje de éxito en registro antes de redirigir al login.
Resultado aplicado: `LoginPage` y `RegisterPage` redirigen correctamente; `RegisterForm` muestra confirmación de registro durante 3s antes de ir a login.

## 5) Prompt: Implementación del CRUD de tareas
Contexto: necesidad central del proyecto: crear, listar, editar, marcar y eliminar tareas.
Objetivo: diseñar componentes `TodoForm`, `TodoList`, `TodoItem` y hooks `useTasks` integrados con Firestore.
Instrucciones principales: mobile-first diseño de lista → en desktop tabla, en móvil cards; acciones accesibles (Editar, Borrar, Toggle estado) con badges y confirmaciones.
Resultado aplicado: UI de `Tasks` rediseñada, tests actualizados, y UX consistente para dispositivos móviles.

## 6) Prompt: Integración de servicios (Firebase / AWS SES)
Contexto: enviar resúmenes por email y almacenar tareas por usuario.
Objetivo: crear servicios reutilizables y una Vercel Function para enviar emails con AWS SES.
Instrucciones principales: encapsular llamadas a Firebase en `authService` y `tasksService`; implementar `functions/sendEmail.ts` que valide payload y use AWS SDK.
Resultado aplicado: envío de resumen funcionando en desarrollo/producción (requiere variables en Vercel).

## 7) Prompt: Tests y estabilidad
Contexto: los cambios de UI modificaron selectores de tests.
Objetivo: mantener suite de tests robusta y accesible para cambios visuales.
Instrucciones principales: usar selectores por roles/labels y actualizar tests que dependían de textos específicos; ejecutar `vitest --run` como validación.
Resultado aplicado: suite ajustada y 29 tests pasando localmente.

## 8) Prompt: Documentación, commits y despliegue
Contexto: entrega final requiere documentación y trazabilidad.
Objetivo: generar README, documentación de uso y commits semánticos en español.
Instrucciones principales: estructurar README con secciones técnicas y de UI; mantener commits separados por tipo (`feat`, `chore`, `docs`).
Resultado aplicado: `README.md` actualizado, historial organizado y despliegue en Vercel activado.

## Buenas prácticas observadas con IA
- La IA se usó como asistente de implementación y documentación — no se confió sin verificación manual.
- Siempre se verificaron los cambios con ejecución local, pruebas unitarias y revisión visual.
- Los secretos (credenciales) se mantuvieron fuera del repositorio: `.env` local y variables en Vercel.
- Los prompts se depositaron en documentación y se versionaron indirectamente mediante commits.

## Riesgos y consideraciones
- Revisar siempre los cambios que proponga la IA antes de aceptarlos.
- Evitar exponer claves en el frontend; usar funciones serverless para accesos a servicios (SES, APIs privadas).
- Mantener tests que usen selectores robustos (roles/aria) para prevenir rotura por cambios visuales.

## Conclusión
La IA aceleró tareas repetitivas (scaffolding, snippets, sugerencias de tests y CSS) y ayudó a iterar rápidamente en diseño y flujos. Todas las sugerencias relevantes fueron revisadas y probadas localmente; los cambios finales fueron commitados y desplegados.

Este documento fue actualizado para el proyecto GestorTareas el 7 de mayo de 2026.
