import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';

import {Grid, Row, Col, ListGroup, ListGroupItem, Glyphicon, ButtonGroup, Button} from 'react-bootstrap';
import dragula from 'react-dragula';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
			title : ""
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
					this.setState({
						verticals : data,
						creatingNew : false
					})
				}
			}
		);
		HorizontalsStore.listen(
			(eventName, data) => {
				if(eventName === 'updateHorizontals') {
					this.setState({
						horizontals : data
					})
				}
			}
		);
		NotesStore.listen(
			(eventName, data) => {
				if(eventName === 'updateNotes') {
					this.setState({
						notes : data
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
					<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
						{this.renderVerticals()}
					</ReactCSSTransitionGroup>
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
			title : this.state.title,
		};
		this.setState({
			title : ""
		});
		Actions.createVertical(data)
	}

	componentDidMount () {
		window.dragula = dragula([], {
			moves: function (el, source, handle, sibling) {
				// console.log(el, source, sibling)
				return true; // elements are always draggable by default
			},
			accepts: function (el, target, source, sibling) {
				// console.log(el, target, source, sibling)
				return true; // elements can be dropped in any of the `containers` by default
			}
		});
		window.dragula.on('drop' , (el, target, source, sibling) => {
			var updatedNote = this.state.notes.filter(note => note.id == el.dataset.noteId)[0];
			updatedNote.vertical = target.parentElement.parentElement.parentElement.dataset.verticalId;
			updatedNote.horizontal = target.parentElement.parentElement.parentElement.dataset.horizontalId;
			Actions.updateNote(el.dataset.noteId, updatedNote)
		})
	}

	componentDidUpdate () {
		if (this.refs.input) {
			this.refs.input.focus()
			this.refs.input.selectionStart = this.state.title.length
		}
	}

}

ReactDOM.render(<Main />, document.querySelector('#app'))
