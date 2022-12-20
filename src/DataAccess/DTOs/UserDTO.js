class UserDTO {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.province = user.province;
    this.postalCode = user.postalCode;
    this.address = user.address;
    this.phone = user.phone;
    this.password = user.password;
    this.avatar = user.avatar;
  }
}

module.exports = UserDTO;
