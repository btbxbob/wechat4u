require("@babel/register")({
    extentions: [".ts",".js"]
})
class dicebot {
    constructor() {
        // constructor code here
    }

    // methods here
    Dispatch(reader: Function, sender: Function) {
        console.log("Dicebot dispatching");
        console.log(reader());
    }
}

module.exports = dicebot;