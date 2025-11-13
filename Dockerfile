# Sử dụng Nginx làm web server
FROM nginx:alpine

# Copy toàn bộ folder dist/ vào thư mục web của Nginx
COPY dist/ /usr/share/nginx/html

# SPA React Router: reload trang không lỗi
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { try_files $uri /index.html; } \
}' > /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
