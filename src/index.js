import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    // Initializing square state to ''
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
    // Rendering the square button
    render () {
        return (
            <button className="square" onClick={() => this.changeState()}>
                {this.state.value}
            </button>
        );
    }
    // Changing 'O' to 'X'
    changeState () {
        if (this.state.value === 'O') this.setState({value: 'X'})
        else this.setState ({value: 'O'})
    }
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