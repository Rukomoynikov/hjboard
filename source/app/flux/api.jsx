import request from 'superagent';

const getVerticals = () => {
	return request
		.get('/verticals')
}

 const removeVertical = (ID) => {
	return request
		.delete('/verticals/' + ID)
 }

 const removeHorizontal = (ID) => {
	return request
		.delete('/horizontals/' + ID)
 }

 const removeNote = (ID) => {
	return request
		.delete('/notes/' + ID)
 }

 const updateVertical = (ID, data) => {
	return request
		.put('/api/verticals/' + ID)
		.send(data)
		.set('Accept', 'application/json')
 }

const updateHorizontal = (ID, data) => {
	return request
		.put('/api/horizontals/' + ID)
		.send(data)
		.set('Accept', 'application/json')
 }

const getHorizontals = () => {
	return request
		.get('/horizontals')
}

const createVertical = (data) => {
	return request
		.post('/verticals/')
		.send(data)
		.set('Accept', 'application/json')
}

const createHorizontal = (data) => {
	return request
		.post('/horizontals/')
		.send(data)
		.set('Accept', 'application/json')
}

const getNotes = () => {
	return request
		.get('/notes')
}

const createNote = (data) => {
	return request
		.post('/notes/')
		.send(data)
		.set('Accept', 'application/json')
}

const updateNote = (ID, data) => {
	return request
		.put('/notes/' + ID)
		.send(data)
		.set('Accept', 'application/json')
}

const API = {
	getVerticals : getVerticals,
	getHorizontals : getHorizontals,
	getNotes : getNotes,
	updateVertical : updateVertical,
	removeVertical : removeVertical,
	createVertical : createVertical,
	createHorizontal : createHorizontal,
	updateHorizontal : updateHorizontal,
	removeHorizontal : removeHorizontal,
	createNote : createNote,
	removeNote : removeNote,
	updateNote : updateNote
}

export default API