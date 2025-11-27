#!/bin/sh
echo "Generating runtime env..."
envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js
exec "$@"
