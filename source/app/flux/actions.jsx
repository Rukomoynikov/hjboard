import Reflux from 'reflux';

const Actions = Reflux.createActions([
	'getVerticals',
	'getHorizontals',
	'getNotes',

	'removeVertical',
	'updateVertical',
	'createVertical',

	'removeHorizontal',
	'createHorizontal',
	'updateHorizontal',

	'removeNote',
	'createNote',
	'updateNote'
])

export default Actions

