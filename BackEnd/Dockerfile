FROM node:21
LABEL authors="geek2tech"
LABEL description="This is the backend image for the project Vparrot"
LABEL version="1.2.0"
LABEL maintainer="geek2tech"
LABEL name="API-Vparrot"

WORKDIR /app
COPY ../BackEnd/.. .


RUN rm -rf node_modules
RUN rm package-lock.json
#RUN apt install build-essential
RUN npm install bcrypt
RUN npm install

EXPOSE 8081
CMD ["node", "server.js"]
