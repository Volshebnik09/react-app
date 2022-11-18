import React, {RefObject, useEffect, useState} from 'react';
import { CellT, GameOSProps } from '../../Types/Game';
import Cell from '../Cell/Cell';
import { getCellsPerHeight, getCellsPerWidth, getCellsSize, getSymbol, setOSCoords, cells, move, getOffsetX, getOffsetY} from '../gameModel';



function generateCells () {
    let newCells:CellT[]= []
    let offsetX = getOffsetX()
    let offsetY = getOffsetY()
    for (let x= -1 - offsetX;x<getCellsPerWidth() - offsetX;x++){
        for (let y = -1 - offsetY;y<getCellsPerHeight() - offsetY;y++){
            newCells.push({
                x:x,
                y:y
            })
        }
    }
    return newCells
}

function movementHandler(game:RefObject<HTMLDivElement>,setCellsInView:React.Dispatch<CellT[]>,setOSCoordsView:React.Dispatch<[number,number]>){
    let isMouseDown = false;
    let offsetXOld = 0;
    let offsetYOld = 0;
    let OSCoords = [0,0];
    game.current!.oncontextmenu = () => false;
    game.current!.addEventListener('mousedown',(e:MouseEvent)=>{
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
        setOSCoordsView([OSCoords[0],OSCoords[1]])
        if ((getOffsetX() !== offsetXOld) || (getOffsetY() !== offsetYOld)) {
            setCellsInView(generateCells())
            offsetXOld = getOffsetX();
            offsetYOld = getOffsetY();
        }
    })
}

function clickHandler(game:HTMLElement){
    game.addEventListener('click',(e)=>{
        let target = e.target as HTMLElement

        if (target.className !== "cell") return

        let cellCoords = target.getBoundingClientRect()
        let gameCoords = game.getBoundingClientRect() 

        // 0.01 - костыль который спасает от получения при 0.3/0.1 числа 2.9999999999999996
        // Увеличение размера клетки на 0.01 вообще ничего не меняет

        let x = Math.floor((cellCoords.x - gameCoords.x + 0.01) / getCellsSize()) - getOffsetX(); 
        let y = Math.floor((cellCoords.y - gameCoords.y + 0.01) / getCellsSize()) - getOffsetY(); 
        move(x,y)
    })
}


function GameOS({game}:GameOSProps) {
    const [cellsInView, setCellsInView] = useState<CellT[]>(()=>generateCells())
    const [OSCoordsView,setOSCoordsView] = useState<[number,number]>([0,0])


    // вешаем перемещение
    useEffect(()=>{
        movementHandler(game,setCellsInView,setOSCoordsView)
        clickHandler(game.current!)
    },[game])
    
    return (
        <div className="gameOS"
            style={{
                transform:`translate(${OSCoordsView[0]}px,${OSCoordsView[1]}px)`
            }}
        >
            {cellsInView.map((item, index)=>{
                return <Cell

                key={index}
                x={item.x}
                y={item.y}
                symbol={getSymbol(item.x,item.y,cells)}
                />
            })} 
        </div>
    );
}

export default GameOS;