FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

# Use a base image with NGINX and Certbot
FROM nginx:latest as production-stage

RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports for HTTP and HTTPS
EXPOSE 80
EXPOSE 443

# Install Certbot dependencies
RUN apt-get update && \
    apt-get install -y certbot python3-certbot-nginx

# Set up a volume for Certbot data
VOLUME /etc/letsencrypt

# Command to start NGINX
CMD ["nginx", "-g", "daemon off;"]
