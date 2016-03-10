'use strict';

let Store = require('../stores/Store');
let React = require('react/addons');
let $ = require('jquery');

let teams = ['✖', '○'];


let AppBaseView = React.createClass({
    buildStateTable() {
        var rows = [];
        for (var row = 0; row < 3; row++) {
            rows.push(this.buildRow(row));
        }
        return rows;
    },
    buildRow(row) {
        var cols = [];
        for (var col = 0; col < 3; col++) {
            cols.push({
                val: '',
                onClick: this.createClickHandler(row, col)
            });
        }
        return cols;
    },

    getInitialState() {
        return {
            table: this.buildStateTable(),
            turn: 0
        };
    },

    componentDidUpdate() {
    },


    render() {
        return (
            <div>
                {
                    this.state.table.map(row => {
                        return (
                            <div className="table-row">
                                {
                                    row.map(square => {
                                        return (
                                            <div className="third" onClick={square.onClick}>{square.val}</div>
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

    createClickHandler(row, col) {
        return () => {
            var table = this.state.table;
            if (table[row][col].val) { return; } // can't play same square twice

            var currentTeam = teams[this.state.turn];
            table[row][col].val = currentTeam;

            this.setState({
                table: table,
                turn: Number(!this.state.turn)
            });
        }
    }
});

module.exports = AppBaseView;
