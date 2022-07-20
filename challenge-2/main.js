const Container = require("./Container");

const prod = new Container("./prueba.json");

// prod.save({ title: "Remera Ejemplo", price: 2200, quantity: 5 });
prod.getAll();
