import IDice from "./IDice";
const Dice=require("./dice.ts")
const DndDice=require("./dnddice.ts")

const diceList: IDice[] = [new DndDice()];
export default class Dicebot {
    constructor() {
        // constructor code here
    }

    // methods here
    Dispatch(reader: Function, sender: Function) {
        console.log("Dicebot dispatching")
        let msg=reader()
        let result=msg.Content.match(/(?:(.*?):\n)?([\.\/]roll\s+([1-9]\d*))(?:\s+(\S*))*/im)
        if(result){
            console.log(result)
            let dice=new Dice()
            let timeString=new Date(msg.CreateTime*1000).toTimeString()
            let roll=dice.roll(Number(result[3]))
            let reply=`${result[1]}在${timeString}进行一次投骰:\n${result[2]}: ${roll}`
            sender(reply)
        }
        diceList.forEach(dice => {
            if (dice.check(reader)) {
                dice.proccess(reader, sender);
            }
        })
    }
}
module.exports = Dicebot;