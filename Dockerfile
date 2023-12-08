# Stage 1: Frontend Build
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

# Stage 2: Certbot
FROM certbot/certbot as certbot-stage
RUN apt-get update && \
    apt-get install -y certbot

# Stage 3: Nginx and Certificates
FROM nginx as production-stage
RUN mkdir /app

# Copy frontend files from the build stage
COPY --from=build-stage /app/dist /app

# Copy Certbot from the certbot stage
COPY --from=certbot-stage /usr/bin/certbot /usr/bin/certbot

# Install Certbot dependencies for Nginx plugin
RUN apt-get update && \
    apt-get install -y python3-certbot-nginx

# Obtain SSL certificates using Certbot
RUN mkdir -p /usr/share/nginx/html && \
    certbot certonly --webroot --webroot-path=/usr/share/nginx/html --agree-tos -m your@email.com -d your_domain.com

# Copy SSL certificates from Certbot to Nginx
COPY --from=production-stage /etc/letsencrypt /etc/letsencrypt

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80
EXPOSE 443
