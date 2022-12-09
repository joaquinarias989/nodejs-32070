const {
  GetAllProducts,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} = require('../controllers/products-graphql.controller');
const ProdSchema = require('../../DataAccess/Schemas/Product-graphql');

ProdsRoot = {
  GetAllProducts,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
};

router = {
  schema: ProdSchema,
  rootValue: ProdsRoot,
  graphiql: true,
};

module.exports = router;
