import { Cells}  from "../Types/Game";
import { changePlayer, getCurrentPlayer } from "./playersModel";

let gameWidth:number;
let gameHeight:number;

let toWin:number;

let cellsSize:number;

let cellsPerWidth:number;
let cellsPerHeight:number;

export let fieldLock:boolean;

export let OSCoords:[number,number] = [0,0];

export let cells:Cells = {};

export function setCells(x:Cells){
    cells = x
}
export function setOSCoords(x:[number,number]){
    OSCoords = x
}

export function setFieldLock(x:boolean){
    fieldLock = x
}
export function setGameSize(width:number,height:number){
    gameWidth = width;
    gameHeight = height;
}

export function getGameSize(){
    return {
        width:gameWidth,
        height:gameHeight
    }
}

export function setToWin(x:number){
    toWin=x;
}

export function getToWin(){
    return toWin
}


export function setCellsPerWidth(x:number){
    cellsPerWidth=x;
    cellsSize = gameWidth/cellsPerWidth
    cellsPerHeight=gameHeight/cellsSize
}

export function getCellsPerWidth(){
    return cellsPerWidth
}

export function getCellsPerHeight(){
    return cellsPerHeight
}

export function getCellsSize(){
    return cellsSize
}

export function getSymbol(x:number,y:number,cells:Cells):string{
    return cells[x]?.[y] ?? ''
}

export function setSymbol(x:number,y:number,symbol:string){
    if (!cells[x]) cells[x] = {}
    if (cells[x][y]) return
    cells[x][y] = symbol
}

function horizontalCheck(x: number, y: number, symbol: string,cells:Cells) {
    // горизонтальная проверка

    let counter = 0;
    for (let n = -toWin + 1; n < toWin; n++) {
        if (symbol === getSymbol(x - n, y,cells)) {
            counter++;
            if (counter === toWin) return true;
        } else counter = 0;
    }
    return false;
}

function verticalCheck(x: number, y: number, symbol: string,cells:Cells) {
    // горизонтальная проверка

    let counter = 0;
    for (let n = -toWin + 1; n < toWin; n++) {
        if (symbol === getSymbol(x, y - n,cells)) {
            counter++;
            if (counter === toWin) return true;
        } else counter = 0;
    }
    return false;
}

function diagCheck(x: number, y: number, symbol: string,cells:Cells) {
    for (let offset = -1; offset <= 1; offset += 2) {

        let counter = 0;
        for (let n = -toWin + 1; n < toWin; n++) {
            if (symbol === getSymbol(x - n, y - n * offset,cells)) {
                counter++;
                if (counter === toWin) return true;
            } else counter = 0;
        }
    }
    return false;
}

export function checkWin(x: number, y: number,cells:Cells) {
    let symbol = getSymbol(x, y,cells);

    return (
        horizontalCheck(x, y, symbol,cells) ||
        verticalCheck(x, y, symbol,cells) ||
        diagCheck(x, y, symbol,cells)
    );
}

export function move(x:number,y:number):void{
    if (fieldLock) return
    if (getSymbol(x,y,cells)) return
    setSymbol(x,y,getCurrentPlayer().symbol)
    changePlayer()
    if (checkWin(x,y,cells)) {
        setFieldLock(true)
        alert(getCurrentPlayer().name+" win")
    }
}
export function getOffsetX(){
    return Math.floor(OSCoords[0]/getCellsSize())
}

export function getOffsetY(){
    return Math.floor(OSCoords[1]/getCellsSize())
}