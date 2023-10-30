class Dice {
    sides: number;

    constructor(sides: number) {
        this.sides = sides;
    }

    roll(): number {
        return Math.floor(Math.random() * this.sides) + 1;
    }
}

module.exports=Dice;