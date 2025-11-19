<div align="center">

# CrudCloud Frontend

### Modern SaaS Platform for Cloud Database Management

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Architecture](#-architecture) • [Development](#-development)

</div>

---

## 📖 Overview

**CrudCloud Frontend** is a modern, production-ready React application built with **Vite** and **Tailwind CSS** that provides an intuitive interface for managing cloud database instances. It offers a comprehensive SaaS platform for automated database provisioning, monitoring, and management with enterprise-grade security and performance.

### 🎯 Key Highlights

- **Modern UI/UX**: Premium design with Apple-inspired aesthetics and smooth animations
- **Multi-Database Support**: Manage MySQL, PostgreSQL, SQL Server, Redis, Cassandra, and MongoDB instances
- **Subscription Management**: Three-tier pricing plans with automated billing via Mercado Pago
- **Enterprise Security**: JWT authentication, role-based access control, and secure API integration
- **Performance Optimized**: Code splitting, lazy loading, and optimized bundle delivery
- **Responsive Design**: Mobile-first approach with seamless cross-device experience

---

## ✨ Features

### 🔐 Authentication & Security
- **Secure Login/Register** with JWT token management
- **Protected Routes** with automatic redirects and session persistence
- **Role-Based Access Control** ready for multi-tenant environments
- **Secure Token Storage** with automatic refresh and logout handling

### 📊 Dashboard & Analytics
- **Real-time Statistics** with animated charts and performance metrics
- **Instance Overview** with quick actions and status monitoring
- **Usage Analytics** with resource consumption tracking
- **Performance Monitoring** with live status updates

### 💾 Database Instance Management
- **Multi-Engine Support**: Create instances for MySQL, PostgreSQL, SQL Server, Redis, Cassandra, MongoDB
- **Full CRUD Operations**: Create, read, update, delete database instances
- **Instance Lifecycle**: Start, stop, suspend, and resume operations
- **Credential Management**: Automatic password generation and rotation
- **Status Monitoring**: Real-time instance health and performance tracking

### 💳 Subscription & Billing
- **Three-Tier Plans**: Free (2 instances), Standard (5 instances), Premium (10 instances)
- **Plan Comparison**: Detailed feature comparison with upgrade paths
- **Payment Integration**: Seamless Mercado Pago integration for subscription payments
- **Billing History**: Complete transaction and payment tracking

### 👤 User Profile & Settings
- **Profile Management**: Edit personal information and preferences
- **Security Settings**: Password change and account security options
- **Account Management**: Soft delete with confirmation workflows
- **Notification Preferences**: Customizable alert and notification settings

### 🌐 Public Pages & Marketing
- **Landing Page**: Modern hero section with animated gradients and particle effects
- **Pricing Page**: Clear plan comparison with feature breakdown
- **About Page**: Company information, mission, and contact details
- **Responsive Design**: Optimized for all devices and screen sizes

---

## 🛠️ Tech Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0+ | UI Library & Component Framework |
| **Vite** | 7.2+ | Build Tool & Development Server |
| **Tailwind CSS** | 3.3+ | Utility-First CSS Framework |
| **React Router** | 7.9+ | Client-Side Routing |

### State Management & Data
- **React Context API** - Global state management
- **React Hooks** - Custom hooks for business logic
- **Axios** - HTTP client with interceptors
- **React Hook Form** - Form validation and management
- **Zod** - Schema validation and type safety

### UI & Animation
- **Framer Motion** - Advanced animations and transitions
- **Lucide React** - Modern icon library
- **CLSX** - Conditional className utility
- **Custom Design System** - Premium UI components

### Development Tools
- **PostCSS** - CSS processing with nesting support
- **ESLint** - Code linting and quality
- **TypeScript Ready** - Full TypeScript support prepared
- **Hot Module Replacement** - Fast development experience

### Performance Features
- **Code Splitting** - Lazy-loaded routes and components
- **Tree Shaking** - Optimized bundle size
- **Asset Optimization** - Compressed images and fonts
- **Caching Strategy** - Efficient resource loading

---

## 🏗️ Architecture

CrudCloud Frontend follows a modern, scalable architecture pattern:

```
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                      │
│              (Pages + Layouts + Routing)                 │
├─────────────────────────────────────────────────────────┤
│                   Context Layer                          │
│     (Global State + Authentication + Business Logic)     │
├─────────────────────────────────────────────────────────┤
│                   Component Layer                        │
│         (UI Components + Custom Hooks)                   │
├─────────────────────────────────────────────────────────┤
│                   Service Layer                          │
│              (API Integration + Data Fetching)           │
├─────────────────────────────────────────────────────────┤
│                   Utility Layer                          │
│           (Helpers + Validators + Formatters)            │
└─────────────────────────────────────────────────────────┘

External Integrations:
├── CrudCloud Backend API (RESTful Services)
├── Mercado Pago (Payment Processing)
└── Docker Engine (Database Instance Management)
```

### Component Architecture

- **Atomic Design**: Atoms → Molecules → Organisms → Templates → Pages
- **Feature-Based Organization**: Components grouped by business domain
- **Composition over Inheritance**: Reusable, composable components
- **Separation of Concerns**: UI logic separated from business logic

---

## 📁 Project Structure

```
Crudcloud_Frontend/
├── src/
│   ├── api/                          # API Configuration
│   │   ├── client.js                 # Axios instance with interceptors
│   │   ├── endpoints.js              # API endpoint definitions
│   │   └── interceptors.js           # Request/response handlers
│   │
│   ├── assets/                       # Static Resources
│   │   ├── images/                   # Optimized images
│   │   ├── icons/                    # SVG icons and illustrations
│   │   └── fonts/                    # Custom font files
│   │
│   ├── components/                   # React Components
│   │   ├── ui/                       # Reusable UI Components
│   │   │   ├── Button.jsx            # Interactive buttons with variants
│   │   │   ├── Input.jsx             # Form inputs with validation
│   │   │   ├── Card.jsx              # Content containers
│   │   │   ├── Badge.jsx             # Status and label badges
│   │   │   ├── Modal.jsx             # Dialog and overlay components
│   │   │   ├── Alert.jsx             # Notification and feedback
│   │   │   ├── Tooltip.jsx           # Contextual information
│   │   │   ├── Skeleton.jsx          # Loading placeholders
│   │   │   ├── AnimatedGradient.jsx  # Premium gradient effects
│   │   │   ├── GlassCard.jsx         # Glass morphism components
│   │   │   ├── ParticleBackground.jsx # Animated background effects
│   │   │   ├── ScrollProgress.jsx    # Scroll progress indicator
│   │   │   └── ErrorBoundary.jsx     # Error handling wrapper
│   │   │
│   │   ├── auth/                     # Authentication Components
│   │   │   ├── LoginForm/            # User login interface
│   │   │   ├── RegisterForm/         # User registration
│   │   │   └── ProtectedRoute/       # Route protection
│   │   │
│   │   ├── instances/                # Database Instance Management
│   │   │   ├── InstanceCard/         # Instance display card
│   │   │   ├── InstanceList/         # Grid/list view of instances
│   │   │   ├── CreateInstanceModal/  # Instance creation form
│   │   │   └── InstanceActions/      # Instance operation buttons
│   │   │
│   │   ├── plans/                    # Subscription Plans
│   │   │   ├── PlanCard/             # Plan display and selection
│   │   │   └── PlanComparison/       # Feature comparison table
│   │   │
│   │   ├── profile/                  # User Profile
│   │   │   ├── ProfileForm/          # Profile editing
│   │   │   └── PasswordChange/       # Security settings
│   │   │
│   │   └── dashboard/                # Dashboard Components
│   │       ├── StatsCard/            # Performance metrics
│   │       ├── ActivityChart/        # Usage analytics
│   │       └── QuickActions/         # Common operations
│   │
│   ├── context/                      # Global State Management
│   │   ├── AuthContext.jsx           # Authentication state
│   │   ├── InstanceContext.jsx       # Database instances state
│   │   ├── PlanContext.jsx           # Subscription plans state
│   │   └── ThemeContext.jsx          # UI theme preferences
│   │
│   ├── hooks/                        # Custom React Hooks
│   │   ├── useAuth.js                # Authentication utilities
│   │   ├── useInstances.js           # Instance management
│   │   ├── usePlans.js               # Plan management
│   │   ├── useForm.js                # Form handling
│   │   ├── useToast.js               # Notification system
│   │   ├── useModal.js               # Modal management
│   │   ├── useDebounce.js            # Performance optimization
│   │   └── useApi.js                 # API call management
│   │
│   ├── layouts/                      # Page Layouts
│   │   ├── PublicLayout.jsx          # Public pages layout
│   │   ├── DashboardLayout.jsx       # Protected dashboard layout
│   │   └── AuthLayout.jsx            # Authentication pages layout
│   │
│   ├── pages/                        # Application Pages
│   │   ├── public/                   # Public Pages
│   │   │   ├── LandingPage.jsx       # Homepage with hero section
│   │   │   ├── PricingPage.jsx       # Plan comparison and pricing
│   │   │   └── AboutPage.jsx         # Company information
│   │   │
│   │   ├── auth/                     # Authentication Pages
│   │   │   ├── LoginPage.jsx         # User login
│   │   │   └── RegisterPage.jsx      # User registration
│   │   │
│   │   └── dashboard/                # Protected Dashboard Pages
│   │       ├── DashboardPage.jsx     # Main dashboard overview
│   │       ├── InstancesPage.jsx     # Instance management
│   │       ├── PlansPage.jsx         # Subscription management
│   │       └── ProfilePage.jsx       # User profile and settings
│   │
│   ├── routes/                       # Routing Configuration
│   │   └── index.jsx                 # React Router setup
│   │
│   ├── services/                     # API Services
│   │   ├── authService.js            # Authentication API calls
│   │   ├── instanceService.js        # Instance management API
│   │   ├── planService.js            # Plan and subscription API
│   │   ├── userService.js            # User profile API
│   │   └── paymentService.js         # Payment processing API
│   │
│   ├── styles/                       # Global Styles
│   │   ├── global.css                # Global CSS and Tailwind imports
│   │   └── variables.css             # CSS custom properties
│   │
│   ├── utils/                        # Utility Functions
│   │   ├── validation/               # Form validation
│   │   │   ├── schemas.js            # Zod validation schemas
│   │   │   └── rules.js              # Custom validation rules
│   │   ├── formatters.js             # Data formatting utilities
│   │   ├── constants.js              # Application constants
│   │   ├── errors.js                 # Error handling utilities
│   │   └── storage.js                # LocalStorage helpers
│   │
│   ├── App.jsx                       # Root Application Component
│   └── main.jsx                      # Application Entry Point
│
├── public/                           # Static Public Assets
├── docs/                             # Documentation
├── package.json                      # Dependencies and Scripts
├── vite.config.js                    # Vite Configuration
├── tailwind.config.js                # Tailwind CSS Configuration
├── postcss.config.js                 # PostCSS Configuration
└── README.md                         # This File
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 16.0 or higher ([Download](https://nodejs.org/))
- **npm** 8.0 or higher (comes with Node.js)
- **Git** for version control

### Quick Start

1. **Clone the Repository**
```bash
git clone <repository-url>
cd Crudcloud_Frontend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment Variables**
```bash
# Copy environment template
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# Application Settings
VITE_APP_NAME=CrudCloud
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PAYMENTS=true
```

4. **Start Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview

# Build output will be in: dist/
```

### Docker Deployment

#### Quick Start with Docker Compose

The application is production-ready with Docker and Nginx. Use the provided `docker-compose.yml`:

```bash
# Clone and navigate to project root
cd Crudcloud_Backend  # Root directory containing docker-compose.yml

# Build and start all services
docker compose up -d --build frontend

# View logs
docker compose logs -f frontend
```

#### Docker Build Configuration

The Dockerfile uses a multi-stage build for optimal image size:

1. **Build Stage**: Node 21 Alpine
   - Installs dependencies with `npm install`
   - Copies `.env.docker` for build-time configuration
   - Creates optimized production build with `npm run build`

2. **Runtime Stage**: Nginx Alpine
   - Serves static assets from `/usr/share/nginx/html`
   - Uses custom Nginx configuration for SPA routing
   - Includes health checks and security headers

#### Environment Configuration for Docker

Create `.env.docker` in the project root for production:

```env
# API Configuration - MUST use HTTPS to avoid Mixed Content errors
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
VITE_API_TIMEOUT=15000

# Application Settings
VITE_APP_NAME=CrudCloud
VITE_APP_VERSION=1.0.0
VITE_APP_URL=https://yourdomain.com

# OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GITHUB_CLIENT_ID=your-github-client-id

# Feature Flags
VITE_ENABLE_MOCK_API=false
VITE_ENABLE_DEBUG_LOGGING=false

# Mercado Pago
VITE_MP_PUBLIC_KEY=your-mercadopago-key
```

#### Manual Docker Build

```bash
# Build Docker image
docker build -t crudcloud-frontend .

# Run container
docker run -d \
  --name crudcloud-frontend \
  -p 3001:80 \
  -e VITE_API_BASE_URL=https://api.yourdomain.com/api/v1 \
  crudcloud-frontend
```

#### Production Deployment Notes

- **HTTPS Required**: Always use `https://` URLs in `VITE_API_BASE_URL` to avoid Mixed Content errors
- **Reverse Proxy**: Use Nginx as reverse proxy for SSL/TLS termination
- **Health Checks**: Container includes health checks for orchestration
- **Logging**: Nginx access logs available in volume `frontend-logs:/var/log/nginx`

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080/api` | Yes |
| `VITE_APP_NAME` | Application display name | `CrudCloud` | No |
| `VITE_APP_VERSION` | Application version | `1.0.0` | No |
| `VITE_ENABLE_ANALYTICS` | Enable analytics features | `true` | No |
| `VITE_ENABLE_PAYMENTS` | Enable payment features | `true` | No |

### Build Configuration

Key build settings in `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: 5173,
    host: true
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', 'lucide-react']
        }
      }
    }
  }
})
```

---

## 🏃 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server with HMR
npm run dev -- --host    # Expose to network
npm run dev -- --port 3000  # Use specific port

# Production
npm run build            # Create production build
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier

# Testing (Coming Soon)
npm run test             # Run unit tests
npm run test:e2e         # Run end-to-end tests
npm run test:coverage    # Generate test coverage
```

### Development Guidelines

#### Component Development

```jsx
// Example: Creating a new component
import React from 'react';
import { Button, Card } from '../ui';

const NewFeatureComponent = ({ title, description, onAction }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onAction();
    setIsLoading(false);
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button
        onClick={handleClick}
        isLoading={isLoading}
        variant="primary"
      >
        Execute Action
      </Button>
    </Card>
  );
};

export default NewFeatureComponent;
```

#### API Integration

```javascript
// Example: Creating a new service
import { apiClient } from '../api/client';

export const newFeatureService = {
  async getData() {
    const response = await apiClient.get('/api/v1/new-feature');
    return response.data;
  },

  async createData(payload) {
    const response = await apiClient.post('/api/v1/new-feature', payload);
    return response.data;
  }
};
```

### Code Standards

- **Components**: PascalCase, functional components with hooks
- **Files**: PascalCase for components, camelCase for utilities
- **Props**: camelCase, descriptive names
- **Constants**: UPPER_SNAKE_CASE
- **Functions**: camelCase, action-oriented names

---

## 🔌 API Integration

### Authentication Flow

```javascript
// Login example
import { authService } from '../services/authService';

const handleLogin = async (credentials) => {
  try {
    const response = await authService.login(credentials);
    // Token automatically stored and managed
    return response;
  } catch (error) {
    // Error automatically handled by interceptors
    throw error;
  }
};
```

### Available Endpoints

#### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

#### User Management
- `GET /api/v1/users/{id}` - Get user profile
- `PUT /api/v1/users/{id}` - Update user information
- `DELETE /api/v1/users/{id}` - Delete user account
- `POST /api/v1/users/{id}/change-password` - Change password

#### Database Instances
- `GET /api/v1/instances` - List all instances
- `POST /api/v1/instances` - Create new instance
- `GET /api/v1/instances/{id}` - Get instance details
- `PUT /api/v1/instances/{id}` - Update instance
- `DELETE /api/v1/instances/{id}` - Delete instance
- `POST /api/v1/instances/{id}/rotate-password` - Rotate credentials

#### Subscriptions & Plans
- `GET /api/v1/plans` - List available plans
- `GET /api/v1/subscriptions/current` - Get current subscription
- `POST /api/v1/subscriptions/upgrade` - Upgrade subscription

---

## 🎨 UI/UX Design System

### Design Principles

- **Apple-Inspired Aesthetics**: Clean, minimal, and premium feel
- **Mobile-First Approach**: Responsive design for all devices
- **Accessibility First**: WCAG AA compliance throughout
- **Performance Focus**: Optimized animations and interactions

### Color Palette

```css
/* Primary Colors */
--primary-blue: #2563eb;
--primary-dark: #1e40af;
--primary-light: #3b82f6;

/* Semantic Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;

/* Neutral Colors */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-900: #111827;
```

### Component Variants

```jsx
// Button variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="danger">Danger Action</Button>

// Card variants
<Card variant="default">Default Card</Card>
<Card variant="elevated">Elevated Card</Card>
<Card variant="glass">Glass Card</Card>
```

---

## 🔐 Security

### Authentication Security

- **JWT Token Management**: Secure storage and automatic refresh
- **Protected Routes**: Automatic redirect for unauthenticated users
- **Session Persistence**: Secure localStorage with encryption
- **Logout Handling**: Clear all authentication data

### API Security

- **Request Interceptors**: Automatic token attachment
- **Response Interceptors**: Error handling and token refresh
- **CORS Protection**: Configured with backend
- **Input Validation**: Client-side validation before API calls

### Best Practices

1. **Never store sensitive data** in client-side storage
2. **Validate all user inputs** before processing
3. **Use HTTPS** in production environments
4. **Implement rate limiting** on sensitive endpoints
5. **Regular security audits** and dependency updates

---

## 📊 Performance Optimization

### Bundle Optimization

- **Code Splitting**: Lazy-loaded routes and components
- **Tree Shaking**: Remove unused code from bundles
- **Asset Optimization**: Compressed images and fonts
- **Caching Strategy**: Efficient resource loading

### Runtime Performance

- **Memoization**: React.memo for expensive components
- **Debouncing**: Optimized search and filter operations
- **Virtual Scrolling**: For large lists and datasets
- **Image Lazy Loading**: Deferred image loading

### Monitoring

- **Bundle Analysis**: Regular bundle size monitoring
- **Performance Metrics**: Core Web Vitals tracking
- **Error Tracking**: Real-time error monitoring
- **User Analytics**: Usage pattern analysis

---

## 🐛 Troubleshooting

### Common Issues

#### Development Server Issues

```bash
# Port already in use
npm run dev -- --port 3000

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build Issues

```bash
# Clear build cache
rm -rf dist node_modules/.vite

# Check Node version
node --version  # Should be 16.0+

# Verify dependencies
npm ls --depth=0
```

#### API Connection Issues

```javascript
// Check API configuration
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

// Verify CORS settings
// Backend should allow requests from your domain
```

### Debugging Tools

- **React DevTools**: Component inspection and state debugging
- **Browser DevTools**: Network requests and performance profiling
- **Vite Dev Server**: Hot module replacement and fast refresh
- **Error Boundaries**: Graceful error handling and reporting

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Write tests** for new functionality
4. **Follow code style**: Use existing code as reference
5. **Commit with clear messages**: Use conventional commits
6. **Push to your fork**: `git push origin feature/amazing-feature`
7. **Create Pull Request** with detailed description

### Commit Convention

```
feat: add new feature
fix: fix a bug
refactor: code refactoring
docs: documentation changes
style: code style changes
test: add or update tests
chore: build process or dependency changes
```

### Code Review Process

- All PRs require at least one review
- Tests must pass before merging
- Code must follow established patterns
- Documentation must be updated

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team & Contact

### Core Team

- **Frontend Development** - UI/UX implementation and React architecture
- **Backend Integration** - API design and data flow optimization
- **Design System** - Component library and visual design
- **Quality Assurance** - Testing and user experience validation

### Support & Resources

- **Documentation**: [GitHub Wiki](<repository-url>/wiki)
- **Issue Tracker**: [GitHub Issues](<repository-url>/issues)
- **Discussion Forum**: [GitHub Discussions](<repository-url>/discussions)
- **Security Issues**: security@crudcloud.com

---

## 🚀 Deployment

### Production Deployment

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify

```bash
# Build and deploy
npm run build
# Upload dist/ folder to Netlify
```

#### Self-Hosted

```bash
# Build and serve with nginx
npm run build
# Configure nginx to serve dist/ folder
```

### Environment Setup

Ensure production environment variables are set:

```env
VITE_API_BASE_URL=https://api.crudcloud.com/api
VITE_APP_NAME=CrudCloud
VITE_ENABLE_ANALYTICS=true
```

---

<div align="center">

**Built with React, Vite, and Tailwind CSS**

Made with ❤️ by the CrudCloud Team

[Report Bug](<repository-url>/issues) • [Request Feature](<repository-url>/issues)

</div>