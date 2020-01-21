import { ShelfItem } from './../intefaces';

export default class Shelf<T extends ShelfItem> {
    private _items: Array<T> = [];

    add(...item: Array<T>): void {
        this._items.push(...item);
    }

    getFirst(): T {
        return this._items[0];
    }

    find(title: string): T {
        return this._items.find(item => item.title === title);
    }

    printTitles(): void {
        this._items.forEach(item => console.log(item.title));
    }
}