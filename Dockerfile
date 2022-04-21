FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Copy all files from current directory to working dir in image
COPY . .

# install node modules and build assets
RUN yarn install && yarn build

# nginx state for serving content
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Add bash
RUN apk add --no-cache bash

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /app/build .

# Containers run nginx with global directives and daemon off
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]



