# 📋 Gestor Estratégico de Tareas

Aplicación web SPA para gestionar tareas diarias desarrollada con React + TypeScript + Firebase + AWS SES.

## 📋 Tabla de Contenidos

- [Stack Tecnológico](#stack-tecnológico)
- [Instrucciones de Instalación](#instrucciones-de-instalación)
- [Configuración del Proyecto](#configuración-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
- [Desarrollo](#desarrollo)
- [Deploy](#deploy)

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Enrutamiento:** React Router 7
- **Backend:** Firebase (Authentication + Firestore)
- **Notificaciones:** AWS SES
- **Testing:** Vitest + React Testing Library
- **Deploy:** Vercel

---

## 📦 Instrucciones de Instalación

### Requisitos Previos
- Node.js 16+ y npm 7+
- Cuenta de Firebase
- Cuenta de AWS (para SES)

### Pasos

1. **Clonar el repositorio:**
```bash
git clone <URL_DEL_REPOSITORIO>
cd proyecto-integrador
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env
# Edita .env y completa con tus credenciales
```

4. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

---

## ⚙️ Configuración del Proyecto

### Firebase Setup

1. Ir a [Firebase Console](https://console.firebase.google.com)
2. Crear nuevo proyecto
3. Habilitar Authentication (Email/Password y Google)
4. Crear Firestore Database
5. Copiar credenciales a `.env`

### AWS SES Setup

1. Ir a [AWS Console](https://aws.amazon.com/console/)
2. Habilitar SES en la región deseada
3. Verificar email para envíos
4. Copiar credenciales a `.env` y variables de Vercel

---

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo

# Build
npm run build        # Compilar para producción

# Testing
npm run test         # Ejecutar tests
npm run test:ui      # Tests con interfaz visual
npm run test:coverage # Generar reporte de cobertura

# Linting
npm run lint         # Verificar código

# Preview
npm run preview      # Preview de build de producción
```

---

## 📁 Estructura del Proyecto

```
src/
├── pages/              # Páginas principales (Login, Register, Tasks)
├── components/         # Componentes reutilizables
├── features/           # Lógica por dominio (auth, tasks)
├── services/           # Integraciones (Firebase, API)
├── routes/             # Configuración de rutas
├── hooks/              # Custom hooks (useAuth, useTasks)
├── types/              # Interfaces y tipos TypeScript
├── utils/              # Funciones utilitarias
├── App.tsx             # Componente raíz
└── main.tsx            # Punto de entrada
functions/             # Vercel Functions (email)
tests/                 # Tests unitarios y de componentes
.env                   # Variables locales (NO subir)
.env.example           # Plantilla de variables
vitest.config.ts       # Configuración de Vitest
README.md              # Este archivo
```

---

## 🔐 Variables de Entorno

Las siguientes variables deben configurarse en `.env`:

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

**⚠️ IMPORTANTE:** El archivo `.env` NUNCA debe ser cometido al repositorio. Está en `.gitignore`.

---

## 🧑‍💻 Desarrollo

### Primeras Contribuciones

1. Crear rama para tu funcionalidad: `git checkout -b feat/nueva-funcionalidad`
2. Hacer commits semánticos: `git commit -m "feat: descripción"`
3. Hacer push: `git push origin feat/nueva-funcionalidad`
4. Crear Pull Request

### Convenciones de Commit

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato
- `test:` Agregar/modificar tests
- `refactor:` Refactorización
- `chore:` Configuración/dependencias

---

## 🚀 Deploy en Vercel

1. **Conectar repositorio GitHub con Vercel**
2. **Configurar variables de entorno en Vercel**
3. **Deploy automático** en cada push a main

### Variables en Vercel

- Frontend: `VITE_FIREBASE_*` (con prefijo VITE_)
- Serverless: `AWS_*` (sin prefijo)

---

## 📝 Hitos del Proyecto

- [ ] Hito 1: Setup Inicial
- [ ] Hito 2: Configuración de Firebase
- [ ] Hito 3: Autenticación
- [ ] Hito 4: Rutas Protegidas
- [ ] Hito 5: Modelo de Datos y Seguridad
- [ ] Hito 6: CRUD de Tareas
- [ ] Hito 7: Email con AWS SES
- [ ] Hito 8: Testing
- [ ] Hito 9: Deploy en Vercel

---

---

## 🤝 Contribuir

Este proyecto es un proyecto integrador de aprendizaje. Siéntete libre de sugerir mejoras o reportar issues.

---

## 📄 Licencia

Proyecto educativo - Soy Henry M4

---

**Última actualización:** 4 de mayo de 2026
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
