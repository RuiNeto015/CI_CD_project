FROM node:12.22.12

WORKDIR /usr/src/ddd

RUN echo "deb http://archive.debian.org/debian stretch main" > /etc/apt/sources.list

RUN python --version

RUN apt-get update && apt-get install -y netcat

ENV path /usr/src/ddd/node_modules/.bin:$PATH

COPY . /usr/src/ddd

RUN cp .env.docker-compose .env

RUN npm i -g dotenv-cli
RUN npm i

RUN cd public/app && npm i

RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
CMD ["ddd_forum_mysql", "dev"]