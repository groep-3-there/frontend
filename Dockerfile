# Use an image with Certbot and Nginx
FROM certbot/certbot as certbot

# Stage 1: Obtain SSL certificates
RUN certbot certonly --webroot --webroot-path=/usr/share/nginx/html --agree-tos -m florijnmunster@outlook.com -d matchmakergroep3.nl

# Stage 2: Build frontend
FROM nginx:latest

# Copy SSL certificates from the Certbot stage
COPY --from=certbot /etc/letsencrypt /etc/letsencrypt

# Copy frontend files
COPY /app /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80
EXPOSE 443
