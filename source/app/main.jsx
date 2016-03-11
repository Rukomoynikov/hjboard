import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';

import {Grid, Row, Col, ListGroup, ListGroupItem, Glyphicon, ButtonGroup, Button} from 'react-bootstrap';
import ColorPicker from 'react-color';
import dragula from 'react-dragula';

import {HorizontalsStore, VerticalsStore, NotesStore} from './flux/stores.jsx';
import Actions from './flux/actions.jsx';

import Vertical from './components/vertical/index.jsx';

export default class Main extends React.Component {
	constructor () {
		super()
		console.log(Vertical)
		this.state = {
			verticals : [],
			horizontals : [],
			notes : []
		}
		Reflux.all(HorizontalsStore, VerticalsStore, NotesStore)
			.listen((dataHorizontalsStore, dataVerticalsStore, dataNotesStore) => {
				this.setState({
					verticals : dataVerticalsStore[1],
					horizontals : dataHorizontalsStore[1],
					notes : dataNotesStore[1]
				})
			})
		Actions.getHorizontals();
		Actions.getVerticals();
		Actions.getNotes();
	}

	render () {
		var css = require('../styles.css')
		var dragulacss = require('../../node_modules/react-dragula/dist/dragula.min.css')
		return (
			<Grid fluid={true}>
				<Row className="show-grid">
					{this.renderVerticals()}
				</Row>
			</Grid>
		)
	}

	renderVerticals () {
		return this.state.verticals.map(
			(vertical) => {
				var horinzontals = this.state.horizontals.filter(
					horizontal => horizontal.vertical === vertical.id
				)
				var notes = this.state.notes.filter(
					note => note.vertical === vertical.id
				)
				return (
					<Vertical {...vertical} key={vertical.title} horizontals={horinzontals} notes={notes} />
				)
			}
		)
	}

}

ReactDOM.render(<Main />, document.querySelector('#app'))