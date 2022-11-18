import ReactDOM from 'react-dom/client';
import './index.css';
import Game from "./components/Game/Game";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <>
    {/*eslint-disable-next-line*/}
    <div className="desc" >// перемещение с помощью ПКМ</div>
      <Game
        toWin={3}
        width={500}
        height={500}
        cellsPerWidth={20}
        players={[
            {
                name:"First player",
                symbol:"x"
            },
            {
                name:"Second player",
                symbol: "o"
            },
            {
                name:"Third player",
                symbol: "e"
            }]}
      />
    </>
 
);
