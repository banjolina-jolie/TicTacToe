'use strict';
let React = require('react/addons');
let checkForWinner = require('../utils').checkForWinner;
let _ = require('lodash');

let teams = [
    {symbol: '✖', symbolClass:'x'},
    {symbol: '○', symbolClass:'o'}
];


let TicTacToeView = React.createClass({

    buildStateTable(size) {
        let rows = [];
        for (let row = 0; row < size; row++) {
            rows.push(this.buildRow(row, size));
        }
        return rows;
    },
    buildRow(row, size) {
        let cols = [];
        for (let col = 0; col < size; col++) {
            cols.push({
                val: '',
                onClick: this.createClickHandler(row, col)
            });
        }
        return cols;
    },

    getInitialState() {
        return {
            size: 3,
            table: this.buildStateTable(3),
            turn: 0,
            turnsPlayed: 0,
            gameOver: false
        };
    },

    componentDidUpdate() {
        let gameIsActive = !this.state.gameOver;
        let table = this.state.table;
        let winner = checkForWinner(table);

        if (gameIsActive && winner) {
            _.each(winner.indices, (arr) => {
                table[arr[0]][arr[1]].green = true;
            });
            this.setState({
                gameOver: true,
                table: table
            }, _ => {
                return window.alert(winner.symbol + ' wins');
            });
        } else if (gameIsActive && this.state.turnsPlayed === Math.pow(this.state.size, 2)) {
            this.setState({
                gameOver: true,
            }, _ => {
                return window.alert('The game is a draw!');
            });
        }
    },


    render() {
        return (
            <div>
                <h2>Tic-Tac-Toe</h2>
                <div className="game-controls">
                    <label>size: </label>
                    <input type="number" min="2" max="10" value={this.state.size} onChange={this.sizeChanged} />
                    <span> (changing size will reset the game)</span>
                </div>
                <div className="game-controls">
                    <button onClick={this.resetGame}>Reset Game</button>
                </div>
                {
                    this.state.table.map(row => {
                        return (
                            <div className="table-row">
                                {
                                    row.map(sq => {
                                        let classes = 'game-square ';

                                        if (sq.symbolClass) {
                                            classes += sq.symbolClass;
                                        }

                                        if (sq.green) {
                                            classes += ' green';
                                        }

                                        return (
                                            <div className={classes} onClick={sq.onClick}>{sq.val}</div>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    },

    resetGame() {
        this.setState({
            table: this.buildStateTable(this.state.size),
            gameOver: false,
            turn: 0,
            turnsPlayed: 0
        });
    },

    sizeChanged(e) {
        let size = e.target.value;
        this.setState({ size }, this.resetGame);
    },

    createClickHandler(row, col) {
        return () => {
            let table = this.state.table;
            let sq = table[row][col];

            if (sq.val) { return; } // can't play same square twice

            sq.val = teams[this.state.turn].symbol;
            sq.symbolClass = teams[this.state.turn].symbolClass;

            this.setState({
                table,
                turn: Number(!this.state.turn),
                turnsPlayed: ++this.state.turnsPlayed
            });
        }
    }
});

module.exports = TicTacToeView;
