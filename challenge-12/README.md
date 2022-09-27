## 💻 Run Locally

Go to the project folder whit

```
cd challenge-12
```

Run locally whit

```
npm run dev
```

## 📍 Endpoints

All the endpoints and estructure are detailed in the .REST file of the request folder. In the same way, I detail:

#### Login

- POST http://localhost:8080/api/auth/login
- DELETE http://localhost:8080/api/auth/logout
- GET http://localhost:8080/api/auth/prueba (test request whitout users loged)

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
