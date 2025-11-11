# CrudCloud - Modern Cloud Database Management UI

Una interfaz web moderna, elegante y profesional para gestionar bases de datos en la nube (MySQL, PostgreSQL, MongoDB, Redis, Cassandra, SQL Server).

## 🎨 Características

### Pantallas Implementadas

1. **Dashboard Principal**
   - Saludo personalizado al usuario
   - Visualización del plan actual (Free, Standard, Premium)
   - Resumen de instancias activas con estados (CREATING, RUNNING, SUSPENDED, DELETED)
   - Estadísticas de uso (instancias activas, almacenamiento, conexiones)
   - Tabla completa de instancias con acciones

2. **Catálogo de Motores**
   - Tarjetas visuales para cada motor de base de datos
   - Iconografía clara y distintiva
   - Filtros por tipo (Relacionales, NoSQL, In-Memory)
   - Modal para crear nuevas instancias
   - Selección de plan y región

3. **Detalle de Instancia**
   - Información técnica completa (host, puerto, usuario, estado)
   - Métricas de rendimiento en tiempo real (CPU, Memoria, Conexiones)
   - Información de almacenamiento con barra de progreso
   - Credenciales de conexión (copiar al portapapeles)
   - Botones de acción (Suspender, Reanudar, Rotar contraseña, Eliminar)

4. **Gestión de Plan**
   - Comparación de planes (Free, Standard, Premium)
   - Visualización de límites y características por plan
   - Indicadores de uso actual
   - Modal de pago integrado (Mercado Pago)
   - Historial de facturación

### Diseño Visual

- **Paleta de colores**: Azul oscuro (#0F172A), Violeta (#7C3AED), Gris neutro (#64748B)
- **Componentes**: Tarjetas limpias, bordes redondeados (12px), sombras suaves
- **Tipografía**: Inter/Poppins (sans-serif)
- **Íconos**: Lucide React (lineales)
- **Layout**: Sidebar lateral + Header superior
- **Responsividad**: Diseño adaptable para móviles, tablets y desktop

## 🚀 Stack Tecnológico

- **React 18.2.0** - Librería UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconografía
- **PostCSS** - Procesamiento de CSS

## 📋 Requisitos Previos

- Node.js 14.0 o superior
- npm o yarn

## ⚙️ Instalación

1. Navega al directorio del proyecto:
```bash
cd CrudCloud-UI
```

2. Instala las dependencias:
```bash
npm install
```

## 🏃 Uso

### Desarrollo

Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

### Preview de Producción

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
CrudCloud-UI/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx           # Pantalla principal
│   │   ├── DatabaseCatalog.jsx     # Catálogo de motores
│   │   ├── InstanceDetail.jsx      # Detalle de instancia
│   │   └── PlanManagement.jsx      # Gestión de planes
│   ├── styles/
│   │   └── global.css              # Estilos globales
│   ├── App.jsx                     # Componente principal
│   └── main.jsx                    # Punto de entrada
├── index.html                      # HTML principal
├── vite.config.js                  # Configuración de Vite
├── tailwind.config.js              # Configuración de Tailwind
├── postcss.config.js               # Configuración de PostCSS
└── package.json                    # Dependencias del proyecto
```

## 🎯 Funcionalidades Principales

### Dashboard
- Vista general de todas las instancias
- Filtrado por estado
- Acciones rápidas (Suspender/Reanudar)
- Crear nueva instancia

### Catálogo
- Visualización de 6 motores de base de datos
- Información de características
- Creación rápida de instancias
- Selección de plan y región

### Detalle de Instancia
- Información técnica completa
- Credenciales con botones de copiar
- Gráficos de uso en tiempo real
- Gestión de instancias (suspender, eliminar, etc.)

### Plan
- Comparación de planes
- Visualización de límites de uso
- Actualización de plan con pago
- Historial de facturas

## 🎨 Personalización

### Colores
Los colores principales están definidos en `tailwind.config.js`:
- Violeta primario: #7C3AED
- Azul oscuro: #0F172A
- Gris: #64748B

### Fuentes
Las fuentes se cargan desde Google Fonts en `index.html`:
- Inter (Body text)
- Poppins (Headings)

### Iconos
Usa Lucide React para todos los iconos. Consulta [lucide.dev](https://lucide.dev) para el catálogo completo.

## 📱 Responsive Design

La interfaz está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 🖥️ Desktop (1024px+)

## 🔐 Notas de Seguridad

- Las contraseñas se muestran/ocultan con toggle
- Copia al portapapeles segura
- Confirmación antes de eliminar
- Validación de formularios

## 🤝 Contribuciones

Este es un proyecto de interfaz UI. Para cambios o mejoras:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.



