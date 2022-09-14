class FileSystemContainer {
  constructor(path) {
    this.path = path;
  }

  async getById(id) {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      const resp = json.find((item) => item.id === id);
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      const req = await this.getById(id);
      if (!req) return false;
      const newJson = json.filter((item) => item.id !== id);
      await fs.writeFile(this.path, JSON.stringify(newJson, null, 2));
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = FileSystemContainer;
