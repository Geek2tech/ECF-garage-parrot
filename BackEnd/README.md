# Garage Vincent Parrot BackEnd

Used tech:

Node.Js and Express

Used packages and dependencies :
```bash
    "bcrypt": "^5.1.1"
    "body-parser": "^1.20.2"
    "cors": "^2.8.5"
    "dotenv": "^16.3.1"
    "express": "^4.18.2"
    "generate-password": "^1.7.0"
    "helmet": "^7.0.0"
    "jsonwebtoken": "^9.0.2"
    "multer": "^1.4.5-lts.1"
    "mysql": "^2.18.1"
    "nanoid": "^3.3.6"
    "nodemailer": "^6.9.5"
    "uuid": "^9.0.1"
    "winston": "^3.11.0"
    "winston-daily-rotate-file":"^4.7.1"
````

## Local installation

First clone the repo

while the repos was cloned , go to BackEnd directory and run the installation of dependencies


```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```
For my part during the development I used npm

## Setup .env file

To make the BackEnd functional you need to create an .env file with :
```bash
# BACKEND
# APP
APP_PORT="Port you want to use"
APP_APIKEY="API key of your choice to access to api endpoint"
APP_SECRET_KEY="Secret of your choice to crypt password in database"
NODE_ENV="dev for development or production for production"
APP_URL="BackEnd URl if your start localy it's http://localhost:8081 port depending of APP_PORT"
APP_AUTHORIZED_URL1=" Insert the FrontEnd URL if you use FrontEnd locally with nuxt default properties  it's http://localhost:3000"
APP_AUTHORIZED_URL2="Insert authorization for another URL if needed"
# Base de données

APP_DBHOST="Insert DNS name or IP of database server"
APP_DBUSER="Insert database user who have right on the database"
APP_DBPASSWORD="Insert User password"
APP_DB="Insert database name"

# Serveur SMTP

APP_SMTPSERVER="Insert adress of smtp server"
APP_SMTPPORT="Insert smtp server port"
APP_SMTPUSER="Insert Smtp User"
APP_SMTPPASSWORD="Insert smtp user password"
APP_SMTPSECURE="Insert true of false depending of your smtp server ( true is better ) "
```

## Create database

Before use Backend you have to setup the database.

First create on mysql or mariaDB server ( I used MariaDB for development so MariaDB is recommended ) the database ( with the name you've inserted in APP_DB) and add all privileges on it the user
you used to fill APP_DBUSER in .env , the same for the password .

When the database is up , run the SQL script : database_parrot.sql that you can find in BackEnd databases folder. Be sure to use an user with all privileges on this database when you run the script to create a trigger
see Mysql or MariaDB documentation for more information.

At this point you have an empty database , so if you want to have some test data you can run fixture.sql script ,it  add some stuff like constructor , towing mode etc

## Development Server

I recommend to install nodemon ( npm install nodemon) to have automatique restart when you modify anything ( except .env ) in the BackEnd file

Start the development server :

```bash
node server.js or nodemon server.js
```
