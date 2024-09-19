

# Étape de construction
FROM node:18 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g @angular/cli
RUN npm install --force
COPY . .
RUN ng build --prod

# Étape de production
FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist/front_app/browser /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
