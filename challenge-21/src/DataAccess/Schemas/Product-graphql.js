const { buildSchema } = require('graphql');

const ProductSchema = buildSchema(`
type Product {
  id: ID!
  code: String,
  title: String,
  price: Decimal,
  description: String,
  urlImg: String,
  description: String,
  color: String,
  sizes: Array,
  stock: Array,
  quantities: Array,
  timestamp: String,
}
type Delete{
    delete: String
}
input InputProduct {
    nombre: String,
    precio: Decimal,
    foto: String,
}
type Query {
    GetAllProducts(title: String, price: Decimal, urlImg: String): [Product],
    GetProductById(id: String): Producto,
}
type Mutation {
    AddProduct(data: InputProduct): Product
    UpdateProduct(id: String, data: InputProduct): Product
    DeleteProduct(id: String): Delete
  }
`);

module.exports = ProductSchema;
