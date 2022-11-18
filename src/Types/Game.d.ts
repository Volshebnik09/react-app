import { move } from "../components/gameModel";

export interface Player {
    name:string,
    symbol:string,
}

export interface GameProps {
    toWin:number
    width:number,
    height:number,
    cellsPerWidth:number,
    players: Player[],
}

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
    game:RefObject<HTMLDivElement>,
}

export interface CellProps extends Cell{
    onClick:any
}