FROM nginx:alpine

# Copy SPA build
COPY dist/ /usr/share/nginx/html

# Copy template ENV & entrypoint
COPY env.template.js /usr/share/nginx/html/
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Cấu hình SPA React Router
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { try_files $uri /index.html; } \
}' > /etc/nginx/conf.d/default.conf

# Entry point để inject ENV runtime
ENTRYPOINT ["/entrypoint.sh"]

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
