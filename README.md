
# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, follow these steps:

### Prerequisites

- Node.js installed on your machine
- PostgreSQL installed on your machine
- Yarn package manager (optional, but recommended)
- db-migrate from npm for migrations installed globally

```bash
yarn global add db-migrate
```

Or, if you are using npm:

```bash
npm install -g db-migrate
```




### Package Installation

Run the following command in your terminal at the project root to install all necessary dependencies:

```bash
yarn
```

Or, if you prefer npm:

```bash
npm install
```

### Database Setup and Connection



1. **Environment Variables**: Copy the `.env.example` file to a new file named `.env` and fill in the database connection details:

```plaintext
POSTGRES_HOST=localhost
POSTGRES_DB=your_database_name
POSTGRES_USER=your_postgres_username
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_TEST_DB=your_test_database_name
ENV=dev
PORT=3000
TOKEN_SECRET=your_secret
BCRYPT_PASSWORD=your_password
SALT_ROUNDS=10
```
1. **Database Connection**: Ensure you have PostgreSQL installed on your machine and set the connection details in the `.env` file and the database name that will be created `POSTGRES_TEST_DB`
2. **Creating the database.json File**: To execute migrations, you need to create a database.json file in the root of your project. This file should contain the configuration for your development and test databases. Here is an example configuration:

```json
{
  "dev": {
    "driver": "pg",
    "user": "your_postgres_username",
    "password": "your_postgres_password",
    "host": "localhost",
    "database": "your_database_name",
  },
  "test": {
    "driver": "pg",
    "user": "your_postgres_username",
    "password": "your_postgres_password",
    "host": "localhost",
    "database": "your_test_database_name",
  }
}
```
2. **Prepare Database and Migrations**: to create the database and migrations, run the following command:
mnbv vc 
```bash
yarn migrate
```

Or, if you are using npm:

```bash
npm run migrate
```


database will be created with the name as the one you set in env file and the migrations will be run to create the tables.


### Running the Application

- **Start the Backend Server**: To start the server, run:

```bash
yarn start
```

Or, if you are using npm:

```bash
npm start
```

The backend server will start on `http://localhost:3000`. You can change the default port by setting the `PORT` variable in your `.env` file.

### Ports

- The backend server runs on port `3000` by default.
- PostgreSQL runs on its default port `5432`.

### Testing

To run the tests, ensure you have set `POSTGRES_TEST_DB` in your `.env` file, and then run:

```bash
yarn test
```

Or, if you are using npm:

```bash
npm test
```

this will prepare a separate test database, run the migrations and run the tests.

