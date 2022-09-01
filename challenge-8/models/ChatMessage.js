class ChatMessage {
  constructor(id, userEmail, message, date) {
    this.id = id;
    this.userEmail = userEmail;
    this.message = message;
    this.date = new Date();
  }
}

module.exports = ChatMessage;
