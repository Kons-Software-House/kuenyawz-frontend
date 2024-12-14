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

# Copy the built files to Nginx's serving directory
COPY --from=build_image /kuenyawz-frontend/source/dist /usr/share/nginx/html

# Add environment script
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh