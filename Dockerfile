# Stage 1: Build Stage
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

# Stage 2: Production Stage
FROM nginx:latest as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app

# Stage 3: Nginx Configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Stage 4: Certbot Stage
FROM certbot/certbot as certbot-stage

# Final Stage
FROM nginx:latest

# Copy built frontend files from the production stage
COPY --from=production-stage /app /usr/share/nginx/html

# Copy Nginx configuration
COPY --from=production-stage /etc/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy Certbot configurations
COPY --from=certbot-stage /etc/letsencrypt /etc/letsencrypt

# Expose ports
EXPOSE 80
EXPOSE 443

# Command to renew certificates (you can customize as needed)
CMD ["certbot", "renew", "--nginx"]