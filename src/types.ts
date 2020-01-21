import { Book, Person, Author } from './intefaces';

export type BookOrUndefined = Book | undefined;
export type BookProperties = keyof Book;
export type PersonBook = Person & Book;
export type BookRequiredFields = Required<Book>;
export type UpdatedBook = Partial<Book>;
export type AuthorWoEmail = Omit<Author, 'email'>;
export type CreateCustomerFunctionType = (name: string, age?: number, city?: string) => void;