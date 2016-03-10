'use strict';



let _ = require('lodash');

module.exports = {
    checkForWinner(table) {
        let funcs = [checkRows, checkCols, checkNegSlope, checkPosSlope];

        for (var i = 0; i < funcs.length; i++) {
            var winner = funcs[i](table);
            if (winner) {
                return winner;
            }
        }

        return false;
    }
};

var checkRows = function (table) {
    for (var i = 0; i < table.length; i++) {
        var row = table[i];
        var isWinningRow = _.every(row, function (sq) {
            return sq.val && sq.val === row[0].val;
        });
        if (isWinningRow) {
            return row[0].val;
        }
    };

    return false;
};

var checkCols = function (table) {
    for (var i = 0; i < table.length; i++) {
        var colIsWinner = true;
        for (var j = 0; j < table[i].length; j++) {
            if (!table[j][i].val || table[j][i].val !== table[0][i].val) {
                colIsWinner = false;
            }
        }
        if (colIsWinner) {
            return table[0][i].val;
        }
    }
};

var checkNegSlope = function (table) {
    var winner = table[0][0].val;

    for (var i = 0; i < table.length; i++) {
        if (!table[i][i].val || table[i][i].val !== winner) {
            winner = false;
            break;
        }
    }

    return winner;
};

var checkPosSlope = function (table) {
    var lastIdx = table.length - 1;
    var winner = table[0][lastIdx].val;

    for (var i = 0; i < table.length; i++) {
        if (!table[i][lastIdx-i].val || table[i][lastIdx-i].val !== winner) {
            winner = false;
            break;
        }
    }

    return winner;
};
