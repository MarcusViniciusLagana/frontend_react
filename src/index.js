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

function Fact (props) {
    const fact = [
        'Tic-tac-toe is called "Jogo da Velha" in Brazil, something that could be translated as "The Game of the Old Woman"',
        'If the result is a tie, in Brazil, we call it "Velha" or "Old Woman" (free translation)',
        'This game allows 91 distinct victories positions for "X", 44 for "O", and only 3 distinct draw positions',
        'If played optimally by both players, the game always ends in a draw',
        'In 1975, tic-tac-toe was used by MIT students to demonstrate the computational power of Tinkertoy elements.'
    ];

    return (
        <div className="fact">
            {fact[Math.floor(Math.random() * fact.length)]}
        </div>
    );
}

function Image (props) {
    const address = [
        // Xs
        'https://media.giphy.com/media/jTemXLGfONHenS1icE/source.gif',
        'https://media.giphy.com/media/133R3yNyjDea0U/source.gif',
        'https://media.giphy.com/media/l2SpUXr2q90X1Pqgw/source.gif',
        'https://media.giphy.com/media/Pnfb50o1UuTagM3KMG/source.gif',
        // Os
        'https://media.giphy.com/media/26AHvcW0LBkohdWJa/giphy.gif',
        'https://media.giphy.com/media/83eQIMgNvkiY/giphy.gif',
        'https://media.giphy.com/media/ugyC0Q2BoCbYs/giphy.gif',
        'https://media.giphy.com/media/3oz8xTwbLrC75weLeM/giphy.gif',
        // Tie
        'https://media.giphy.com/media/JTE9xUEh90wheAAnPN/giphy.gif',
        'https://media.giphy.com/media/mJzJSSrhNJGEJ8GYrH/giphy.gif',
        'https://media.giphy.com/media/RMk32NEpSgcIoljwwz/giphy.gif',
        'https://media.giphy.com/media/l0HU8MLXSjDXkEUGk/giphy.gif'
    ];
    
    let min = 0;
    let max = address.length;
    const numImages = max / 3;

    if (props.nextMove === 'X') max = numImages;
    else if (props.nextMove === 'O') {
        min = numImages;
        max -= numImages;
    } else min = max - numImages;

    const image = Math.floor(Math.random() * (max - min) + min);

    return (<img alt="" src={address[image]}/>);
}

class Game extends React.Component {
    // Initializing next move to 'X'
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
        let winner = null;
    
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
                break;
            }
        }

        return [win || draw, winner];
    }

    squareClick(index) {
        const squares = this.state.squares;

        if (squares[index] || this.checkDrawWinner()[0]) return;

        const nextMove = this.state.nextMove === 'X' ? 'O' : 'X';
        squares[index] = this.state.nextMove;

        this.setState({ nextMove, squares });
    }

    render () {
        const [endGame, winner] = this.checkDrawWinner();

        return (<div>
            <div className="title">Jogo da Velha / Tic-tac-toe</div>
            <div className="game-area">
                <div className="game">
                    <Board squares={this.state.squares} click={(i) => this.squareClick(i)}/>
                    <div className="game-info">
                        {endGame ? (winner ? 'Winner:' : 'Draw / Deu Velha!') : 'Next Move:' }
                        <br/>
                        <Image nextMove={endGame ? winner : this.state.nextMove}/>
                    </div>
                </div>
                <div className="restart">
                    <button className="restart-button" onClick={() => this.restartGame()}>Restart Game</button>
                </div>
                <Fact/>
            </div>
        </div>);
    }
}

ReactDOM.render(
    <Game lines={[[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]]}/>,
    document.getElementById('root')
);