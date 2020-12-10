import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

ReactDOM.render(
    <div className="game">
        <div className="game-board">
            <div>
                <div className="board-row">
                    <button className="square">X</button>
                    <button className="square"></button>
                    <button className="square"></button>
                </div>
                <div className="board-row">
                    <button className="square"></button>
                    <button className="square">X</button>
                    <button className="square"></button>
                </div>
                <div className="board-row">
                    <button className="square"></button>
                    <button className="square"></button>
                    <button className="square">X</button>
                </div>
            </div>
        </div>
        <div className="game-info">
            Info
        </div>
    </div>,
    document.getElementById('root')
);