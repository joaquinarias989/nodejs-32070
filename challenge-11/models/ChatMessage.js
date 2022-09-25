class ChatMessage {
  constructor(author, message, date) {
    this.author = {
      id: author.id,
      name: author.name,
      surname: author.surname,
      age: author.age,
      nickname: author.nickname,
      avatar: author.avatar,
    };
    this.message = message;
    this.date = new Date();
  }
}

module.exports = ChatMessage;
