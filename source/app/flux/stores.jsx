import Reflux from 'reflux';
import Actions from './actions.jsx';
import API from './api.jsx';

const state = {
	horizontals : [],
	verticals : [],
	notes : [],
    boards : [],
    currentBoardID : null
}

let firebaseRef = new Firebase("https://reactlearningbytodo.firebaseio.com/");

function getRef (type, boardID) {
    return firebaseRef.child(`boards/${boardID}/${type}`);
}

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

//verticalRef.on('child_added', (vertical) => {
//	console.log('child:added:vertical');
//	var newVertical = vertical.val();
//	newVertical.id = vertical.name();
//	state.verticals.push(newVertical);
//	VerticalsStore.trigger('updateVerticals', state.verticals);
//});
//
//verticalRef.on('child_removed', (vertical) => {
//	console.log('child:removed:vertical');
//	var ID = vertical.name();
//	var index;
//	state.verticals.forEach(
//		(vertical,i) => {
//			if(vertical.id == ID){ index = i}
//		}
//	);
//	state.verticals.splice(index,1);
//	VerticalsStore.trigger('updateVerticals', state.verticals);
//});
//
//verticalRef.on('child_changed', (vertical) => {
//	console.log('child:removed:changed');
//	var updatedVertical = vertical.val();
//	updatedVertical.id = vertical.name();
//
//	var ID = vertical.name();
//	var index;
//	state.verticals.forEach(
//		(vertical,i) => {
//			if(vertical.id == ID){ index = i}
//		}
//	);
//	state.verticals[index] = updatedVertical;
//	VerticalsStore.trigger('updateVerticals', state.verticals);
//});
//
//// "child_changed", "child_removed", or "child_moved."
//
//
//horizontalRef.on('child_added', (horizontal) => {
//	console.log('child:added:horizontal');
//	var newHorizontal = horizontal.val();
//	newHorizontal.id = horizontal.name();
//	state.horizontals.push(newHorizontal);
//	HorizontalsStore.trigger('updateHorizontals', state.horizontals);
//});
//
//horizontalRef.on('child_removed', (horizontal) => {
//	console.log('child:remove:horizontal');
//	var ID = horizontal.name();
//	var index;
//	state.horizontals.forEach(
//		(horizontal,i) => {
//			if(horizontal.id == ID){ index = i}
//		}
//	);
//	state.horizontals.splice(index,1);
//	HorizontalsStore.trigger('updateHorizontals', state.horizontals);
//});
//
//notesRef.on('child_added', (note) => {
//	console.log('child:added:note');
//	var newNote = note.val();
//	newNote.id = note.name();
//	state.notes.push(newNote);
//	NotesStore.trigger('updateNotes', state.notes);
//});
//
//notesRef.on('child_removed', (note) => {
//	console.log('child:remove:note');
//	var ID = note.name();
//	var index;
//	state.notes.forEach(
//		(note,i) => {
//			if(note.id == ID){ index = i}
//		}
//	);
//	state.notes.splice(index,1);
//	NotesStore.trigger('updateNotes', state.notes);
//});

const boardsRef = firebaseRef.child("boards");

boardsRef.on('child_changed', (board) => {
    console.log('child:added:board');
    var newBoard = board.val();
    newBoard.id = board.name();
    state.boards.push(board);
    BoardsStore.trigger('boardCreated', state.boards)
});

// STORES

export const BoardsStore = Reflux.createStore({
	listenables : [Actions],

	createBoard (data) {
		var newBoard = boardsRef.push();
        newBoard.set(data, (err, result) => {
			this.trigger('boardCreated', newBoard)
        })
	},

    setCurrentBoard (boardID) {
      state.currentBoardID = boardID;
    }

});

export const VerticalsStore = Reflux.createStore({
	listenables : [Actions],

	getVerticals () {
		this.trigger('getVerticals', state.verticals);
	},

	removeVertical (ID) {
		verticalRef.child(ID).remove();
	},

	updateVertical (ID, data) {
		verticalRef.child(ID).update(data);
	},

	createVertical (data) {
        let ref = getRef('verticals', state.currentBoardID);
        ref.push(data);
	}
});

export const HorizontalsStore = Reflux.createStore({
	listenables : [Actions],

	getHorizontals () {
		this.trigger('getHorizontals', state.horizontals)
	},

	createHorizontal (data) {
		horizontalRef.push(data)
	},

	updateHorizontal (ID, data) {
		horizontalRef.child(ID).update(data);
	},

	removeHorizontal (ID) {
		horizontalRef.child(ID).remove();
	}

})

export const NotesStore = Reflux.createStore({
	listenables : [Actions],

	getNotes () {
		this.trigger('getNotes', state.notes)
	},

	createNote (data) {
		notesRef.push(data)
	},

	removeNote (ID) {
		notesRef.child(ID).remove();
	},

	updateNote (ID, data) {
		notesRef.child(ID).remove();
	}

})
