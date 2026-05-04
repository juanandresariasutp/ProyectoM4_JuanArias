# 📝 Guía de Commits - Proyecto Integrador M4

## 🎯 Principios Generales

1. **Commits atómicos:** Cada commit debe ser una unidad lógica completa
2. **Commits pequeños:** Facilita la revisión y el rollback si es necesario
3. **Mensajes descriptivos:** Explica QUÉ se hizo y POR QUÉ, no CÓMO
4. **En español:** Todos los mensajes de commit en español
5. **Formato Semántico:** Usar prefijos que indiquen el tipo de cambio
6. **Frecuencia:** Hacer commits después de completar cada funcionalidad pequeña

---

## 📋 Formato de Commit Semántico

```
<tipo>(<scope>): <descripción>

<cuerpo opcional>
```

### Tipos de Commit

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **feat** | Nueva funcionalidad | `feat(auth): agregar login con Google` |
| **fix** | Corrección de bug | `fix(tasks): corregir sincronización en tiempo real` |
| **docs** | Cambios en documentación | `docs: agregar instrucciones de instalación` |
| **style** | Cambios de formato/estilo (no lógica) | `style: aplicar Prettier a componentes` |
| **refactor** | Refactorización sin cambiar funcionalidad | `refactor(tasks): extraer lógica a custom hook` |
| **test** | Agregar o modificar tests | `test(todForm): agregar tests de validación` |
| **chore** | Cambios en configuración/dependencias | `chore: actualizar Firebase SDK` |
| **ci** | Cambios en CI/CD | `ci: configurar GitHub Actions` |
| **perf** | Mejoras de rendimiento | `perf(tasks): optimizar queries a Firestore` |

---

## 🏷️ Scope (Alcance)

Especifica la parte del proyecto afectada:

```
feat(auth): ...        # Funcionalidades de autenticación
feat(tasks): ...       # Funcionalidades de tareas
feat(email): ...       # Funcionalidades de email
feat(ui): ...          # Cambios en componentes UI
feat(types): ...       # Cambios en tipos TypeScript
feat(security): ...    # Cambios de seguridad/permisos
feat(config): ...      # Configuración general
```

---

## ✍️ Ejemplos de Commits Correctos

### Hito 1: Setup Inicial
```
feat(config): crear estructura base del proyecto
feat(config): configurar TypeScript y dependencias
feat(config): crear variables de entorno
chore(config): actualizar .gitignore con .env
docs: agregar README inicial
```

### Hito 2: Firebase
```
feat(config): configurar Firebase SDK
feat(auth): inicializar Firebase Authentication
feat(database): crear conexión a Firestore
```

### Hito 3: Autenticación
```
feat(auth): crear formulario de registro
feat(auth): implementar registro con email/password
feat(auth): crear hook useAuth para manejo de sesión
feat(auth): implementar persistencia de sesión
feat(auth): agregar logout
fix(auth): traducir errores de Firebase a mensajes claros
```

### Hito 4: Rutas Protegidas
```
feat(routes): crear componente ProtectedRoute
feat(routes): proteger ruta de tareas
feat(routes): implementar redirección de unauthenticados
fix(routes): manejar estado de carga en ProtectedRoute
```

### Hito 5: Modelo de Datos
```
feat(types): crear interfaz Task con TypeScript
feat(security): agregar reglas de seguridad a Firestore
test(security): verificar que usuarios no acceden a datos ajenos
```

### Hito 6: CRUD de Tareas
```
feat(tasks): crear función para agregar tarea
feat(tasks): crear función para listar tareas del usuario
feat(tasks): crear función para editar tarea
feat(tasks): crear función para eliminar tarea
feat(tasks): crear función para marcar como completada
feat(tasks): crear custom hook useTasks
feat(ui): crear componente TodoForm
feat(ui): crear componente TodoList
feat(ui): agregar manejo de estados de carga y error
```

### Hito 7: Email con AWS SES
```
feat(email): configurar AWS SES
feat(email): crear Vercel Function para envío de email
feat(email): agregar botón de resumen en UI
feat(email): implementar validación de email
fix(email): manejar errores de envío
```

### Hito 8: Testing
```
test(auth): agregar tests de registro
test(auth): agregar tests de login
test(tasks): agregar tests unitarios de funciones CRUD
test(components): agregar tests de TodoForm
test(components): agregar tests de TodoList
test(services): agregar mocks de Firebase
```

### Hito 9: Deploy
```
feat(deployment): configurar variables de entorno en Vercel
ci: conectar repositorio con Vercel
docs: agregar instrucciones de deploy en README
```

---

## 📏 Estructura Detallada del Commit

### Ejemplo Completo con Cuerpo

```
feat(tasks): agregar función para marcar tarea como completada

- Crea nueva función updateTaskStatus en tasksService
- Recibe taskId y nuevo estado de completitud
- Actualiza Firestore con el nuevo estado
- Maneja errores de conexión a la base de datos
- Valida que el usuario sea propietario de la tarea

Resuelve: #123
Relacionado con: #124
```

### Partes del Commit

1. **Línea de asunto:** Máximo 50 caracteres
2. **Línea vacía:** Separador (obligatorio si hay cuerpo)
3. **Cuerpo:** 
   - Explicar QUÉ cambió y POR QUÉ (no CÓMO)
   - Usar bullets para cambios múltiples
   - Máximo 72 caracteres por línea
   - Referencia a issues si aplica

---

## ✅ Checklist Antes de Hacer Commit

Antes de hacer push de un commit, verificar:

- [ ] El código compila sin errores
- [ ] Los tests pasan (si existen)
- [ ] El mensaje describe claramente qué se hizo
- [ ] El commit es atómico (una idea, un cambio)
- [ ] El .env NO está incluido
- [ ] No hay console.log de debug
- [ ] El código sigue la estructura del proyecto
- [ ] Si es refactoring, funcionalidad no cambió

---

## 🚫 Commits a EVITAR

### ❌ Mal: Commits genéricos sin sentido
```
commit: cambios
fix: bug
feat: trabajo
update: código
```

### ❌ Mal: Commits muy grandes
```
feat: refactorizar proyecto completo, agregar tests, actualizar dependencias
```

### ❌ Mal: Commits que incluyen secretos
```
feat(config): agregar credenciales de Firebase
```

### ❌ Mal: Mensajes sin contexto
```
arreglé
cambié algo
update
```

---

## ✅ Commits CORRECTOS

### ✅ Bien: Específico y descriptivo
```
feat(auth): agregar validación de email en formulario de registro

- Implementa validación con regex en el frontend
- Muestra error si email no tiene formato válido
- Previene envío de formulario si email es inválido
- Mejora UX evitando rechazos del servidor
```

### ✅ Bien: Commits atómicos
```
feat(tasks): crear interfaz Task en TypeScript
feat(tasks): implementar función createTask en Firestore
feat(ui): crear componente TaskForm
test(tasks): agregar tests para createTask
```

### ✅ Bien: Commits pequeños y frecuentes
Un commit por funcionalidad pequeña completada, no esperar a terminar todo.

---

## 🔄 Workflow de Commits Típico

### Después de cada cambio lógico pequeño:

```bash
# 1. Ver qué cambió
git status
git diff

# 2. Agregar cambios
git add <archivos>

# 3. Hacer commit con mensaje descriptivo
git commit -m "feat(scope): descripción clara"

# 4. Repetir para siguiente funcionalidad
```

---

## 🔗 Referencias en Commits

Para vincular con issues o PRs:

```
feat(auth): agregar Google Sign-In

Resuelve: #42
Relacionado con: #41, #43
```

Palabras clave:
- `Resuelve:` - Cierra issue al hacer merge
- `Relacionado con:` - Vincula sin cerrar
- `Duplica:` - Marca como duplicado

---

## 📊 Patrón de Commit por Hito

### Hito 1: Setup (5-8 commits)
```
feat(config): crear estructura base
feat(config): instalar y configurar dependencias
feat(config): crear archivos de entorno
docs: agregar README inicial
```

### Hito 2: Firebase (3-4 commits)
```
feat(config): integrar Firebase SDK
feat(auth): conectar Firebase Authentication
feat(database): conectar Firestore
```

### Hito 3: Auth (6-8 commits)
```
feat(auth): crear componente RegisterForm
feat(auth): implementar registro
feat(auth): crear componente LoginForm
feat(auth): implementar login persistente
feat(auth): crear hook useAuth
docs(auth): agregar instrucciones de autenticación
```

### Hitos 4-9: Más granularidad según complejidad

---

## 🎓 Buenas Prácticas de Commit

1. **Commit frecuentemente:** Cada 30-60 minutos, después de cada pequeña funcionalidad
2. **Mensajes presentes:** "agregar" no "agregado", "crear" no "creado"
3. **Sé específico:** "agregar validación de email" vs "arreglé el form"
4. **Prueba antes:** Asegúrate de que funciona antes de commit
5. **Revisa qué vas a comitear:** `git diff` antes de `git add`
6. **Un tema por commit:** No mezcles refactoring con nuevas features
7. **Referencias claras:** Si es un fix, explica qué estaba roto

---

## 🚨 IMPORTANTE: Procedimiento Antes de Commit

**SIEMPRE preguntar al usuario antes de hacer commit** (según preferencias registradas)

Flujo:
1. Completar funcionalidad
2. Probar que funciona
3. Crear mensaje de commit
4. **PREGUNTAR al usuario:** "¿Hago commit con este mensaje?"
5. Esperar confirmación del usuario
6. Hacer commit solo si el usuario lo autoriza

---

## 📚 Comando Git Útiles

```bash
# Ver cambios sin staging
git diff

# Ver cambios staged
git diff --staged

# Ver commits recientes
git log --oneline -10

# Ver cambios de un commit específico
git show <commit-hash>

# Amend último commit (si no está pusheado)
git commit --amend

# Cambiar mensaje del último commit
git commit --amend -m "nuevo mensaje"

# Ver estadísticas de commits
git log --stat
```

---

**Recuerda:** Los commits son tu historial de desarrollo. Un buen historial de commits facilita:
- Entender qué se hizo y cuándo
- Revertir cambios si es necesario
- Code review más efectivo
- Documentación clara del proyecto

✨ **Commits bien escritos = Proyecto profesional** ✨
