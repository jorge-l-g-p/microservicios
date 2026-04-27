# Usamos una imagen ligera de Node.js
FROM node:20-alpine

# Creamos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias (solo producción para que sea ligero)
RUN npm install --production

# Copiamos el resto del código del microservicio
COPY . .

# Exponemos el puerto 3002 (específico para Tasks)
EXPOSE 3002

# Comando para iniciar el servicio
CMD ["npm", "start"]