'use strict';

let Dispatcher = require('../dispatcher/Dispatcher');
let EventEmitter = require('events').EventEmitter;
let Constants = require('../constants/Constants');
let assign = require('object-assign');

// Events
let SET_CURRENT_USER_EVENT = 'setCurrentUser';

// Persisted Values
let _currentUser = {};

// Persisted Value Modifiers
function setCurrentUser(model) {
	_currentUser = model;
}


// Store Methods
let Store = assign({}, EventEmitter.prototype, {

	emitChange(evt) {
		this.emit(evt);
	},

	getCurrentUser() {
		return _currentUser;
	},

	addSetCurrentUserListener(callback) {
		this.on(SET_CURRENT_USER_EVENT, callback);
	},

	removeSetCurrentUserListener(callback) {
		this.removeListener(SET_CURRENT_USER_EVENT, callback);
	}

});

// Register callback to handle all updates
Dispatcher.register(action => {

	switch(action.actionType) {

		case Constants.SET_CURRENT_USER:
			setCurrentUser(action.userModel);
			Store.emitChange(SET_CURRENT_USER_EVENT);
		break;

		default:
			// no op
	}
});

module.exports = Store;
