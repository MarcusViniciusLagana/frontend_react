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
                <BoardRow value={props.squares.slice(0,3)} click={(i) => props.click(i)}/>
                <BoardRow value={props.squares.slice(3,6)} click={(i) => props.click(3 + i)}/>
                <BoardRow value={props.squares.slice(6,9)} click={(i) => props.click(6 + i)}/>
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
            nextMove: 'X',
            squares: Array(9).fill(null)
        };
    }

    restartGame() {
        this.setState({
            nextMove: 'X',
            squares: Array(9).fill(null)
        });
    }
    
    checkDrawWinner() {
        const squares = this.state.squares;
        let draw = true;
        let win = false;
        let winner = '';
    
        for (const [a, b, c] of this.props.lines) {
            const line = [squares[a], squares[b], squares[c]];
            const nX = line.filter(x => x === 'X').length;
            const nO = line.filter(x => x === 'O').length;
            // If a line has no 'X' or no 'O', NO DRAW
            if (nX === 0 || nO === 0) draw = false;
            // If a line has 3 'X' or 3 'O', Win!
            if (nX === 3 || nO === 3) {
                win = true;
                winner = nX === 3 ? 'X' : 'O';
            }
        }

        if (win) return winner;
        if (draw) return 'Draw';
        return null;
    }

    squareClick(index) {
        const squares = this.state.squares;

        if (squares[index] || this.checkDrawWinner()) return;

        const nextMove = this.state.nextMove === 'X' ? 'O' : 'X';
        squares[index] = this.state.nextMove;

        this.setState({ nextMove, squares });
    }

    render () {
        const winner = this.checkDrawWinner();

        return (
            <div>
                <div className="title">
                    Jogo da Velha or Tic-tac-toe
                </div>
                <div className="game">
                    <Board squares={this.state.squares} click={(i) => this.squareClick(i)}/>
                    <div className="game-info">
                        {!winner ? 'Next Move: ' + this.state.nextMove : 
                        winner==='Draw' ? 'Deu Velha!' : 'Winner: ' + winner}
                    </div>
                </div>
                <div className="restart">
                    <button className="restartButton" onClick={() => this.restartGame()}>Restart Game</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game lines={[[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]]}/>,
    document.getElementById('root')
);