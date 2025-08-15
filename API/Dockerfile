FROM denoland/deno:alpine
WORKDIR /app
COPY . .
ENV APP_HOST='0.0.0.0'
ENV APP_PORT=4100
ENV MONGO_DB='SPA_Main'
ENV MONGO_URI='mongodb://localhost:27017'

EXPOSE 4100

CMD ["task", "start"]