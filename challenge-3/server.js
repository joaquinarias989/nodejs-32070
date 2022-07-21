const http = require("http");

const server = http.createServer((req, res) => {
  message = "";
  hourOfDay = new Date().getHours();
  message =
    hourOfDay > 6 && hourOfDay < 12
      ? "Good morning"
      : hourOfDay > 12 && hourOfDay < 19
      ? "Good afternoon"
      : "Good evening";
  res.end(`<h1>${message}</h1>`);
});
const port = 8080;
server.listen(port, () => {
  console.log(`Server running on port ${server.address().port}`);
});
