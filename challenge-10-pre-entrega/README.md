## 💻 Run Locally

Go to the project folder whit

```
cd challenge-10-pre-entrega
```

Run locally whit

```
npm run dev
```

## 🚩 Use

🧐 By default, the persistence of data is in FileSystem. To change abd consume the different databases, you must comment and uncomment the first lines as required.

- If you want to test the <b>PRODUCTS</b> in MongoDB (for example), go to the <b><em>products.controller.js</em></b> and comment on the FileSystem Container line and uncomment the Mongo Container line.
- If you want to test the <b>CART</b> in MongoDB (for example), go to the <b><em>cart.controller.js</em></b> and comment on the 2 FileSystem Container lines and uncomment the 2 Mongo Container lines (for products & cart).

## 📍 Endpoints

All the endpoints and estructure are detailed in the .REST file of the request folder. In the same way, I detail:

#### Login

- POST http://localhost:8080/api/auth/login

### Products

- GET http://localhost:8080/api/products
- POST http://localhost:8080/api/products/3
- POST http://localhost:8080/api/products
- PUT http://localhost:8080/api/products/3
- DELETE http://localhost:8080/api/products/4

### Cart

- GET http://localhost:8080/api/cart/1/products
- POST http://localhost:8080/api/cart/
- POST http://localhost:8080/api/cart/1/products
- DELETE http://localhost:8080/api/cart/1/
- DELETE http://localhost:8080/api/cart/1/products/1
