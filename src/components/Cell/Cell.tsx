import {CellT} from "../../Types/Game"
import { getCellsSize} from "../gameModel"

function Cell({x,y,symbol}:CellT){

    return (
      <div
        style={{
          width: getCellsSize(),
          height: getCellsSize(),
          position: "absolute",
          fontSize: getCellsSize(),
          transform: `translate(${x * getCellsSize()}px,${
            y * getCellsSize()
          }px)`,
        }}
        className={"cell"}
      >
        {symbol}
      </div>
    );
}
export default Cell