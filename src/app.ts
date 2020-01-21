import { Book, Author, Librarian, Logger, Magazine } from './intefaces';
import { ReferenceItem, UniversityLibrarian, RefBook, Reader, Shelf } from './classes';
import { Category } from './enums';

import {
  PersonBook,
  BookRequiredFields,
  UpdatedBook,
  CreateCustomerFunctionType
} from './types';

import {
  logFirstAvailable,
  getAllBooks,
  getBookTitlesByCategory,
  logBookTitles,
  getBookAuthorByIndex,
  getBookByID,
  createCustomerID,
  createCustomer,
  сheckoutBooks,
  getTitles,
  bookTitleTransform,
  printBook,
  f,
  getBookProp,
  purge,
  getBooksByCategory,
  logCategorySearch,
  getBooksByCategoryPromise,
  logSearchResults,
} from './functions';
import Encyclopedia from './classes/encyclopedia';

import('./classes').then(module => {
  const reader = new module.Reader();
  reader.name = 'Ann';
  reader.take(getAllBooks()[0]);
  console.log(reader);
});

const showHello = (divName: string, name: string) => {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
};

showHello('greeting', 'TypeScript');
logFirstAvailable(getAllBooks());

const titles = getBookTitlesByCategory(Category.JavaScript);
logBookTitles(titles);

const titleAndAuthor = getBookAuthorByIndex(2);
console.log(titleAndAuthor);
console.log(getBookByID(1));

const myID: string = createCustomerID('Ann', 10);

console.log(myID);

let idGenerator: (name: string, id: number) => string = (name: string, id: number) => `${id} ${name}`;
idGenerator = createCustomerID;

console.log(idGenerator('Boris', 2));

createCustomer('Ann');
createCustomer('Ann', 20);
createCustomer('Ann', 20, 'Kharkov');

console.log(getBookTitlesByCategory());
console.log(logFirstAvailable());

const myBooks: string[] = сheckoutBooks('Ann', 1, 2, 4);
console.log(myBooks);

const checkedOutBooks = getTitles(false);
console.log(checkedOutBooks);
console.log(bookTitleTransform('TypeScript'));

const myBook: Book = {
  id: 5,
  title: 'Colors, Backgrounds, and Gradients',
  author: 'Eric A. Meyer',
  available: true,
  category: Category.CSS,
  // year: 2015,
  // copies: 3,
  pages: 200,
  markDamaged: (reason: string) => console.log(`Damaged: ${reason}`),
};

printBook(myBook);
myBook.markDamaged('missing back cover');

const logDamage: Logger = f;
logDamage('missing back cover');

const favoriteAuthor: Author = {
  name: 'Anna',
  email: 'anna@mail.com',
  numBooksPublished: 5,
};

const favoriteLibrarian: Librarian = {
  name: 'Anna',
  email: 'anna@mail.com',
  department: 'main',
  assistCustomer: (name: string) => console.log(`Assist: ${name}`),
};

const offer: any = {
  book: {
    title: 'Essential TypeScript'
  }
};

console.log(offer?.magazine);
console.log(getBookProp(myBook, 'title'));
console.log(getBookProp(myBook, 'markDamaged'));
// console.log(getBookProp(myBook, 'isbn'));

// 05. Classes
// Task 05.01. Creating and Using Classes
// const ref = new ReferenceItem('Our new title', 2020);

// ref.printItem();
// ref.publisher = 'Random Publisher';
// console.log(ref.publisher);

// Task 05.02. Extending Classes
// Task 05.03. Creating Abstract Classes

const refBook: RefBook = new RefBook('Title', 2020, 3);
refBook.printItem();
console.log(refBook);
refBook.printCitation();

const anotherFavoriteLibrarian: Librarian = new UniversityLibrarian();
anotherFavoriteLibrarian.name = 'Anna';
anotherFavoriteLibrarian.assistCustomer('Boris');

const personBook: PersonBook = {
  name: 'Anna',
  email: 'anna@email.com',
  id: 5,
  title: 'Intersection and Union Types',
  author: 'unknown',
  available: true,
  category: Category.TypeScript
};

console.log(personBook);

const inventory: Array<Book> = [
  { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
  { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
  { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
  { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];

// console.log(purge(inventory));

// const resultNumArr = purge<number>([1, 2, 3, 4, 5]);

// console.log(resultNumArr);

const bookShelf: Shelf<Book> = new Shelf<Book>();
bookShelf.add(...inventory);
const shelfBook = bookShelf.getFirst();

console.log(shelfBook);

const magazines: Array<Magazine> = [
  { title: 'Programming Language Monthly', publisher: 'Code Mags' },
  { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
  { title: 'Five Points', publisher: 'GSU' }
];

const magazineShelf: Shelf<Magazine> = new Shelf<Magazine>();
magazineShelf.add(...magazines);
const shelfMagazine = magazineShelf.getFirst();

console.log(shelfMagazine);

magazineShelf.printTitles();
const fivePoints = magazineShelf.find('Five Points');

console.log(fivePoints);

const book: BookRequiredFields = {
  id: 1,
  title: 'Book Title',
  author: 'Anna',
  available: false,
  category: Category.Angular,
  pages: 250,
  markDamaged: null,
};

const updatedBook: UpdatedBook = {
  id: 1,
  title: 'Book Title',
};

const params: Parameters<CreateCustomerFunctionType> = ['Anna'];
createCustomer(...params);

const universityLibrarian = new UniversityLibrarian();
const fLibrarian = new UniversityLibrarian();

fLibrarian.name = 'Anna';

fLibrarian['printLibrarian']();

const fLibrarianWMethod = new UniversityLibrarian();

fLibrarianWMethod.assistFaculty = null;
// fLibrarianWMethod.teachCommunity = null;

const enc = new Encyclopedia('The best Encyclopedia', 2020, 1);
enc.printItem();

const nextLibrarian = new UniversityLibrarian();
nextLibrarian.name = 'John';
nextLibrarian.assistCustomer('Sue');

console.log(nextLibrarian.name);

enc.copies = 10;
// enc.copies = -10;

console.log(enc);

// console.log('Begin');
// getBooksByCategory(Category.JavaScript, logCategorySearch);
// getBooksByCategory(Category.Software, logCategorySearch);
// console.log('End');

// console.log('Begin');
// getBooksByCategoryPromise(Category.JavaScript)
//   .then(titles => {
//     console.log(titles);
//     return titles.length;
//   })
//   .then(num => console.log(num))
//   .catch(reason => console.log(reason));
// console.log('End');


console.log('Begin');
logSearchResults(Category.JavaScript)
  .catch(reason => console.log(reason));
console.log('End');

console.log('Begin');
logSearchResults(Category.Software)
  .catch(reason => console.log(reason));
console.log('End');