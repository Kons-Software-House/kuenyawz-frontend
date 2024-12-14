# Build Stage
FROM node:20-alpine AS build_image
WORKDIR /kuenyawz-frontend/source

# Copy only necessary files for installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the project
RUN npm run build

# Production Stage
FROM nginx:1.26.2-alpine AS production_image
WORKDIR /usr/share/nginx/html

# Copy the built files to Nginx's serving directory
RUN rm -rf ./*

COPY --from=build_image /kuenyawz-frontend/source/dist .

COPY nginx.conf /etc/nginx/nginx.conf

# Add environment script
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

ENTRYPOINT ["nginx", "-g", "daemon off;"]