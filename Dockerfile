FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

FROM certbot/certbot

RUN apk update && \
    apk add --no-cache \
    python3 \
    certbot \
    certbot-nginx \
    && rm -rf /var/cache/apk/*

ENTRYPOINT ["certbot"]