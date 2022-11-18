import React, {RefObject, useEffect, useState} from 'react';
import { Cells, GameOSProps } from '../../Types/Game';
import Cell from '../Cell/Cell';
import { checkWin, getCellsPerHeight, getCellsPerWidth, getCellsSize, getSymbol, setSymbol } from '../gameModel';
import {changePlayer,getCurrentPlayer} from "../playersModel"

function move (x:number,y:number,fieldLock:boolean,cells:Cells,setFieldLock:React.Dispatch<boolean>, setCells:React.Dispatch<Cells>):void{
    if (fieldLock) return
    if (getSymbol(x,y,cells)) return
    setSymbol(x,y,getCurrentPlayer().symbol,cells,setCells)
    changePlayer()
    if (checkWin(x,y,cells)) {
        setFieldLock(true)
        alert(getCurrentPlayer().name+" win")
    }
}

function generateCells(offsetX:number,offsetY:number){
    let cells:[number,number][]= []
    for (let x= -1 - offsetX;x<getCellsPerWidth() - offsetX;x++){
        for (let y = -1 - offsetY;y<getCellsPerHeight() - offsetY;y++){
            cells.push([x,y])
        }
    }
    return cells
}

function movementHandler(game:RefObject<HTMLDivElement>,setOSCoords:Function,setCellsInView:React.Dispatch<[number,number][]>){
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
        setOSCoords(()=>[OSCoords[0],OSCoords[1]])
        let offsetX = Math.floor(OSCoords[0]/getCellsSize())
        let offsetY = Math.floor(OSCoords[1]/getCellsSize())
        if ((offsetX !== offsetXOld) || (offsetY !== offsetYOld)) {
            offsetXOld = offsetX;
            offsetYOld = offsetY;
            setCellsInView(generateCells(offsetX,offsetY))
        }
    })
}
function GameOS({game}:GameOSProps) {

    const [cells, setCells] = useState<Cells>({});
    const [OSCoords, setOSCoords] = useState<[number,number]>([0,0]);
    const [fieldLock, setFieldLock] = useState(false);
    const [cellsInView, setCellsInView] = useState<[number,number][]>(generateCells(0,0))

    // вешаем перемещение
    useEffect(()=>{
        movementHandler(game,setOSCoords,setCellsInView)
    },[game])
    
    return (
        <div className="gameOS"
            style={{
                transform:`translate(${OSCoords[0]}px,${OSCoords[1]}px)`
            }}
        >
            {cellsInView.map((coords, index)=>{
                return <Cell

                key={index}
                x={coords[0]}
                y={coords[1]}
                symbol={getSymbol(coords[0],coords[1],cells)}
                onClick={()=>move(coords[0],coords[1],fieldLock,cells,setFieldLock,setCells)}
                />
            })} 
        </div>
    );
}

export default GameOS;