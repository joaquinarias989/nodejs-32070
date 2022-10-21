## 💻 Run Locally

Go to the project folder whit

```
cd challenge-15
```

Run locally (port 8080 by default)

```
npm run dev
```

For custom port

```
node index.js -p 5050
```

## 📍 Endpoints

All the endpoints and estructure are detailed in the .REST file of the request folder. In the same way, I detail:

### ENV

## Proyect info

- GET localhost:8080/api/env/info

### RANDOMS

- GET localhost:8080/api/randoms | get result of 100.000.000 randoms numbers

- GET localhost:8080/api/randoms?cant=50 | get result of 50 randoms numbers
