import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
    // Rendering the square button
    return (
        <button className="square" onClick={props.click}>
            {props.value}
        </button>
    );
}

function BoardRow (props) {
    return (
        <div className="board-row">
            <Square value={props.value[0]} click={() => props.click(0)}/>
            <Square value={props.value[1]} click={() => props.click(1)}/>
            <Square value={props.value[2]} click={() => props.click(2)}/>
        </div>
    );
}

function Board (props) {
    return (
        <div className="game-board">
            <div>
                <BoardRow value={props.squares.slice(1,4)} click={(i) => props.click(1 + i)}/>
                <BoardRow value={props.squares.slice(4,7)} click={(i) => props.click(4 + i)}/>
                <BoardRow value={props.squares.slice(7,10)} click={(i) => props.click(7 + i)}/>
            </div>
        </div>
    );
}

class Game extends React.Component {
    // Initializing next move to ''
    // and all squares to null
    constructor(props) {
        super(props);
        this.state = {
            nextMove: '',
            squares: Array(9).fill(null)
        };
    }

    squareClick(index) {
        const squares = this.state.squares;

        if (squares[index]) return;

        const nextMove = this.state.nextMove === 'X' ? 'O' : 'X';
        squares[index] = nextMove;

        this.setState({ nextMove, squares });
    }

    render () {
        return (
            <div className="game">
                <Board squares={this.state.squares} click={(i) => this.squareClick(i)}/>
                <div className="game-info">
                    Info
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);