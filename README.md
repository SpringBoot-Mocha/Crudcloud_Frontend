# CrudCloud Frontend

**Plataforma moderna y escalable para gestionar instancias de bases de datos en la nube**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Node](https://img.shields.io/badge/Node-14+-339933?logo=node.js)](https://nodejs.org)

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Guía de Desarrollo](#guía-de-desarrollo)
- [API Integration](#api-integration)
- [Mejores Prácticas](#mejores-prácticas)
- [Seguridad](#seguridad)
- [Troubleshooting](#troubleshooting)

---

## 📖 Descripción General

CrudCloud Frontend es una aplicación React moderna construida con **Vite** y **Tailwind CSS** que proporciona una interfaz intuitiva para crear, gestionar y monitorear instancias de bases de datos en la nube.

Soporta múltiples motores de bases de datos:
- **Relacionales**: MySQL, PostgreSQL, SQL Server
- **NoSQL**: MongoDB, Cassandra
- **In-Memory**: Redis

### 🎯 Objetivos

- ✅ Interfaz moderna y responsiva
- ✅ Arquitectura escalable y mantenible
- ✅ Flujo de autenticación seguro
- ✅ Gestión de suscripciones y planes
- ✅ CRUD completo de instancias
- ✅ Manejo robusto de errores

---

## ✨ Características

### 🔐 Autenticación y Autorización
- Login y registro de usuarios
- Rutas protegidas con ProtectedRoute
- Persistencia de sesión con localStorage
- Logout desde cualquier página del dashboard
- Refresh automático de tokens

### 📊 Dashboard
- Estadísticas en tiempo real
- Vista rápida de instancias activas
- Acciones rápidas desde el dashboard
- Información del plan actual
- Gráficos y widgets informativos

### 💾 Gestión de Instancias
- **Crear**: Nueva instancia con selección de motor
- **Listar**: Grid responsivo de todas las instancias
- **Leer**: Detalles completos de cada instancia
- **Actualizar**: Cambiar estado (suspender/reanudar), rotar contraseña
- **Eliminar**: Eliminación segura con confirmación
- Filtrado y búsqueda (preparado para implementar)

### 💳 Planes y Suscripciones
- 3 planes disponibles: Free, Standard, Premium
- Visualización clara de características por plan
- Actualización de plan con integración a Mercado Pago
- Información de renovación
- Límites de instancias por plan

### 👤 Perfil y Configuración
- Edición de información personal
- Cambio seguro de contraseña
- Eliminación de cuenta
- Información de seguridad

### 🌐 Páginas Públicas
- **Landing Page**: Hero, características, estadísticas, CTA
- **Pricing Page**: Comparación de planes, FAQ
- **About Page**: Misión, valores, equipo, contacto

---

## 🛠️ Stack Tecnológico

### Frontend Core
| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 18.2.0+ | Librería UI |
| Vite | 5.0+ | Build tool & Dev Server |
| Tailwind CSS | 3.3+ | Framework CSS |
| React Router | 6.0+ | Routing y navegación |
| Axios | 1.6+ | Cliente HTTP |

### Características Implementadas
- **Validación**: Custom validation helpers (sin dependencias externas)
- **State Management**: React Context API + Custom Hooks
- **Error Handling**: Error Boundary + Interceptors de Axios
- **Toast Notifications**: Custom useToast hook
- **Modal Management**: Custom useModal hook
- **Debouncing**: Custom useDebounce hook

### Dev Dependencies
- PostCSS
- ESLint (linting)
- Prettier (formatting)

---

## 🏗️ Arquitectura

### Principios de Diseño

```
┌─────────────────────────────────────────────────────────────┐
│                    React App                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              ErrorBoundary                           │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │    AuthProvider (Global Auth State)            │ │  │
│  │  │  ┌──────────────────────────────────────────┐  │ │  │
│  │  │  │  InstanceProvider (Global Instances)     │  │ │  │
│  │  │  │  ┌────────────────────────────────────┐  │  │ │  │
│  │  │  │  │ PlanProvider (Global Plans)        │  │  │ │  │
│  │  │  │  │  ┌──────────────────────────────┐  │  │  │ │  │
│  │  │  │  │  │     AppRoutes (Router)       │  │  │  │ │  │
│  │  │  │  │  │   ├─ Public Routes           │  │  │  │ │  │
│  │  │  │  │  │   ├─ Auth Routes             │  │  │  │ │  │
│  │  │  │  │  │   └─ Protected Routes        │  │  │  │ │  │
│  │  │  │  │  └──────────────────────────────┘  │  │  │ │  │
│  │  │  │  └────────────────────────────────────┘  │  │ │  │
│  │  │  └──────────────────────────────────────────┘  │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Separación de Responsabilidades

**Components** (Presentación)
- Componentes UI puros y reutilizables
- Reciben props, emiten eventos
- Sin lógica de negocio

**Hooks** (Lógica)
- Custom hooks para lógica reutilizable
- Encapsulación de state y effects
- Composición flexible

**Services** (Comunicación)
- Llamadas a API
- Transformación de datos
- Manejo de errores centralizado

**Context** (Estado Global)
- Estado compartido entre componentes
- Reducción de prop drilling
- Aislamiento por dominio

---

## 📁 Estructura del Proyecto

```
src/
├── api/
│   ├── client.js              # Axios instance configurado
│   ├── endpoints.js           # URLs de endpoints
│   └── interceptors.js        # Request/Response handlers
│
├── assets/                    # Recursos estáticos
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/                # Componentes organizados por feature
│   ├── ui/                    # Componentes reutilizables
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Spinner.jsx
│   │   ├── Toast.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── index.js
│   ├── auth/                  # Feature: Autenticación
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   ├── ProtectedRoute/
│   │   └── index.js
│   ├── instances/             # Feature: Gestión de instancias
│   │   ├── InstanceCard/
│   │   ├── InstanceList/
│   │   ├── CreateInstanceModal/
│   │   └── index.js
│   ├── plans/                 # Feature: Planes
│   │   ├── PlanCard/
│   │   └── index.js
│   └── profile/               # Feature: Perfil
│       ├── ProfileForm/
│       ├── PasswordChange/
│       └── index.js
│
├── context/                   # Global state (Context API)
│   ├── AuthContext.jsx        # Estado de autenticación
│   ├── InstanceContext.jsx    # Estado de instancias
│   └── PlanContext.jsx        # Estado de planes
│
├── hooks/                     # Custom hooks
│   ├── useAuth.js            # Acceso a AuthContext
│   ├── useInstances.js       # Acceso a InstanceContext
│   ├── usePlans.js           # Acceso a PlanContext
│   ├── useForm.js            # Manejo de formularios
│   ├── useToast.js           # Notificaciones
│   ├── useModal.js           # Estado de modales
│   └── useDebounce.js        # Debouncing
│
├── layouts/                   # Layouts de página
│   ├── AuthLayout.jsx        # Para login/register
│   ├── PublicLayout.jsx      # Para páginas públicas
│   └── DashboardLayout.jsx   # Para dashboard protegido
│
├── pages/                     # Páginas/Vistas
│   ├── public/
│   │   ├── LandingPage.jsx
│   │   ├── PricingPage.jsx
│   │   └── AboutPage.jsx
│   ├── auth/
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   └── dashboard/
│       ├── DashboardPage.jsx
│       ├── InstancesPage.jsx
│       ├── PlansPage.jsx
│       └── ProfilePage.jsx
│
├── routes/                    # Configuración de rutas
│   └── index.jsx             # AppRoutes con React Router
│
├── services/                  # Servicios de API
│   ├── authService.js
│   ├── instanceService.js
│   ├── planService.js
│   ├── userService.js
│   └── paymentService.js (preparado)
│
├── styles/                    # Estilos globales
│   ├── global.css
│   └── variables.css
│
├── utils/                     # Utilidades
│   ├── storage.js            # localStorage helpers
│   ├── validation/
│   │   └── schemas.js        # Validación de formularios
│   ├── formatters.js         # Formateo de datos
│   ├── constants.js          # Constantes de app
│   └── errors.js             # Manejo de errores
│
├── App.jsx                    # Componente raíz
└── main.jsx                   # Punto de entrada
```

---

## 🚀 Instalación

### Requisitos Previos

- **Node.js**: 14.0 o superior
- **npm**: 6.0 o superior (o yarn)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd Crudcloud_Frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env.local
cp .env.example .env.local
```

Edita `.env.local` con tus valores:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=CrudCloud
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
# Build optimizado
npm run build

# Verificar build localmente
npm run preview

# Archivos compilados estarán en: dist/
```

---

## 🏃 Guía de Desarrollo

### Comandos Disponibles

```bash
# Desarrollo
npm run dev           # Inicia servidor con hot reload

# Producción
npm run build         # Build optimizado
npm run preview       # Preview del build

# Linting y Formato
npm run lint          # ESLint
npm run format        # Prettier

# Testing (próximamente)
npm run test          # Tests unitarios
npm run test:e2e      # Tests E2E
```

### Convenciones de Código

#### Naming Conventions

```javascript
// Componentes
PascalCase → Button.jsx, LoginForm.jsx

// Hooks
camelCase + 'use' → useAuth.js, useInstances.js

// Services
camelCase + 'Service' → authService.js, instanceService.js

// Context
PascalCase + 'Context' → AuthContext.jsx

// Variables y Funciones
camelCase → userData, handleSubmit, fetchInstances()

// Constantes
UPPER_SNAKE_CASE → API_BASE_URL, MAX_INSTANCES

// Event Handlers
'handle' + Action → handleSubmit, handleDelete, onClick
```

#### Estructura de Componentes

```javascript
import React from 'react';
import { Button, Input } from '../ui';

// Componentes funcionales con destructuring de props
const MyComponent = ({ prop1, prop2, onClick }) => {
  // Hooks primero
  const [state, setState] = React.useState(null);

  // Funciones auxiliares
  const handleAction = () => {
    // ...
  };

  // JSX limpio y bien estructurado
  return (
    <div className="space-y-4">
      <Input value={prop1} onChange={(e) => setState(e.target.value)} />
      <Button onClick={handleAction}>Acción</Button>
    </div>
  );
};

export default MyComponent;
```

#### Manejo de Formularios

```javascript
import { useForm } from '../hooks/useForm';

const MyForm = () => {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    async (formValues) => {
      // Lógica de envío
      await submitForm(formValues);
    }
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Button type="submit" isLoading={isSubmitting}>
        Enviar
      </Button>
    </form>
  );
};
```

---

## 🔌 API Integration

### Configuración del Cliente

El cliente Axios está configurado en `src/api/client.js`:

```javascript
// Automáticamente agrega token JWT a cada request
const response = await apiClient.get('/api/v1/instances');

// Maneja errores 401 y redirige a login
// Retry automático para errores de red
```

### Endpoints Documentados

#### Autenticación
```
POST   /api/v1/auth/register     # Registro de usuario
POST   /api/v1/auth/login        # Login
```

#### Usuarios
```
GET    /api/v1/users/{id}        # Obtener perfil
PUT    /api/v1/users/{id}        # Actualizar perfil
DELETE /api/v1/users/{id}        # Eliminar cuenta
POST   /api/v1/users/{id}/change-password
```

#### Instancias
```
GET    /api/v1/instances         # Listar todas
POST   /api/v1/instances         # Crear instancia
GET    /api/v1/instances/{id}    # Detalles
PUT    /api/v1/instances/{id}    # Actualizar
DELETE /api/v1/instances/{id}    # Eliminar
POST   /api/v1/instances/{id}/rotate-password
```

#### Planes y Suscripciones
```
GET    /api/v1/plans             # Listar planes
GET    /api/v1/subscriptions/current
POST   /api/v1/subscriptions/upgrade
```

---

## ✅ Mejores Prácticas

### Performance

1. **Code Splitting**
   - Lazy loading de rutas
   - Componentes pesados con React.lazy()

2. **Memoización**
   - React.memo para componentes que rerenderean
   - useMemo para cálculos costosos
   - useCallback para funciones como props

3. **Estado Eficiente**
   - Colocation de estado (lo más cerca del uso)
   - Context separation (evitar contextos gigantes)
   - Props drilling máximo 2 niveles

### Accesibilidad (WCAG AA)

- ✅ Semantic HTML (nav, main, article, etc.)
- ✅ Heading hierarchy correcta (h1, h2, h3)
- ✅ Tab order lógico
- ✅ Focus visible
- ✅ Contraste mínimo 4.5:1
- ✅ Labels en formularios
- ✅ ARIA labels en iconos

### Manejo de Errores

```javascript
// Global error boundary
<ErrorBoundary>
  <App />
</ErrorBoundary>

// API errors con interceptors
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Manejo centralizado de errores
  }
);

// Form validation
const { errors, handleSubmit } = useForm(initialValues, onSubmit);
```

---

## 🔐 Seguridad

### Autenticación
- ✅ Tokens JWT en localStorage
- ✅ Refresh token rotation (preparado)
- ✅ HttpOnly cookies (recomendado para producción)
- ✅ Logout en todas las pestañas (BroadcastChannel API)

### Validación
- ✅ Validación client-side antes de enviar
- ✅ Validación server-side en backend
- ✅ Sanitización de inputs
- ✅ Escapado de contenido dinámico

### Protección de Rutas
- ✅ ProtectedRoute para páginas privadas
- ✅ Role-based access control (preparado)
- ✅ Redirect automático a login si no autenticado

### CORS y CSP
- Configurado en backend
- Content Security Policy headers recomendado

---

## 🐛 Troubleshooting

### Problemas Comunes

#### Puerto 5173 en uso
```bash
# Usar puerto diferente
npm run dev -- --port 3000
```

#### CORS errors
```
Error: Access to XMLHttpRequest blocked by CORS policy
→ Verificar que backend tiene CORS configurado
→ Revisar VITE_API_BASE_URL en .env.local
```

#### Token expirado
```
Error: 401 Unauthorized
→ Token expirado, necesita login nuevamente
→ ProtectedRoute redirige automáticamente a /login
```

#### Componente no renderiza
```javascript
// Verificar que está envuelto en Provider necesario
<AuthProvider>
  <InstanceProvider>
    <PlanProvider>
      <App />
    </PlanProvider>
  </InstanceProvider>
</AuthProvider>
```

### Debugging

```javascript
// Logs detallados en desarrollo
if (import.meta.env.DEV) {
  console.log('[API]', request);
}

// React DevTools
// Instalar: https://react-devtools-tutorial.vercel.app/

// Network tab en DevTools
// Ver requests/responses de API
```

---

## 📚 Recursos Útiles

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com)

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'feat: add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

### Convenciones de Commits

```
feat: nueva feature
fix: corrección de bug
refactor: refactorización de código
docs: cambios en documentación
style: cambios de formato/estilo
test: agregar/actualizar tests
chore: cambios en build/deps
```

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver archivo `LICENSE` para más detalles.

---

## 👨‍💼 Contacto y Soporte

Para reportar bugs o sugerir features:
- Abrir un issue en el repositorio
- Contactar al equipo de desarrollo

---

**Última actualización**: Noviembre 2024
**Versión**: 1.0.0
**Status**: ✅ Producción-Ready
