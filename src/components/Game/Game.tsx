import  {useRef} from 'react';
import GameOS from "../gameOS/GameOS";
import {GameProps} from "../../Types/Game";


function Game({width,height,cellsPerWidth,players,toWin}:GameProps) {
    let cellsSize = width/cellsPerWidth
    let currentPlayerId = 0
    const game = useRef(null);

    const changePlayer = ()=>{
        if (currentPlayerId >= players.length -1){
            currentPlayerId = 0
        } else {
            currentPlayerId++
        }
    }

    const getCurrentPlayer = ()=>{
        return players[currentPlayerId]
    }

    function horizontalCheck(x: number, y: number, symbol: string,getSymbolInField:(x:number,y:number)=>string) {
        // горизонтальная проверка

        let counter = 0;
        for (let n = -toWin + 1; n < toWin; n++) {
            if (symbol === getSymbolInField(x - n, y)) {
                counter++;
                if (counter === toWin) return true;
            } else counter = 0;
        }
        return false;
    }

    function verticalCheck(x: number, y: number, symbol: string,getSymbolInField:(x:number,y:number)=>string) {
        // горизонтальная проверка

        let counter = 0;
        for (let n = -toWin + 1; n < toWin; n++) {
            if (symbol === getSymbolInField(x, y - n)) {
                counter++;
                if (counter === toWin) return true;
            } else counter = 0;
        }
        return false;
    }

    function diagCheck(x: number, y: number, symbol: string,getSymbolInField:(x:number,y:number)=>string) {
        for (let offset = -1; offset <= 1; offset += 2) {

            let counter = 0;
            for (let n = -toWin + 1; n < toWin; n++) {
                if (symbol === getSymbolInField(x - n, y - n * offset)) {
                    counter++;
                    if (counter === toWin) return true;
                } else counter = 0;
            }
        }
        return false;
    }

    function checkWin(x: number, y: number,getSymbolInField:(x:number,y:number)=>string) {
        let symbol = getSymbolInField(x, y);

        return (
            horizontalCheck(x, y, symbol,getSymbolInField) ||
            verticalCheck(x, y, symbol,getSymbolInField) ||
            diagCheck(x, y, symbol,getSymbolInField)
        );
    }

    return (
        <div
            ref={game}
            style={{
                width: width+"px",
                height: height + "px"
            }}
            className="game">
            <GameOS
                cellsPerWidth={cellsPerWidth}
                cellsSize={cellsSize}
                cellsPerHeight={Math.ceil(height/cellsSize)}
                fieldHeight={height}
                fieldWidth={width}
                game={game}
                changePlayer={changePlayer}
                getCurrentPlayer={getCurrentPlayer}
                checkWin={checkWin}
            />
        </div>
    );
}

export default Game;