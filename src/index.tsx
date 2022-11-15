import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from "./components/Game/Game";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
      <Game
        toWin={3}
        width={500}
        height={500}
        cellsPerWidth={10}
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
);
