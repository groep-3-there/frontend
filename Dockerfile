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
RUN mkdir /etc/letsencrypt/
RUN mkdir /etc/letsencrypt/live/
RUN mkdir /etc/letsencrypt/live/matchmakergroep3.nl/