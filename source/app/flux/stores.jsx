import Reflux from 'reflux';
import Actions from './actions.jsx';
import API from './api.jsx';
import uuid from 'uuid';

const state = {
	horizontals : [],
	verticals : [],
	notes : []
}

const firebaseRef = new Firebase("https://reactlearningbytodo.firebaseio.com/");

const verticalRef = firebaseRef.child("verticals");

// verticalRef.on("value", function(data) {
// 	console.log('on:value')
// 	if (data) {
// 		var verticals = data.val()
// 		for(var prop in verticals) {
// 			var vertical = verticals[prop];
// 			vertical.id = prop;
// 			state.verticals.concat([vertical])
// 		}
// 		VerticalsStore.trigger('updateVerticals', state.verticals);
// 	}
// });

verticalRef.on('child_added', (vertical) => {
	console.log('child:added:vertical')
	var newVertical = vertical.val();
	newVertical.id = vertical.name()
	state.verticals.push(newVertical);
	VerticalsStore.trigger('updateVerticals', state.verticals);
})

verticalRef.on('child_removed', (vertical) => {
	console.log('child:removed:vertical')
	var ID = vertical.name();
	var index;
	state.verticals.forEach(
		(vertical,i) => {
			if(vertical.id == ID){ index = i}
		}
	)
	state.verticals.splice(index,1)
	VerticalsStore.trigger('updateVerticals', state.verticals);
})

verticalRef.on('child_changed', (vertical) => {
	console.log('child:removed:changed')
	var updatedVertical = vertical.val();
	updatedVertical.id = vertical.name()

	var ID = vertical.name();
	var index;
	state.verticals.forEach(
		(vertical,i) => {
			if(vertical.id == ID){ index = i}
		}
	)
	state.verticals[index] = updatedVertical
	VerticalsStore.trigger('updateVerticals', state.verticals);
})

// "child_changed", "child_removed", or "child_moved."

const horizontalRef = firebaseRef.child("horizontals");

horizontalRef.on('child_added', (horizontal) => {
	console.log('child:added:horizontal')
	var newHorizontal = horizontal.val();
	newHorizontal.id = horizontal.name()
	state.horizontals.push(newHorizontal);
	HorizontalsStore.trigger('updateHorizontals', state.horizontals);
})

horizontalRef.on('child_removed', (horizontal) => {
	console.log('child:remove:horizontal')
	var ID = horizontal.name();
	var index;
	state.horizontals.forEach(
		(horizontal,i) => {
			if(horizontal.id == ID){ index = i}
		}
	)
	state.horizontals.splice(index,1)
	HorizontalsStore.trigger('updateHorizontals', state.horizontals);
})

const notesRef = firebaseRef.child("notes");

notesRef.on('child_added', (note) => {
	console.log('child:added:note')
	var newNote = note.val();
	newNote.id = note.name()
	state.notes.push(newNote);
	NotesStore.trigger('updateNotes', state.notes);
})

notesRef.on('child_removed', (note) => {
	console.log('child:remove:note')
	var ID = note.name();
	var index;
	state.notes.forEach(
		(note,i) => {
			if(note.id == ID){ index = i}
		}
	)
	state.notes.splice(index,1)
	NotesStore.trigger('updateNotes', state.notes);
})

export const VerticalsStore = Reflux.createStore({
	listenables : [Actions],

	getVerticals () {
		this.trigger('getVerticals', state.verticals);
	},

	removeVertical (ID) {
		verticalRef.child(ID).remove();
		// var index;
		// state.verticals.forEach(
		// 	(vertical,i) => {
		// 		if(vertical.id == ID){ index = i}
		// 	}
		// )
		// state.verticals.splice(index,1)
		// this.trigger('updateVerticals', state.verticals);
	},

	updateVertical (ID, data) {
		verticalRef.child(ID).update(data);
		// var vertical = state.verticals.filter(vertical => vertical.id === ID)[0]
		// console.log(vertical)
		// for (var prop in data) {
		// 	console.log(data[prop])
		// }
	},

	createVertical (data) {
		verticalRef.push(data)
		// data.id = uuid.v1();
		// state.verticals.push(data);
		// this.trigger('updateVerticals', state.verticals);
	}
})

export const HorizontalsStore = Reflux.createStore({
	listenables : [Actions],

	getHorizontals () {
		this.trigger('getHorizontals', state.horizontals)
	},

	createHorizontal (data) {
		horizontalRef.push(data)
		// data.id = uuid.v1();
		// state.horizontals.push(data);
		// this.trigger('updateHorizontals', state.horizontals);
	},

	updateHorizontal (ID, data) {
		horizontalRef.child(ID).update(data);
		// API.updateHorizontal(ID, data)
		// 	.end(
		// 		(err, response) => {
		// 			// console.log(response)
		// 		}
		// 	)
	},

	removeHorizontal (ID) {
		horizontalRef.child(ID).remove();
		// var index;
		// state.horizontals.forEach(
		// 	(horizontal,i) => {
		// 		if(horizontal.id == ID){ index = i}
		// 	}
		// )
		// state.horizontals.splice(index,1)
		// this.trigger('updateHorizontals', state.horizontals);
	}

})

export const NotesStore = Reflux.createStore({
	listenables : [Actions],

	getNotes () {
		this.trigger('getNotes', state.notes)
	},

	createNote (data) {
		notesRef.push(data)
		// data.id = uuid.v1();
		// state.notes.push(data);
		// this.trigger('updateNotes', state.notes);
	},

	removeNote (ID) {
		notesRef.child(ID).remove();
		// var index;
		// state.notes.forEach(
		// 	(note,i) => {
		// 		if(note.id == ID){ index = i}
		// 	}
		// )
		// state.notes.splice(index,1)
		// this.trigger('updateNotes', state.notes);
	},

	updateNote (ID, data) {
		notesRef.child(ID).remove();
		// API.updateNote(ID, data)
		// 	.end(
		// 		(err, response) => {
		// 			// console.log(response)
		// 		}
		// 	)
	}

})
