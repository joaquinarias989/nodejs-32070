class ServiceResponse {
  constructor(data = null, success = true, status = 200, message = '') {
    this.data = data;
    this.success = success;
    this.status = status;
    this.message = message;
  }
}

module.exports = ServiceResponse;
