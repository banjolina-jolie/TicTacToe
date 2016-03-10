'use strict';

let Store = require('../stores/Store');
let React = require('react/addons');


let getState = _ => {
    return {

    };
}

let AppBaseView = React.createClass({
    getInitialState() {
        return getState();
    },

    componentDidMount() {
    },

    componentWillUnmount() {
    },

    buildRow() {
        var cols = [];
        for (var i = 0; i < 3; i++) {
            cols.push(<div className="third">hi</div>);
        }
        return cols;
    },

    buildTable() {
        var rows = [];

        for (var i = 0; i < 3; i++) {
            rows.push(
                <div>
                    <div className="table-row">
                        { this.buildRow() }
                    </div>
                </div>
            );
        }

        return rows;
    },

    render() {
        return (
            <div>
                { this.buildTable() }
            </div>
        );
    }
});

module.exports = AppBaseView;
