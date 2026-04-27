FROM nginx:alpine

# Borramos la configuración por defecto de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiamos TU archivo de configuración (el de la imagen)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos el código del frontend (html, css, js)
COPY . /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]