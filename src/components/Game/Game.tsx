import  {useRef} from 'react';
import GameOS from "../gameOS/GameOS";
import {GameProps} from "../../Types/Game";
import {setPlayers} from "../playersModel"
import { setCellsPerWidth, setGameSize, setToWin } from '../gameModel';

function Game({width,height,cellsPerWidth,players,toWin}:GameProps) {
    const game = useRef(null);

    setPlayers(players);
    setGameSize(width,height);
    setToWin(toWin);
    setCellsPerWidth(cellsPerWidth);
    

    return (
        <div
            ref={game}
            style={{
                width: width+"px",
                height: height + "px"
            }}
            className="game">
            <GameOS
                game={game}
            />
        </div>
    );
}

export default Game;