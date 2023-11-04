import { read } from "fs";
import IDice from "./IDice";
import { send } from "process";
import { time } from "console";
class DndDice implements IDice{
    roll(n:number): number {
        return Math.floor(Math.random() * n) + 1;
    }
    check(reader:Function):boolean{
        let msg = reader()
        let regexMain = /(?:(.*?):\n)?([\.\/]r\s+(?:(\d+)*d(\d+)(?:(\+(\d+)*d(\d+))|([+-]\d+))*))(?:\s+(\S*))*/im
        if(regexMain.test(msg.Content)){
            return true
        }
        return false
    }
    
    proccess(reader: Function, sender: Function) {
        let msg = reader()
        let regexMain = /(?:(?<name>.*?):\n)(?<command>[\.\/]r\s+(?:(\d+)*d(\d+)(?:(\+(\d+)*d(\d+))|([+-]\d+))*))(?:\s+(?<comment>\S*))*/im
        let result = regexMain.exec(msg.Content)
        if(result?.groups){
            let rollResult:number=0
            let rollDetailed:string=""
            let name = result.groups.name
            let timeString=new Date(msg.CreateTime*1000).toTimeString().substring(0,8)
            let command = result.groups.command
            //command: .r 1d20+5d6+3
            let comment = result.groups.comment?result.groups.comment:""
            let regexCommand = /[\.\/]r\s+(?<firstdice>(\d+)*d(\d+)(?:(\+(\d+)*d(\d+))|([+-]\d+))*)/im
            //处理第一个骰子
            let firstdice = regexCommand.exec(command)?.groups?.firstdice
            let firstdiceresult=firstdice?.match(/(?<number>\d+)*d(?<faces>\d+)/im)
            let number = firstdiceresult?.groups?.number?Number(firstdiceresult?.groups?.number):1;
            for(let i=0;i<number;i++){
                let roll:number = this.roll(Number(firstdiceresult?.groups?.faces))
                rollResult = rollResult+roll
                
            }
            rollDetailed=rollResult.toString()
            //处理后续骰子
            let regexAddDices = /((\+(\d+)*d(\d+))|([+-]\d+))/gim
            command.match(regexAddDices)?.forEach(element => {
                if (element.match(/^\+(\d+)$/im)){
                    rollResult = rollResult + Number(element.match(/^\+(\d+)$/im)?.[1])
                    rollDetailed = rollDetailed + "+" + element.match(/^\+(\d+)$/im)?.[1]
                }else if(element.match(/^-(\d+)$/im)){
                    rollResult = rollResult - Number(element.match(/^-(\d+)$/im)?.[1])
                    rollDetailed = rollDetailed + "-" + element.match(/^-(\d+)$/im)?.[1]
                }else{
                    let addDiceresult=element.match(/(?<number>\d+)*d(?<faces>\d+)/im)
                    let number = addDiceresult?.groups?.number?Number(addDiceresult?.groups?.number):1
                    for(let i=0;i<number;i++){
                        let roll = this.roll(Number(addDiceresult?.groups?.faces))
                        rollResult = rollResult + roll
                        rollDetailed = rollDetailed + "+" + String(roll)
                    }
                }
                console.log("rollResult:"+rollResult)
                console.log("roolDetailed"+rollDetailed)
            });
            sender(name + "在" + timeString + "进行了一次"+comment+"检定:\n" + command + ": " + rollResult + "\n详细:" + rollDetailed )
        }
    }
}

module.exports=DndDice;
