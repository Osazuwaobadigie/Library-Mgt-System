// Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.borrowed = false; // Indicates if the book is borrowed
    }

    isBorrowed() {
        return this.borrowed;
    }
}

// User class
class User {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.borrowedBooks = []; // List of borrowed books
    }

    // Method to borrow a book
    borrowBook(book) {
        if (this.borrowedBooks.length >= 3) {
            console.log(`${this.name} has already borrowed the maximum number of books (3).`);
            return false;
        } else if (book.isBorrowed()) {
            console.log(`${book.title} is already borrowed.`);
            return false;
        } else {
            book.borrowed = true;
            this.borrowedBooks.push(book);
            console.log(`${this.name} borrowed ${book.title}.`);
            return true;
        }
    }

    // Method to return a book
    returnBook(isbn) {
        const bookIndex = this.borrowedBooks.findIndex(book => book.isbn === isbn);
        if (bookIndex === -1) {
            console.log(`${this.name} does not have a book with ISBN ${isbn}.`);
            return;
        }

        const book = this.borrowedBooks[bookIndex];
        book.borrowed = false;
        this.borrowedBooks.splice(bookIndex, 1);
        console.log(`${this.name} returned ${book.title}.`);
    }

    // Method to retrieve information about a book
    peekBook(isbn) {
        return this.borrowedBooks.find(book => book.isbn === isbn);
    }
}

// Library class
class Library {
    constructor() {
        this.books = []; // Collection of books
        this.members = []; // Collection of users
    }

    // Method to add a new book to the library
    addNewBook(book) {
        this.books.push(book);
        console.log(`Added ${book.title} by ${book.author} to the library.`);
    }

    // Method to register a new user
    registerMember(user) {
        this.members.push(user);
        console.log(`Registered new member: ${user.name}`);
    }

    // Method to borrow a book
    borrowBook(user, isbn) {
        const book = this.books.find(book => book.isbn === isbn);
        if (!book) {
            console.log(`Book with ISBN ${isbn} not found.`);
            return false;
        }
        return user.borrowBook(book);
    }

    // Method to return a book
    returnBook(user, isbn) {
        user.returnBook(isbn);
    }
}

// Example usage:

// Create a library
const library = new Library();

// Create some books
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "1234567890");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "0987654321");
const book3 = new Book("1984", "George Orwell", "1122334455");
const book4 = new Book("Moby Dick", "Herman Melville", "5566778899");

// Add books to the library
library.addNewBook(book1);
library.addNewBook(book2);
library.addNewBook(book3);
library.addNewBook(book4);

// Register a user
const user1 = new User("Alice", "U001");
library.registerMember(user1);

// User borrows some books
library.borrowBook(user1, "1234567890"); // Alice borrows The Great Gatsby
library.borrowBook(user1, "0987654321"); // Alice borrows To Kill a Mockingbird
library.borrowBook(user1, "1122334455"); // Alice borrows 1984

// User tries to borrow more than 3 books
library.borrowBook(user1, "5566778899"); // Should not be allowed

// User returns a book
library.returnBook(user1, "1234567890"); // Alice returns The Great Gatsby

// User borrows another book after returning one
library.borrowBook(user1, "5566778899"); // Alice borrows Moby Dick

// Retrieve information about a borrowed book
const borrowedBook = user1.peekBook("0987654321");
console.log(`Borrowed book details: Title: ${borrowedBook.title}, Author: ${borrowedBook.author}, ISBN: ${borrowedBook.isbn}`);
