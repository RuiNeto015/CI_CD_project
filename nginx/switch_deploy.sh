#!/bin/sh
value=`cat /etc/nginx/current_prod`

echo "Switching to $1"
sed -i "s/prod_[1-2]/$1/g" /etc/nginx/conf.d/default.conf
sed -i "s/prod_[1-2]/$1/g" /etc/nginx/nginx.conf
nginx -s reload