FROM nginx:alpine
ADD docker-config/nginx-root.conf /etc/nginx/nginx.conf
ADD docker-config/nginx.conf /etc/nginx/conf.d/app.conf
ADD dist/index.html /usr/share/nginx/html/index.html
ADD dist/assets /usr/share/nginx/html/assets