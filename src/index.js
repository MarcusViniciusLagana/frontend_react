import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
    return (<button className="square">{props.value}</button>);
}

function BoardRow (props) {
    return (
        <div className="board-row">
            <Square value={props.value[0]}/>
            <Square value={props.value[1]}/>
            <Square value={props.value[2]}/>
        </div>
    );
}

function Board (props) {
    return (
        <div className="game-board">
            <div>
                <BoardRow value={["X","",""]}/>
                <BoardRow value={["","X",""]}/>
                <BoardRow value={["","","X"]}/>
            </div>
        </div>
    );
}

function Game (props) {
    return (
        <div className="game">
            <Board/>
            <div className="game-info">
                Info
            </div>
        </div>
    );
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);