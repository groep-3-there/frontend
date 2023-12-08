# Stage 1: Frontend Build
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

# Stage 2: Certbot and Nginx
FROM nginx as production-stage
RUN mkdir /app

# Copy frontend files from the build stage
COPY --from=build-stage /app/dist /app

# Install Certbot and obtain SSL certificates
RUN apt-get update && \
    apt-get install -y certbot && \
    mkdir -p /usr/share/nginx/html && \
    certbot certonly --webroot --webroot-path=/usr/share/nginx/html --agree-tos -m florijnmunster@outlook.com -d matchmakergroep3.nl

# Copy SSL certificates from Certbot to Nginx
COPY --from=production-stage /etc/letsencrypt /etc/letsencrypt

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80
EXPOSE 443
