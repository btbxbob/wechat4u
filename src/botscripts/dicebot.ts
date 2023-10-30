const Dice=require("./dice.ts")
export default class Dicebot {
    constructor() {
        // constructor code here
        let dice = new Dice(6);
    }

    // methods here
    Dispatch(reader: Function, sender: Function) {
        console.log("Dicebot dispatching")
        let msg:String=reader()
        let result=msg.match(/(.*?):\n\.roll\s+([1-9]\d*)(?:\s+(\w*))*/mi)
        if(result){
            console.log(result)
            let dice=new Dice(Number(result[2]))
            let roll=dice.roll()
            let reply=`${result[1]}进行一次投骰:\n${result[2]}: ${roll}`
            sender(reply)
        }
    }
}

module.exports = Dicebot;