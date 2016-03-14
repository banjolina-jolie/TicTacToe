'use strict';
let React = require('react/addons');
let checkForWinner = require('../utils').checkForWinner;
let _ = require('lodash');

let teams = [
    {symbol: '✖', className:'x'},
    {symbol: '○', className:'o'}
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
            gameOver: false
        };
    },

    componentDidUpdate() {
        let table = this.state.table;
        let winner = checkForWinner(table);

        if (winner && !this.state.gameOver) {
            _.each(winner.indices, (arr) => {
                table[arr[0]][arr[1]].green = true;
            });
            this.setState({
                gameOver: true,
                table: table
            }, _ => {
                alert(winner.symbol + ' wins');
            });
        }
    },


    render() {
        return (
            <div>
                <button onClick={this.resetGame}>Reset Game</button>
                <input type="number" value={this.state.size} onChange={this.sizeChanged} />
                {
                    this.state.table.map(row => {
                        return (
                            <div className="table-row">
                                {
                                    row.map(sq => {
                                        let classes = 'third ';
                                        classes += sq.className;

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
            gameOver: false
        });
    },

    sizeChanged(e) {
        let size = e.target.value;
        this.setState({
            table: this.buildStateTable(size),
            size: size,
            gameOver: false
        });
    },

    createClickHandler(row, col) {
        return () => {
            let table = this.state.table;
            let sq = table[row][col];

            if (sq.val || this.state.gameOver) { return; } // can't play same square twice

            sq.val = teams[this.state.turn].symbol;
            sq.className = teams[this.state.turn].className;

            this.setState({
                table: table,
                turn: Number(!this.state.turn)
            });
        }
    }
});

module.exports = TicTacToeView;
