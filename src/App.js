// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';



function Square({value, onSquareClick}){
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

function checkWinner(board) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winner symbol ('X' or 'O')
    }
  }

  return null; // No winner found
}




function Board({xIsNext, squares, onPlay}) {
  const winner = checkWinner(squares);
  let status;
  if (winner){
    status = "Winner: "+ winner
  }
  else{
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (checkWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  return (
    <div> 
      <div className="status">{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}  />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}  />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}  />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}  />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}  />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}  />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}  />
      </div>
    </div>
    
  );
}
function Game(){
  const [xIsNext, setXIsNext]=useState(true);
  const [history, setHistory]=useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];
  const moves = history.map((squares, move) => {
    let description;
    if(move>0){
      description='Go to move #'+ move;
    }
    else{
      description='Go to game start'
    }

    return(
      <li key={move}>
        <button className='time-travel' onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
    setXIsNext(!xIsNext)

  }
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setXIsNext(nextMove%2===0)
  }
  
  return(
    <div className="game">
        <div className='game-board'>
          <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay}/>
        </div>
        <div className='game-info'>
          <ol>{moves}</ol>
        </div>
    </div>
  );
}

export default Game;
