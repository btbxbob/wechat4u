import IDice from "./IDice";
class Dice implements IDice {

    constructor() {
    }

    check(reader: Function): boolean {
        return false;
    }

    proccess(reader: Function, sender: Function): void {
        
    }

    roll(sides:number): number {
        return Math.floor(Math.random() * sides) + 1;
    }
}

module.exports=Dice;