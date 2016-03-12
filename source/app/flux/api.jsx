import request from 'superagent';

const getVerticals = () => {
	return request
		.get('/verticals')
}

 const removeVertical = (ID) => {
	return request
		.delete('/verticals/' + ID)
 }

 const updateVertical = (ID, data) => {
	return request
		.put('/api/verticals/' + ID)
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

const getNotes = () => {
	return request
		.get('/notes')
}

const API = {
	getVerticals : getVerticals,
	getHorizontals : getHorizontals,
	getNotes : getNotes,
	updateVertical : updateVertical,
	removeVertical : removeVertical,
	createVertical : createVertical
}

export default API