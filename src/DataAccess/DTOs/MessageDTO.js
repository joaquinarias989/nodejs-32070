class MessageDTO {
  constructor(msg) {
    this.authorType = msg.authorType;
    this.email = msg.email;
    this.body = msg.body;
    this.timestamp = msg.timestamp;
  }
}

module.exports = MessageDTO;
