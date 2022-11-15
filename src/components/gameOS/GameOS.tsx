import React, {useEffect, useState} from 'react';
import {Cells, GameOSProps} from "../../Types/GameOS";


function GameOS({cellsSize,cellsPerWidth,cellsPerHeight,game,getCurrentPlayer,changePlayer,checkWin}:GameOSProps) {

    const [cells, setCells] = useState<Cells>({});
    const [OSCoords, setOSCoords] = useState<[number,number]>([0,0]);
    const [fieldLock, setFieldLock] = useState(false);

    function getSymbol(x:number,y:number):string{
        return cells[x]?.[y] ?? ''
    }

    function setSymbol(x:number,y:number,symbol:string){
        if (!cells[x]) cells[x] = {}
        if (cells[x][y]) return
        cells[x][y] = symbol
        setCells({...cells})
    }


    // вешаем перемещение
    useEffect(()=>{
        let isMouseDown = false;
        game.current!.oncontextmenu = () => false;
        game.current!.addEventListener('mousedown',(e)=>{
            if (e.button === 2) {
                isMouseDown = true
            }
        })
        document.addEventListener('mouseup',()=>{
            isMouseDown = false
        })
        document.addEventListener('mousemove',(e)=>{
            if (!isMouseDown) return
            OSCoords[0] += e.movementX
            OSCoords[1] += e.movementY
            setOSCoords([OSCoords[0],OSCoords[1]])
        })
    },[])

    function move (x:number,y:number){
        if (fieldLock) return
        setSymbol(x,y,getCurrentPlayer().symbol)
        changePlayer()
        if (checkWin(x,y,getSymbol)) {
            setFieldLock(true)
            alert("win")
        }
    }

    function renderCells(){
        const cellsHTML = []
        let offsetX = Math.floor(OSCoords[0]/cellsSize)
        let offsetY = Math.floor(OSCoords[1]/cellsSize)

        for (let x = -1 - offsetX; x<cellsPerWidth - offsetX;x++){
            for (let y = -1 - offsetY; y<cellsPerHeight - offsetY;y++){
                cellsHTML.push(
                    <div
                        onClick={()=>{move(x,y)}}
                        key={x+':'+y}
                        style={{
                            width:cellsSize,
                            height:cellsSize,
                            position:"absolute",
                            fontSize:cellsSize,
                            transform:`translate(${x*cellsSize}px,${y*cellsSize}px)`
                        }}
                        className={"cell"}
                    >
                        {getSymbol(x,y)}
                    </div>)
            }
        }


        return cellsHTML
    }


    return (
        <div className="gameOS"
            style={{
                transform:`translate(${OSCoords[0]}px,${OSCoords[1]}px)`
            }}
        >
            {renderCells()}
        </div>
    );
}

export default GameOS;