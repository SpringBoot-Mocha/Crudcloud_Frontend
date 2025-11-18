# Etapa 1: Build
FROM node:18-alpine as build

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Copiar variables de entorno de producción
COPY .env.production .env

# Buildear la aplicación
RUN npm run build

# Etapa 2: Production
FROM nginx:alpine

# Copiar la build de React a Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
