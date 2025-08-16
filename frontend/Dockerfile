# Build Frontend
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Host frontend
FROM nginx:alpine
COPY --from=build /app/dist/spa-main-webapp/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf.template
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENV API_PORT=4100
ENV API_HOST=localhost
EXPOSE 80
CMD ["/entrypoint.sh"]
