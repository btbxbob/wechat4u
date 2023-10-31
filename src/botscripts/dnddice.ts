class D20Dice {
    roll(n:number): number {
        return Math.floor(Math.random() * n) + 1;
    }
    proccess(reader: Function, sender: Function) {
    }
}
