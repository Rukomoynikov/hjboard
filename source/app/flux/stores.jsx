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

export const NotesStore = Reflux.createStore({
	listenables : [Actions],

	getNotes () {
		API.getNotes()
			.end((err, response) => {
				state.notes = JSON.parse(response.text);
				this.trigger('getNotes', state.notes)
			})
	}
})