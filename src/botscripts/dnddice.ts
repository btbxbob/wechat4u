import IDice from "./IDice";
class DndDice implements IDice{
    roll(n:number): number {
        return Math.floor(Math.random() * n) + 1;
    }
    check(reader:Function):boolean{
        return false;
    }
    proccess(reader: Function, sender: Function) {
    }
}

module.exports=DndDice;
