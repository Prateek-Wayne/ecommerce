FROM node:21-alpine3.18
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3000
CMD node start
ENTRYPOINT [ "app" ]