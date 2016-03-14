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
    var indices = [];
    for (var i = 0; i < table.length; i++) {
        var row = table[i];
        var isWinningRow = _.every(row, function (sq) {
            return sq.val && sq.val === row[0].val;
        });
        if (isWinningRow) {
            for (var k = 0; k < table.length; k++) {
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

var checkCols = function (table) {
    var indices = [];

    for (var i = 0; i < table.length; i++) {
        var colIsWinner = true;
        for (var j = 0; j < table[i].length; j++) {
            if (!table[j][i].val || table[j][i].val !== table[0][i].val) {
                colIsWinner = false;
            } else {

            }
        }
        if (colIsWinner) {
            for (var k = 0; k < table.length; k++) {
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

var checkNegSlope = function (table) {
    var winner = table[0][0].val;
    var indices = [];

    for (var i = 0; i < table.length; i++) {
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

var checkPosSlope = function (table) {
    var lastIdx = table.length - 1;
    var winner = table[0][lastIdx].val;
    var indices = [];

    for (var i = 0; i < table.length; i++) {
        indices.push([i, lastIdx-i]);
        if (!table[i][lastIdx-i].val || table[i][lastIdx-i].val !== winner) {
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
