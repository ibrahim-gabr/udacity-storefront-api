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
#### Products
- `id`: Primary key, auto-increments.
- `name`: String, name of the product.
- `price`: Numeric, price of the product.

#### Users
- `id`: Primary key, auto-increments.
- `firstName`: String, first name of the user.
- `lastName`: String, last name of the user.
- `password`: String, hashed password of the user.

#### Orders
- `id`: Primary key, auto-increments.
- `user_id`: Foreign key, references `Users(id)`.
- `status`: String, status of the order (active or complete).

#### Order_Products (Auxiliary Table)
This table establishes a many-to-many relationship between `Products` and `Orders`. It contains the following columns:
- `order_id`: Foreign key, references `Orders(id)`.
- `product_id`: Foreign key, references `Products(id)`.
- `quantity`: Integer, quantity of each product in the order.

### Relationships
- Each `Order` can contain multiple `Products`, and each `Product` can be part of multiple `Orders`. This many-to-many relationship is facilitated by the `Order_Products` table.
- The `user_id` in the `Orders` table establishes a one-to-many relationship with the `Users` table, where each `User` can have multiple `Orders`.