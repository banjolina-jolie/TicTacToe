'use strict';

let _ = require('lodash');

module.exports = {
    checkForWinner(table) {
        let funcs = [checkRows, checkCols, checkNegSlope, checkPosSlope];

        for (let i = 0; i < funcs.length; i++) {
            let winner = funcs[i](table);
            if (winner) {
                return winner;
            }
        }

        return false;
    }
};

let checkRows = (table) => {
    let indices = [];
    for (let i = 0; i < table.length; i++) {
        let row = table[i];
        let isWinningRow = _.every(row, (sq) => {
            return sq.val && sq.val === row[0].val;
        });
        if (isWinningRow) {
            for (let k = 0; k < table.length; k++) {
                indices.push([i, k]);
            }
            return {
                symbol: row[0].val,
                indices: indices
            };
        }
    };

    return false;
};

let checkCols = (table) => {
    let indices = [];

    for (let i = 0; i < table.length; i++) {
        let colIsWinner = true;
        for (let j = 0; j < table[i].length; j++) {
            if (!table[j][i].val || table[j][i].val !== table[0][i].val) {
                colIsWinner = false;
            } else {

            }
        }
        if (colIsWinner) {
            for (let k = 0; k < table.length; k++) {
                indices.push([k, i]);
            }
            return {
                symbol: table[0][i].val,
                indices: indices
            };
        }
    }
    return false;
};

let checkNegSlope = (table) => {
    let winner = table[0][0].val;
    let indices = [];

    for (let i = 0; i < table.length; i++) {
        indices.push([i, i]);
        if (!table[i][i].val || table[i][i].val !== winner) {
            winner = false;
            break;
        }
    }

    if (winner) {
        return {
            symbol: winner,
            indices: indices
        };
    } else {
        return false;
    }

};

let checkPosSlope = (table) => {
    let lastIdx = table.length - 1;
    let symbol = table[0][lastIdx].val;
    let indices = [];

    for (let i = 0; i < table.length; i++) {
        indices.push([i, lastIdx-i]);
        if (!table[i][lastIdx-i].val || table[i][lastIdx-i].val !== symbol) {
            symbol = false;
            break;
        }
    }

    if (symbol) {
        return { symbol, indices };
    } else {
        return false;
    }

};
