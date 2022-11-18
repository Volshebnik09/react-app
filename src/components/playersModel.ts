import {Player} from "../Types/Game"
let currentPlayerId = 0
let players: Player[]

export const changePlayer = ()=>{
    if (currentPlayerId >= players.length -1){
        currentPlayerId = 0
    } else {
        currentPlayerId++
    }
}
export const getCurrentPlayer = ()=>{
    return players[currentPlayerId]
}

export const setPlayers = (pl:Player[]) =>{
    players = pl
}