#!/bin/sh

echo "Waitin for mysql to start..."

sed -i "s/ddd_forum_mysql/$1/g" ./.env

while ! nc -z $1 3306; do
  sleep 10
done

echo "MySQL started"

while ! nc -z ddd_forum_redis 6379; do
  sleep 10
done
 
echo "REDIS started"

if [ "$2" = "dev" ]; then
  npm run db:create:dev
  npm run migrate:dev
  npm run start:both
else
  npm run start:prod
fi

