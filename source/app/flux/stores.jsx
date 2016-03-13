import Reflux from 'reflux';
import Actions from './actions.jsx';
import API from './api.jsx';
import uuid from 'uuid';

const state = {
	horizontals : [],
	verticals : [],
	notes : []
}

export const HorizontalsStore = Reflux.createStore({
	listenables : [Actions],

	getHorizontals () {
		this.trigger('getHorizontals', state.horizontals)
	},

	createHorizontal (data) {
		data.id = uuid.v1();
		state.horizontals.push(data);
		this.trigger('updateHorizontals', state.horizontals);
	},

	updateHorizontal (ID, data) {
		// API.updateHorizontal(ID, data)
		// 	.end(
		// 		(err, response) => {
		// 			// console.log(response)
		// 		}
		// 	)
	},

	removeHorizontal (ID) {
		var index;
		state.horizontals.forEach(
			(horizontal,i) => {
				if(horizontal.id == ID){ index = i}
			}
		)
		state.horizontals.splice(index,1)
		this.trigger('updateHorizontals', state.horizontals);
	}

})

export const VerticalsStore = Reflux.createStore({
	listenables : [Actions],

	getVerticals () {
		this.trigger('getVerticals', state.verticals);
	},

	removeVertical (ID) {
		var index;
		state.verticals.forEach(
			(vertical,i) => {
				if(vertical.id == ID){ index = i}
			}
		)
		state.verticals.splice(index,1)
		this.trigger('updateVerticals', state.verticals);
	},

	updateVertical (ID, data) {
		// var vertical = state.verticals.filter(vertical => vertical.id === ID)[0]
		// console.log(vertical)
		// for (var prop in data) {
		// 	console.log(data[prop])
		// }
	},

	createVertical (data) {
		data.id = uuid.v1();
		state.verticals.push(data);
		this.trigger('updateVerticals', state.verticals);
	}
})

	// 'removeNote',
	// 'createNote',
	// 'updateNote'

export const NotesStore = Reflux.createStore({
	listenables : [Actions],

	getNotes () {
		this.trigger('getNotes', state.notes)
	},

	createNote (data) {
		data.id = uuid.v1();
		state.notes.push(data);
		this.trigger('updateNotes', state.notes);
	},

	removeNote (ID) {
		var index;
		state.notes.forEach(
			(note,i) => {
				if(note.id == ID){ index = i}
			}
		)
		state.notes.splice(index,1)
		this.trigger('updateNotes', state.notes);
	},

	updateNote (ID, data) {
		// API.updateNote(ID, data)
		// 	.end(
		// 		(err, response) => {
		// 			// console.log(response)
		// 		}
		// 	)
	}

})