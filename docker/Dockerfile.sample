# Name the node stage "builder"
FROM node:alpine as builder
# set work directory
WORKDIR /app
# copy project
COPY package.json yarn.lock  /app/
# install node modules and build assets
RUN yarn install
COPY . /app

RUN yarn build

# nginx state for serving content
FROM nginx:stable-alpine
# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*
# Copy static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy config file from builder stage
COPY ./docker/configs/nginx.conf /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g","daemon off;"]