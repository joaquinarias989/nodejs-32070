## 🧐 Prerequisites

Before you start, you need to have the following things installed:

- FOREVER `npm i -g forever `
- PM2 `npm install -g pm2`

## 💻 Run Locally

Go to the project folder whit

```
cd challenge-15
```

### 📃 Commands

### \* Exercise 1

`node index -p 8080 -m FORK` <-!->
`node index -p 8080 -m CLUSTER`

### \* Exercise 2

Consume API Endpoint: <b>GET</b> `http://localhost:8080/api/env/info`

### \* Exercise 3

`npx nodemon index.js -p 8080 -m FORK`<br><br>
`npx nodemon index.js -p 8080 -m CLUSTER`

### \* Exercise 4

🧐 Remember install FOREVER package globally

`forever start index.js -p 8080 -m FORK`<br><br>
`forever list`
`forever stopall`<br><br>
`forever start index.js -p 8080 -m CLUSTER`<br><br>
`forever list`
`forever stopall`<br><br>

### \* Exercise 5

🧐 Remember install PM2 package globally

`pm2 start index.js --name="server" --watch -- --p 8080 --m FORK`<br/>

`pm2 start index.js --name="server" --watch -- --p 8080 --m CLUSTER`<br/>

`pm2 start index.js --name="server" --watch -i max -- --p 8080 --m FORK`<br/>

`pm2 list` `pm2 stop all` `pm2 delte all`

### \* Exercise 6

`pm2 start index.js --name="server" --watch -- --p 8080 --m FORK`

`pm2 start index.js --name="server" --watch -- --p 8081 --m CLUSTER`

### \* Exercise 7

```
pm2 start index.js --name="server" --watch -- --p 8080 --m FORK

pm2 start index.js --name="server2" --watch -i max -- --p 8082

pm2 start index.js --name="server3" --watch -i max -- --p 8083

pm2 start index.js --name="server4" --watch -i max -- --p 8084

pm2 start index.js --name="server5" --watch -i max -- --p 8085
```
