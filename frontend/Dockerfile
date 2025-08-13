# Build Frontend
FROM node:24-alpine as BUILD
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm run build

# Host frontend
FROM nginx:alpine
COPY --from=BUILD /app/dist/spa-main-webapp/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
