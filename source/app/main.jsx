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
		this.state = {
			verticals : [],
			horizontals : [],
			notes : [],
			creatingNew : false,
			title : null
		}
		Reflux.all(HorizontalsStore, VerticalsStore, NotesStore)
			.listen((dataHorizontalsStore, dataVerticalsStore, dataNotesStore) => {
				this.setState({
					verticals : dataVerticalsStore[1],
					horizontals : dataHorizontalsStore[1],
					notes : dataNotesStore[1]
				})
			});
		VerticalsStore.listen(
			(eventName, data) => {
				if(eventName === 'updateVerticals') {
					console.log(data)
					this.setState({
						verticals : data,
						creatingNew : false
					})
				}
			}
		);
		HorizontalsStore.listen(
			(eventName, data) => {
				console.log(eventName, data);
				if(eventName === 'updateHorizontals') {
					this.setState({
						horinzontals : data
					})
				}
			}
		);
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
					{this.renderFormNewVertical()}
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
					<Vertical {...vertical} key={vertical.title + vertical.id} horizontals={horinzontals} notes={notes} />
				)
			}
		)
	}

	renderFormNewVertical () {
		if(this.state.creatingNew) {
			return (
				<Col xs={2} md={2} className='vertical'>
					<h2>
						<input
							className='form-control leftInput'
							type='text'
							value={this.state.title}
							ref="input"
							onChange={ event => this.setState({title : event.target.value}) }
						/>
						<Button bsStyle="success" onClick={event => this.addVertical() }><Glyphicon glyph="ok" /></Button>
					</h2>
				</Col>
			)
		} else {
			return (
				<Col xs={2} md={2} className='vertical'>
					<h2><Button bsStyle="success" onClick={event => this.setState({creatingNew : true})}><Glyphicon glyph="ok" /> Add</Button></h2>
				</Col>
			)
		}
	}

	addVertical () {
		var data = {
			title : this.state.title
		}
		Actions.createVertical(data)
	}

}

ReactDOM.render(<Main />, document.querySelector('#app'))