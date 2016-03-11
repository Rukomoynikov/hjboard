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
				this.trigger('getVerticals', state.verticals)
			})
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