# Task-Management-App
Task Management App use for manage your daily task traking

# Installation
npm install

# Setup .env
PORT=3001
TOKEN_SECRET= secret

#LOCAL_URL
IP_URL_LOCAL = 'http://localhost:3001'

#DB
DB_HOST = 'host'
DB_NAME = 'task_management'
DB_USERNAME = 'root'
DB_PASSWORD = ''
DB_TIMEZONE = '+00:00'
DB_DIALECT = 'db Ex: 'mysql''

# Db setup
first setup the mysql workbanch and create new schema 'task_management'

run the command for create table
npm run migrate:up

# Start server
npm start

# Run the API on swagger
http://localhost:#port/docs
