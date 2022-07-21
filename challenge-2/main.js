const Container = require("./Container");

const prods = new Container("./products.txt");

prods
  .save({ title: "Producto de Ejemplo", price: 5300, stock: 2 })
  .then((id) => console.log(id));

// prods.getById(3).then((data) => console.log(data));
// prods.getAll().then((data) => console.log(data));
// prods.deleteById(1);
// prods.deleteAll().then(() => console.log("Productos eliminados"));
