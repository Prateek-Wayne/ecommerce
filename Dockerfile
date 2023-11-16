FROM node:21-alpine3.18
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3000
CMD npm start
# docker build -t ecommerce:0.0.1.RELEASE .
# docker container run -d -p 7000:7000 ecommerce:0.0.1.RELEASE
# docker container ls