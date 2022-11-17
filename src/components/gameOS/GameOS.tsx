import React, {useEffect, useMemo, useState} from 'react';
import {Cells, GameOSProps} from "../../Types/GameOS";


function GameOS({cellsSize,cellsPerWidth,cellsPerHeight,game,getCurrentPlayer,changePlayer,checkWin}:GameOSProps) {

    const [cells, setCells] = useState<Cells>({});
    const [OSCoords, setOSCoords] = useState<[number,number]>([0,0]);
    const [fieldLock, setFieldLock] = useState(false);
    const [offset, setOffset] = useState<[number,number]>([0,0])

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
        let offsetXOld = offset[0];
        let offsetYOld = offset[1];
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
            let offsetX = Math.floor(OSCoords[0]/cellsSize)
            let offsetY = Math.floor(OSCoords[1]/cellsSize)
            if ((offsetX !== offsetXOld) || (offsetY !== offsetYOld)) {
                setOffset([offsetX, offsetY])
                offsetXOld = offsetX;
                offsetYOld = offsetY;
            }
        })
    },[])

    function move (x:number,y:number){
        if (fieldLock) return
        if (getSymbol(x,y)) return
        setSymbol(x,y,getCurrentPlayer().symbol)
        changePlayer()
        if (checkWin(x,y,getSymbol)) {
            setFieldLock(true)
            alert(getCurrentPlayer().name+" win")
        }
    }
    const renderCells = useMemo(()=>{
        const cellsHTML = []
        let offsetX = offset[0]
        let offsetY = offset[1]

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
    },[offset, cells])


    return (
        <div className="gameOS"
            style={{
                transform:`translate(${OSCoords[0]}px,${OSCoords[1]}px)`
            }}
        >
            {renderCells}
        </div>
    );
}

export default GameOS;