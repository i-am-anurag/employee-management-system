# Employee Management System

## Overview

The Employee Management System is a Node.js application designed to manage employees and departments using Sequelize with MySQL. It provides endpoints for CRUD operations on employees and departments, as well as endpoints to retrieve the highest salary and the youngest employee by department.

## Setup

### Prerequisites

- Node.js (>= 18.x)
- MySQL

### Project setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/i-am-anurag/employee-management-system.git
   cd employee-management-system

2. **Install dependency:**
  ```
  npm install
  ```

3. **Create a .env file in the root directory with the following content:**
PORT = 3000
APP_URL = localhost:3000/

4. **Inside the src/config folder create a new file config.json and then add the following piece of json**

```
{
  "development": {
    "username": <YOUR_DB_USER_NAME>,
    "password": <YOUR_DB_PASSWORD>,
    "database": "employee_management_system_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```

5. **Once you've added your db config as listed above, go to the src folder from your terminal and execute followning commands one by one**
- npx sequelize db:create
- npx sequelize db:migrate

6. **Once setup is done, start the project with this command:**
  ```
  npm start
  ```

## API Endpoints

### Employee Endpoints

**Create Employee**

- **POST** `/api/employee/create`
- Request body:
  ```json
  {
    "department_id": "string",
    "name": "string",
    "dob": "date",
    "email": "string",
    "salary": "string",
    "phone": "string",
    "photo": "string",
    "status": "boolean"
  }
  ```

**Update Employee**
- **PUT** `/api/employee/update/:empId`
- URL Parameters: empId (Employee ID)
- Request body:
```json
{
  "department_id": "number",
  "name": "string",
  "dob": "date",
  "email": "string",
  "salary": "number",
  "phone": "string",
  "photo": "string",
  "status": "boolean"
}
```

**Get All Employees**

- **GET** `/api/employee/`
- Query Parameters: 
  - `page`: Number (optional, default: 1)
  - `pageSize`: Number (optional, default: 10)
  - `name`: String (optional)
  - `minSalary`: Number (optional)
  - `maxSalary`: Number (optional)
  - `email`: String (optional)

**Get Employee by Department-wise Highest Salary**

- **GET** /api/department/highest-salary

**Get Youngest Employee in Department**

- **GET** /api/department/youngest-employee

**Delete Employee**
- **DELETE** /api/employee/:empId
- URL Parameters: empId (Employee ID)

#### Department Endpoints

**Create Department**

- **POST** /api/department/create
- Request body:
```json
{
  
  "name": "string",
}
```

**Update Department**

- **PUT** /api/department/update/:dptId
- URL Parameters: dptId (Department ID)
- Request body:
```json
{
  "name": "string",
  "status": "boolean"
}
```

**Get All Departments**

- **GET** /api/department
- - Query Parameters: 
  - `page`: Number (optional, default: 1)
  - `pageSize`: Number (optional, default: 10)
  - `name`: String (optional)
  - `status`: Boolean (optional)

**Delete Department**
- **DELETE** /api/department/:dptId
URL Parameters: dptId (Department ID)