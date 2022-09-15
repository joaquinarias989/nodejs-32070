const FirebaseContainer = require("../../containers/FirebaseContainer");

class ProductDAOFirebase extends FirebaseContainer {
  constructor() {
    super("products");
  }

  async save(obj) {
    try {
      const prod = {
        code: obj.code,
        title: obj.title,
        price: obj.price,
        description: obj.description,
        urlImg: obj.urlImg,
        stock: obj.stock,
        timestamp: new Date(),
      };

      await this.collectionName.add(prod);
      return prod;
    } catch (error) {
      console.log(error);
    }
  }
  async update(obj) {
    try {
      await this.collectionName.doc(obj.id).update({
        title: obj.title,
        price: obj.price,
        description: obj.description,
        urlImg: obj.urlImg,
        stock: obj.stock,
        timestamp: new Date(),
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const req = await this.collectionName.get();
      return req.empty
        ? null
        : req.docs.map((item) => {
            return {
              id: item.id,
              ...item.data(),
              timestamp: item.data().timestamp.toDate().toLocaleDateString(),
            };
          });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductDAOFirebase;
