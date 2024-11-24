## Project Overview

This project is a robust API built using **Express**, **TypeScript**, **Prisma**, and **Winston** for logging. It provides functionalities for generating and validating unique, time-bound discount coupons associated with specific products. The API is secured with custom JWT authentication and includes comprehensive error handling.

## Features

- **Coupon Generation**:

  - Generate unique discount coupons for products with specified expiration dates.
  - Each coupon is associated with a product and a user, ensuring that it can only be used by the intended recipient.

- **Coupon Validation**:

  - Validate coupons based on their unique code, ensuring they are active and not expired.
  - Coupons can be marked as used once validated, preventing reuse.

- **User Management**:

  - Users can register and authenticate using JWT for secure access to the API.
  - User credentials are securely hashed using bcrypt before storage.

- **Logging**:

  - Integrated logging using **Winston** to track API requests, errors, and other significant events in the application.
  - Logs are stored in a structured format, making it easier to monitor application behavior and troubleshoot issues.

- **Error Handling**:

  - Comprehensive error handling for various scenarios such as invalid coupon codes, expired coupons, and unauthorized access.
  - Returns appropriate HTTP status codes and messages to guide users in resolving issues.

- **Database Management**:
  - Utilizes **Prisma** as an ORM to interact with a PostgreSQL database, simplifying database operations and migrations.
  - The database schema includes models for users, products, and coupons, establishing clear relationships between them.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js to create RESTful APIs.
- **TypeScript**: Superset of JavaScript that adds static types.
- **Prisma**: Next-generation ORM for database management.
- **PostgreSQL**: Relational database used to store user and coupon data.
- **Winston**: Logging library for Node.js to manage application logs.
- **JWT (JSON Web Tokens)**: For secure user authentication.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- Docker installed to run PostgreSQL in a container.

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/discount-coupon-api.git
   cd discount-coupon-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your database credentials and JWT secret.

4. **Run PostgreSQL using Docker**:
   Create a `docker-compose.yml` file in the root directory with the following content:

   ```yaml
   version: '3.8'
   services:
     db:
       image: postgres:latest
       restart: always
       environment:
         POSTGRES_USER: your_db_user
         POSTGRES_PASSWORD: your_db_password
         POSTGRES_DB: your_db_name
       ports:
         - '5432:5432'
       volumes:
         - pgdata:/var/lib/postgresql/data

   volumes:
     pgdata:
   ```

   Run the following command to start the PostgreSQL server:

   ```bash
   docker-compose up -d
   ```

5. **Seed the database**:
   Execute the following command to seed your database with initial data:

   ```bash
   npm run seed
   ```

6. **Run the application in development mode**:
   ```bash
   npm run dev
   ```

## API Endpoints

### Sign Up A User

- **Endpoint**: `POST /api/auth/signup`
- **Request Body**:
  ```json
  {
    "name": "admin",
    "email": "admin@gmail.com",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User created"
  }
  ```

### User Login

- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "admin@gmail.com",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "data": {
      "email": "admin@gmail.com",
      "name": "Admin",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtM3Z5YzlkajAwMDAxMXMzMmo4NGs1aXIiLCJpYXQiOjE3MzI0NzQxNDIsImV4cCI6MTczMjQ3Nzc0Mn0.QHlKHqHqC9HbDDtes2wD3zyCCSaQsj2KD1MbRAS8Em8"
    }
  }
  ```

### Generate Coupon

- **Endpoint**: `POST /api/coupon/generate`
- **Request Header**:

```
Auth Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtM3ZzeDJ4dzAwMDExMGJoN2ZwMWczeWIiLCJpYXQiOjE3MzI0NjUwMjYsImV4cCI6MTczMjQ2ODYyNn0.LBIclB56j34LYcgcIv6jSigs7HPaW3_7TetLPCXyPUc
```

- **Request Body**:
  ```json
  {
    "discountVal": 100.0,
    "productId": "cm3vsixz80000a3vs6elvncss"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Coupon generated",
    "data": {
      "couponId": "COUPON-10004869"
    }
  }
  ```

### Validate Coupon

- **Endpoint**: `POST /api/coupon/validate`
- **Request Header**:

```
Auth Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtM3ZzeDJ4dzAwMDExMGJoN2ZwMWczeWIiLCJpYXQiOjE3MzI0NjUwMjYsImV4cCI6MTczMjQ2ODYyNn0.LBIclB56j34LYcgcIv6jSigs7HPaW3_7TetLPCXyPUc
```

- **Request Body**:
  ```json
  {
    "couponId": "COUPON-10004869"
  }
  ```
- **Response on Success**:

  ```json
  {
    "message": "Coupon is valid",
    "data": {
      "couponId": "COUPON-10004869",
      "discountValue": 100,
      "expirationDate": "2024-12-01T16:21:10.741Z",
      "status": "ACTIVE",
      "productId": "cm3vsixz80000a3vs6elvncss"
    }
  }
  ```

- **Response on Error** (e.g., invalid or expired coupon):
  ```json
  {
    "error": "Invalid or expired coupon."
  }
  ```

## Contributing

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests to enhance functionality or fix any issues.
