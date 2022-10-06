class ServiceResponse {
  constructor(data, success, message) {
    this.data = data;
    this.success = true;
    this.message = "";
  }
}

module.exports = ServiceResponse;
