import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';

import {Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import ColorPicker from 'react-color';

import {HorizontalsStore, VerticalsStore, NotesStore} from './flux/stores.jsx';
import Actions from './flux/actions.jsx';

export default class Main extends React.Component {
	constructor () {
		super()
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
				return (
					<Col xs={2} md={2} key={vertical.title} className='vertical'>
						<h2>{vertical.title}</h2>
						{this.renderHorizontals(vertical.id)}
					</Col>
				)
			}
		)
	}

	renderHorizontals (verticalID) {
		return this.state.horizontals.map(
			(horizontal) => {
				if (horizontal.vertical === verticalID){
					return (
						<Row className="show-grid" key={horizontal.title} className='horizontal'>
								<h3>{horizontal.title}</h3>
								{this.renderNotes(horizontal.id, verticalID)}
						</Row>
					)
				}
			}
		)
	}

	renderNotes (horizontalID, verticalID) {
		return (
			<ListGroup>
				{this.state.notes.map(
					(note) => {
						if(note.vertical === verticalID && note.horizontal === horizontalID){
							return (
								<ListGroupItem key={note.title}>{note.title}</ListGroupItem>
							)
						}
					}
				)}
			</ListGroup>
		)
	}
}

ReactDOM.render(<Main />, document.querySelector('#app'))