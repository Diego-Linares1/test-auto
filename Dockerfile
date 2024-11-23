# Usa una imagen base de Node.js
FROM node:22.11.0

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de npm
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente
COPY . .

# Exponer el puerto que Cloud Run usará
EXPOSE 8080

# Construye la aplicación
RUN npm run build

# Inicia la aplicación
CMD ["npm", "start"]
