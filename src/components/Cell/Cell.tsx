import { CellProps} from "../../Types/Game"
import { getCellsSize} from "../gameModel"

function Cell({x,y,symbol,onClick}:CellProps){

    return (
      <div
        onClick={onClick}
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