class D20Dice {
    d20(): number {
        return Math.floor(Math.random() * 20) + 1;
    }
    proccess(reader: Function, sender: Function) {
    }
}
