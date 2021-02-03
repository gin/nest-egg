import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mock';

@Injectable()
export class BooksService {
    books = BOOKS;

    getBooks(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.books);
        });
    }

    getBook(bookID): Promise<any> {
        let id = Number(bookID);
        return new Promise(resolve => {
            const book = this.books.find(book => book.id === id);
            if (!book) {
                throw new HttpException('Book does not exist!', 404);
            }
            resolve(book);
        });
    }

    // book object has to have the format:
    //     { id: 1, title: 'First book', description: "This is the description for the first book", author: 'Olususi Oluyemi' },
    addBook(book): Promise<any> {
        // Don't add data without ID
        if (book.id == null) {
            throw new HttpException('Require ID field in data', 400);
        }

        // Don't add data if ID already exists
        const idExists = this.books.find(b => b.id == book.id);
        if (idExists) {
            throw new HttpException('ID already exists', 400);
        }

        return new Promise(resolve => {
            book.id = Number(book.id);
            this.books.push(book);
            resolve(this.books);
        });
    }

    deleteBook(bookID): Promise<any> {
        let id = Number(bookID);
        return new Promise(resolve => {
            let index = this.books.findIndex(book => book.id === id);
            if (index === -1) {
                throw new HttpException('Book does not exist!', 404);
            }
            this.books.splice(1, index);    // TODO: Try with another delete method later.
            resolve(this.books);
        });
    }
}
