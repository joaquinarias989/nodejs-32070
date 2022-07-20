class User {
  constructor(name, surname, books, pets) {
    this.name = name;
    this.surname = surname;
    this.books = books;
    this.pets = pets;
  }
  getFullName() {
    return `${this.name} ${this.surname}`;
  }
  getBooksNames() {
    return this.books.map((book) => book.title);
  }
  countPets() {
    return this.pets.length;
  }
  addPet(pet) {
    this.pets.push(pet);
  }
  addBook(title, author) {
    this.books.push({ title, author });
  }
}
const user1 = new User(
  "Joaquin",
  "Arias",
  [{ title: "22/11/63", author: "Stephen King" }],
  ["Perro"]
);

user1.addPet("Gato");
user1.addBook("Bestiario", "Cortazar");
user1.getFullName();
user1.countPets();
user1.getBooksNames();
