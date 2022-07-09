import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      aglaclick: true,
    };
  }

  handleClick(i){
    let count = 0;
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i])
    {
      return ;
    }
    squares[i] = this.state.aglaclick ? 'X' : 'O';
    // count = count + 1;
    this.setState({
      squares : squares,
      aglaclick: !this.state.aglaclick,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value ={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {

    const winner = calculateWinner(this.state.squares);
    let status;
    // let counter = 0;
    if(winner && winner != -1)
    {
      status = 'Winner : ' + winner;
    }
    else if(winner == -1)
    {
      status = 'Result is a Draw' ;
    }
    else{
    status = 'Next player: ' + (this.state.aglaclick ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div>
        <div className="statusext"> Welcome to the TIC-TAC-TOE SIMULATOR. </div>
        <br></br>
        <div>
          <Board/>
        </div>
    
      </div>

    );
  }
}

function calculateWinner(squares) {

  let check = 1;

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const coordinates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  for (let i = 0; i < coordinates.length; i++) {
    const [d, e, f] = coordinates[i];
    if (!squares[d] || !squares[e] || !squares[f]) {
      check  = 0;
    }
  }
  if(!check)
  {return null;}
  else
  {
    return -1;
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
