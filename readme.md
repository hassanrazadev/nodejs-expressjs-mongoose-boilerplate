# Node.js + Express Boilerplate with TypeScript, JWT Authentication, Mongoose, and ACL

## Table of Contents

- [Introduction](#introduction) 
- [Benefits](#benefits) 
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Installation Guide](#installation-guide)
- [Usage](#usage)

## Introduction

This template provides a robust starting point for building a Node.js application using Express and TypeScript. It includes JWT authentication and Access Control Lists (ACL) for role-based and resource-based permissions. This setup ensures secure, maintainable, and scalable applications.

## Benefits

- **Type Safety:** Leveraging TypeScript enhances code quality and developer productivity by providing static typing and advanced IDE support.
- **Security:** JWT authentication ensures secure access control.
- **Scalability:** ACLs allow for fine-grained access control, making the application scalable as new roles and permissions are added.
- **Maintainability:** A well-structured project layout and modular codebase enhance maintainability and ease of updates.

## Features

- **TypeScript:** Adds type safety and modern JavaScript features.
- **Express:** Minimalist web framework for building robust APIs.
- **JWT Authentication:** Secure token-based authentication.
- **ACL:** Fine-grained access control using express-acl.
- **Middleware:** Logger and error handler middlewares for improved debugging and error handling.
- **Environment Configuration:** Securely manage configuration settings with environment variables.

## Directory Structure
```
├── src
│   ├── config
│   │   └── db.ts
│   │   └── acl.json
│   ├── controllers
│   │   └── auth.controller.ts
│   │   └── user.controller.ts
│   ├── middlewares
│   │   ├── auth.middleware.ts
│   │   ├── errorHandler.ts
│   │   └── logger.middleware.ts
│   ├── models
│   │   └── user.model.ts
│   ├── routes
│   │   └── auth.route.ts
│   │   └── user.route.ts
│   ├── types
│   │   └── express
│   │       └── index.d.ts
│   └── index.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Installation Guide
### Prerequisites

- Node.js
- pnpm package manager
- MongoDB

### Steps

1. Clone the Repository
```shell
git clone https://github.com/hassanrazadev/nodejs-expressjs-mongoose-boilerplate.git
cd nodejs-expressjs-mongoose-boilerplate
```

2. Install Dependencies
```shell
pnpm install
```

3. Set Up Environment Variables
   - Copy .env.example to .env and replace environment variables 
```shell
cp .env.example .env
```

4. Run the Application
```shell
pnpm dev
```

## Usage

1. User Registration and Login
#### Register User
```shell
POST /api/auth/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "role": "user"
}
```

#### Login User
```shell
POST /api/auth/login
Content-Type: application/json

{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

2. Protected Routes
#### Access Protected Route
```shell
GET /api/users/profile
Authorization: Bearer <access_token>
```

3. ACL Configuration
#### Modify the `src/config/acl.json` file to set up your ACL rules. 

## License

*The MIT License (MIT)*

Copyright (c) 2024 Hassan Raza

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---
Made with ❤️ by [Hassan Raza]("https://hassanraza.net") (<info@hassanraza.net>)
