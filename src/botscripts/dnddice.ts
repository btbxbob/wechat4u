import { read } from "fs";
import IDice from "./IDice";
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
        let name = result.groups.name
        let command = result.groups.command
        let comment = result.groups.comment
        }
    }
}

module.exports=DndDice;
