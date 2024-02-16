# Docker file to automate the build and deployment of the application

# Step 1: Build the application
FROM node:16-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Step 2: Serve the application
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]