import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
    let style = 'square';
    if (props.winnerSquare) style += ' winner';
    // Rendering the square button
    return (
        <button className={style} onClick={props.click}>
            {props.value}
        </button>
    );
}

function BoardRow (props) {
    const squares = props.squares;
    const item = squares.map((square, index) => 
        <Square key={'square-' + (3 * props.idx + index).toString()} value={square} click={() => props.click(index)} winnerSquare={props.winnerSquares[index]}/>);

    return (
        <div className="board-row">
            {item}
        </div>
    );
}

function Board (props) {
    const squareRows = [props.squares.slice(0, 3), props.squares.slice(3, 6), props.squares.slice(6, 9)];
    const winnerRows = [props.winnerSquares.slice(0, 3), props.winnerSquares.slice(3, 6), props.winnerSquares.slice(6, 9)];
    const row = squareRows.map((squareRow, index) => 
        <BoardRow key={'board-' + index.toString()} idx={index} squares={squareRow} click={i => props.click(3 * index + i)} winnerSquares={winnerRows[index]}/>);

    return (
        <div className="game-board">
            {row}
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
            {'Fast fact: ' + fact[Math.floor(Math.random() * fact.length)]}
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

    return (<img className={props.className} alt="Giphy" src={address[image]}/>);
}

function History (props) {
    return(
        <button onClick={props.onClick}>
            {props.move ? 'Go to move #' + props.move : 'Go to game start'}
        </button>
    );
}

class Game extends React.Component {
    // Initializing next move to 'X'
    // and all squares to null
    constructor(props) {
        super(props);
        this.state = {
            init: true,
            history: [{
                squares: Array(9).fill(null),
                nextMove: 'X'
            }],
            move: 0
        };
    }

    restartGame() {
        this.setState({
            init: false,
            history: [{
                squares: Array(9).fill(null),
                nextMove: 'X'
            }],
            move: 0
        });
    }
    
    checkDrawWinner() {
        const history = this.state.history.slice(0, this.state.move + 1);
        const squares = history[history.length - 1].squares;
        const winnerSquares = Array(9).fill(false);
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
                winnerSquares[a] = true;
                winnerSquares[b] = true;
                winnerSquares[c] = true;
                break;
            }
        }

        return [win || draw, winner, winnerSquares];
    }

    squareClick(index) {
        const move = this.state.move + 1;
        let history = this.state.history.slice(0, move);
        const squares = history[history.length - 1].squares.slice();

        if (squares[index] || this.checkDrawWinner()[0]) return;

        const nextMove = history[history.length - 1].nextMove === 'X' ? 'O' : 'X';
        squares[index] = history[history.length - 1].nextMove;

        history = history.concat([{ squares, nextMove }]);

        this.setState({ history, move });
    }

    jumpTo(move) {
        this.setState({ move })
    }

    render () {
        const history = this.state.history;
        const [endGame, winner, winnerSquares] = this.checkDrawWinner();
        const historyOptions = history.map((step, move) => <History key={move.toString()} onClick={() => this.jumpTo(move)} move={move}/>);

        return (<>
            <HomeScreen init={this.state.init} onClick={() => this.restartGame()}/>
            <div className="title">Jogo da Velha / Tic-tac-toe</div>
            <div className="game-area">
                <div className="game">
                    <Board squares={history[this.state.move].squares} click={i => this.squareClick(i)} winnerSquares={winnerSquares}/>
                    <div className="game-info">
                        {endGame ? (winner ? 'Winner:' : 'Draw / Deu Velha!') : 'Next Move:' }
                        <br/>
                        <Image className={endGame && winner ? 'winner' : 'img'} nextMove={endGame ? winner : history[this.state.move].nextMove}/>
                        <br/>
                        <div className="history">
                            {historyOptions}
                        </div>
                    </div>
                </div>
                <div className="restart">
                    <button className="restart-button" onClick={() => this.restartGame()}>Restart Game</button>
                </div>
                <Fact/>
            </div>
        </>);
    }
}

function HomeScreen (props) {
    let imgdivClass = 'init-img-div';
    let btndivClass = 'init-btn-div';
    let imgClass = 'initial-img';
    let btnClass = 'restart-button';
    let divClass = 'initial';
    if (!props.init) {
        imgdivClass += ' noPadding';
        btndivClass += ' noPadding';
        imgClass += ' trigger';
        btnClass += ' trigger';
        divClass += ' trigger';
    }

    return (
        <div className={divClass}>
            <div className={imgdivClass}>
                <img className={imgClass} alt="Tic Tac Toe by Chameleon Design from the Noun Project" src="./TicTacToe.png"/>
            </div>
            * Tic Tac Toe icon by Chameleon Design from the Noun Project
            <div className={btndivClass}>
                <button className={btnClass} onClick={props.onClick}>START</button>
            </div>
        </div>
    );
}

ReactDOM.render(
    <Game lines={[[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]]}/>,
    document.getElementById('root')
);