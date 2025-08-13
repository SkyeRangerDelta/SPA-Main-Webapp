#!/bin/sh
: "${API_PORT:=4100}"
: "${API_HOST:=host.docker.internal}"
envsubst '$API_HOST $API_PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
exec nginx -g 'daemon off;'
