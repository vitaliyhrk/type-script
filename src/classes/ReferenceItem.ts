import { timeout } from "../decorators";

abstract class ReferenceItem {
    // title: string;
    // year: number;

    // constructor(newTitle: string, newYear: number) {
    //   console.log(`Creating a new ReferenceItem...`);
    //   this.title = newTitle;
    //   this.year = newYear;
    // }

    constructor(public title: string, protected year: number) {
        console.log(`Creating a new ReferenceItem...`);
    }

    private _publisher: string;

    static department: string = 'Research Dep';

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublishr: string) {
        this._publisher = newPublishr;
    }

    @timeout(2000)
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department: ${ReferenceItem.department}`);
    }

    abstract printCitation(): void;
}

export { ReferenceItem };
