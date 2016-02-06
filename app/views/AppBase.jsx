'use strict';

let Store = require('../stores/Store');
let React = require('react/addons');
let Header = require('../views/Header.jsx');


let getState = _ => {
    return {

    };
}

let AppBaseView = React.createClass({
    getInitialState() {
        return getState();
    },

    componentDidMount() {
        Store.addSetCurrentUserListener(this._onUIChange);
    },

    componentWillUnmount() {
        Store.removeSetCurrentUserListener(this._onUIChange);
    },

    render() {
        return (
            <div>
            </div>
        );
    }
});

module.exports = AppBaseView;
