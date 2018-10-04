FROM node:8
WORKDIR /app
COPY . /app
CMD node dist/main.js
EXPOSE 3000
