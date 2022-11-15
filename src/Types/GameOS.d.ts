import {RefObject} from "react";
import {Player} from "./Game";

export interface Cells {
    [x: number]: {
        [y: number]: string;
    };
}

export interface Cell {
    x:number,
    y:number,
    symbol:string
}

export interface GameOSProps {
    cellsPerWidth:number,
    cellsPerHeight:number,
    cellsSize:number,
    fieldWidth:number,
    fieldHeight:number,
    game:RefObject<HTMLDivElement>,
    changePlayer:()=>void,
    getCurrentPlayer: ()=>Player,
    checkWin:(x: number, y: number,getSymbolInField:(x:number,y:number)=>string)=>boolean
}