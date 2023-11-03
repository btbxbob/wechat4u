export default interface IDice {
    check(reader: Function): boolean;
    proccess(reader:Function, sender: Function): void;
}
