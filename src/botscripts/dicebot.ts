const Dice=require("./dice.ts")
const DndDice=require("./dnddice.ts")
export default class Dicebot {
    constructor() {
        // constructor code here
        let dice = new Dice(6);
    }

    // methods here
    Dispatch(reader: Function, sender: Function) {
        console.log("Dicebot dispatching")
        let msg=reader()
        let result=msg.Content.match(/(?:(.*?)\n)?([\.\/]roll\s+([1-9]\d*))(?:\s+(\w*))*/mi)
        if(result){
            console.log(result)
            let dice=new Dice(Number(result[3]))
            let timeString=new Date(msg.CreateTime*1000).toTimeString()
            let roll=dice.roll()
            let reply=`${result[1]}在${timeString}进行一次投骰:\n${result[2]}: ${roll}`
            sender(reply)
        }
    }
}

module.exports = Dicebot;