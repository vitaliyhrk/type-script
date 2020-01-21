import { Book, LibMgrCallback } from './intefaces';
import { Category } from './enums';
import { BookOrUndefined, BookProperties } from './types';

export const getAllBooks = (): ReadonlyArray<Book> => {
    const books: readonly Book[] = <const>[
        {
            id: 1,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true,
            category: Category.JavaScript,
        }, {
            id: 2,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            available: false,
            category: Category.JavaScript,
        }, {
            id: 3,
            title: 'CSS Secrets',
            author: 'Lea Verou',
            available: true,
            category: Category.CSS
        }, {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
            category: Category.JavaScript
        }
    ];

    return books;
};

export const logFirstAvailable = (books: readonly any[] = getAllBooks()): void => {
    const numOfBooks: number = books.length;
    const firstAvailableBookTitle: string = books.find(book => book.available).title;

    console.log(`Total number of books: ${numOfBooks}`);
    console.log(`First available book is: ${firstAvailableBookTitle}`);
};

export const getBookTitlesByCategory = (category: Category = Category.JavaScript): Array<string> => {
    const books = getAllBooks();
    console.log(`Getting books in category: ${Category[category]}`);
    const titles: Array<string> = books
        .filter(book => book.category === category)
        .map(book => book.title);
    return titles;
};

export const logBookTitles = (titles: Array<string>): void => titles.forEach((title: string) => console.log(title));

export const getBookAuthorByIndex = (index: number): [string, string] => {
    const { title, author } = getAllBooks()[index];
    return [title, author];
};

export const getBookByID = (id: number): BookOrUndefined => getAllBooks().find(book => book.id === id);

export const createCustomerID = (name: string, id: number): string => `${id} ${name}`;

export const createCustomer = (name: string, age?: number, city?: string): void => {
    console.log(`Customer name: ${name}`);

    if (age) {
        console.log(`Customer age: ${age}`);
    }

    if (city) {
        console.log(`Customer city: ${city}`);
    }
};

export const сheckoutBooks = (customer: string, ...bookIDs: number[]): string[] => {
    console.log(`Customer name: ${customer}`);

    const titles: string[] = [];

    for (const id of bookIDs) {
        const book = getBookByID(id);
        if (book && book.available) {
            titles.push(book.title);
        }
    }

    return titles;
};

export function getTitles(author: string): [];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: string[] | boolean[] | [number, boolean]): string[] {
    const books = getAllBooks();

    if (args.length === 0) {
        return [];
    } else if (args.length === 1) {
        const arg = args[0];
        if (typeof arg === 'string') {
            return books
                .filter(book => book.author === arg)
                .map(book => book.title);
        } else if (typeof arg === 'boolean') {
            return books
                .filter(book => book.available === arg)
                .map(book => book.title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;
        if (typeof id === 'number' && typeof id === 'boolean') {
            return books
                .filter(book => book.id === id && book.available === available)
                .map(book => book.title);
        }
    }
}

export const getBookProp = (book: Book, prop: BookProperties): any => {
    if (typeof book[prop] === 'function') {
        return (book[prop] as Function).name;
    }
    return book[prop];
};

// export const calcTotalPages = (): bigint => {
//   const libraries = <const>[
//     {
//       lib: 'libName1',
//       books: 1_000_000_000,
//       avgPagesPerBook: 250,
//     }, {
//       lib: 'libName2',
//       books: 5_000_000_000,
//       avgPagesPerBook: 300,
//     }, {
//       lib: 'libName3',
//       books: 3_000_000_000,
//       avgPagesPerBook: 280,
//     }
//   ];

//   const result = libraries.reduce((acc: bigint, library: any) => {
//     return acc + BigInt(library.books * library.avgPagesPerBook);
//   }, 0n);

//   return result;
// };

export const bookTitleTransform = (title: any): string => {
    assertStringValue(title);
    return [...title].reverse().join('');
};

export const printBook = (book: Book): void => console.log(`${book.title} by ${book.author}`);

export const f = (damage: string) => console.log(`Damage reporter: ${damage}`);

export function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string');
    }
}

export function purge<T>(inventory: Array<T>): Array<T> {
    return inventory.slice(2);
}

export function getBooksByCategory(category: Category, callback: LibMgrCallback): void {
    setTimeout(() => {
        try {
            const titles: string[] = getBookTitlesByCategory(category);

            if (titles.length) {
                callback(null, titles);
            } else {
                throw new Error('No books found');
            }
        } catch (error) {
            callback(error, null);
        }
    }, 2000);
}

export const logCategorySearch: LibMgrCallback = (err: Error, titles: string[]) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(titles);
    }
};

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    const p: Promise<string[]> = new Promise<string[]>((resolve, reject) => {
        setTimeout(() => {
            const titles: string[] = getBookTitlesByCategory(category);

            if (titles.length) {
                resolve(titles);
            } else {
                reject('No books found');
            }
        }, 2000);
    });

    return p;
}

export async function logSearchResults(category: Category): Promise<any> {
    const titles = await getBooksByCategoryPromise(category);
    console.log(titles);
}