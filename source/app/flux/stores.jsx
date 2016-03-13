import Reflux from 'reflux';
import Actions from './actions.jsx';
import API from './api.jsx';

const state = {
	horizontals : [],
	verticals : [],
	notes : []
}

export const HorizontalsStore = Reflux.createStore({
	listenables : [Actions],

	getHorizontals () {
		API.getHorizontals()
			.end((err, response) => {
				state.horizontals = JSON.parse(response.text);
				this.trigger('getHorizontals', state.horizontals)
			})
	},

	createHorizontal (data) {
		API.createHorizontal(data)
			.end(
				(err, response) => {
					var newHorizontal = JSON.parse(response.text);
					state.horizontals.push(newHorizontal);
					this.trigger('updateHorizontals', state.horizontals);
				}
			)
	},

	updateHorizontal (ID, data) {
		API.updateHorizontal(ID, data)
			.end(
				(err, response) => {
					// console.log(response)
				}
			)
	},

	removeHorizontal (ID) {
		API.removeHorizontal(ID)
			.end(
				(err, response) => {
					state.horizontals = state.horizontals.filter(horizontal => horizontal.id !== ID);
					this.trigger('updateHorizontals', state.horizontals);
				}
			)
	}

})

export const VerticalsStore = Reflux.createStore({
	listenables : [Actions],

	getVerticals () {
		API.getVerticals()
			.end((err, response) => {
				state.verticals = JSON.parse(response.text);
				this.trigger('getVerticals', state.verticals);
			})
	},

	removeVertical (ID) {
		API.removeVertical(ID)
			.end(
				(err, response) => {
					state.verticals = state.verticals.filter(vertical => vertical.id !== ID);
					this.trigger('updateVerticals', state.verticals);
				}
			)
	},

	updateVertical (ID, data) {
		API.updateVertical(ID, data)
			.end(
				(err, response) => {
					// console.log(response)
				}
			)
	},

	createVertical (data) {
		API.createVertical(data)
			.end(
				(err, response) => {
					var newVertical = JSON.parse(response.text);
					state.verticals.push(newVertical);
					this.trigger('updateVerticals', state.verticals);
				}
			)
	}
})

	// 'removeNote',
	// 'createNote',
	// 'updateNote'

export const NotesStore = Reflux.createStore({
	listenables : [Actions],

	getNotes () {
		API.getNotes()
			.end((err, response) => {
				state.notes = JSON.parse(response.text);
				this.trigger('getNotes', state.notes)
			})
	},

	createNote (data) {
		API.createNote(data)
			.end(
				(err, response) => {
					var newNote = JSON.parse(response.text);
					state.notes.push(newNote);
					this.trigger('updateNotes', state.notes);
				}
			)
	},

	removeNote (ID) {
		API.removeNote(ID)
			.end(
				(err, response) => {
					state.notes = state.notes.filter(note => note.id !== ID);
					this.trigger('updateNotes', state.notes);
				}
			)
	},

	updateNote (ID, data) {
		console.log(ID, data)
		API.updateNote(ID, data)
			.end(
				(err, response) => {
					// console.log(response)
				}
			)
	}

})