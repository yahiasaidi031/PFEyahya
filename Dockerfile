

FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm install --force
RUN ng build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist/front_app/browser /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
