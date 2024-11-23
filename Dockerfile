# Usa la imagen oficial de Node.js como base
FROM node:22.11.0

# Crea un directorio en el contenedor para tu aplicación
WORKDIR /app

# Copia los archivos package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Instalar TypeScript globalmente
RUN npm install -g typescript

# Copia el resto de los archivos del proyecto
COPY . .

# Compila el proyecto TypeScript
RUN npm run build

# Expone el puerto que la aplicación va a usar
EXPOSE 3000

# Define la variable de entorno para el puerto en el contenedor
ENV PORT=3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]