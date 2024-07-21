# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
    - /products
- Show
  - /products/:id
- Create (body: name) [token required]
  - /products
  - Example body:
    ```json
    {
      "name": "product name",
      "price": 100
    }
    ```


#### Users
- Index [token required]
  - /users
- Show [token required]
  - /users/:id
- Create [no token required]
  - /users
  - Example body:
    ```json
    {
      "firstName": "first name",
      "lastName": "last name",
      "password": "password"
    }
    ```

#### Orders
- Current Order by user (args: user_id) [token required]
  - /orders/user/:user_id
- create Order (body: user_id, product_id, quantity)[token required]
  - /orders
  - Example body:
    ```json
    {
      "user_id": 1,
      "product_id": 1,
      "quantity": 1
    }
    ```

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

