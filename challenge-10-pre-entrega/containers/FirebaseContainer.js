const { db } = require("../db/Firebase/config");

class FirebaseContainer {
  constructor(collectionName) {
    this.collectionName = db.collection(collectionName);
  }

  async getById(id) {
    try {
      const doc = await this.collectionName.doc(id).get();
      if (!doc.exists) return null;
      return {
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate().toLocaleDateString(),
      };
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      const doc = await this.collectionName.doc(id).get();
      if (!doc.exists) return false;
      await doc.ref.delete();
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = FirebaseContainer;
