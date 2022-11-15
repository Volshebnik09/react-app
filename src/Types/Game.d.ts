
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