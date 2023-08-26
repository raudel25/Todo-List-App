# Inicia desde una imagen base con Node.js
FROM node:lts-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Agrega `/app/node_modules/.bin` a $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Instala las dependencias de la aplicación
# Copia package.json y yarn.lock
COPY package.json ./
COPY yarn.lock ./

# Instala node-sass
RUN yarn add node-sass

# Instala todas las dependencias
RUN yarn

# Copia el resto de los archivos de la aplicación
COPY . ./

# Comando para iniciar la aplicación
CMD ["yarn", "start"]
