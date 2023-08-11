# Build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

# Production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
