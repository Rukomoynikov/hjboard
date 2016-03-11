import request from 'superagent';

const getVerticals = () => {
	return request
		.get('/verticals')

}

const getHorizontals = () => {
	return request
		.get('/horizontals')
}

const getNotes = () => {
	return request
		.get('/notes')
}

const API = {
	getVerticals : getVerticals,
	getHorizontals : getHorizontals,
	getNotes : getNotes
}

export default API