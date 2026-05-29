# Dockerized Todo Application (React + Node.js + MySQL + Drizzle ORM)

## Project Overview

This is a full-stack Todo application built using React for the frontend, Node.js (Express) for the backend, and MySQL as the database. The project uses Drizzle ORM for database operations and is fully containerized using Docker and Docker Compose.

The application allows users to create, view, and delete tasks through a REST API connected to a single-page frontend.

## Tech Stack

Frontend:
React, JavaScript, CSS

Backend:
Node.js, Express.js, Drizzle ORM

Database:
MySQL

DevOps:
Docker, Docker Compose

## Project Structure

to-do-task/
├── frontend
├── backend
├── docker-compose.yml
└── README.md

## Features

- Add new tasks
- View tasks
- Delete tasks
- REST API integration
- Persistent MySQL database
- Fully containerized setup

## Prerequisites

- Docker
- Docker Compose
- Git

## How to Run

### 1. Clone the repository
git clone https://github.com/Gayathma2003/todo-docker-app.git
cd todo-docker-app

### 2. Start the application
docker compose up --build

This will start:
- React frontend
- Node.js backend
- MySQL database

## Application URLs

Frontend:
http://localhost:5173

Backend API:
http://localhost:5002/tasks

## API Endpoints

GET /tasks
Fetch all tasks

POST /tasks
Create a new task

DELETE /tasks/:id
Delete a task

Request body for POST:
{
  "title": "Task title",
  "description": "Task description"
}

## Database Configuration

MySQL runs inside Docker.

Host: mysql
Port: 3306 (internal)
Database: todo_db
Username: root
Password: root

## Environment Variables (Backend)

PORT=5001
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=root
DB_NAME=todo_db
DB_PORT=3306

## Build Commands

Start project:
docker compose up --build

Stop project:
docker compose down

Reset everything:
docker compose down -v

## Notes

- Drizzle ORM handles database schema and queries
- Database is automatically created using db:push
- Backend communicates with MySQL inside Docker network
- Frontend communicates with backend via exposed ports

## Author
Gayathma Basnayake
Internship project demonstrating full-stack development using Dockerized environment.