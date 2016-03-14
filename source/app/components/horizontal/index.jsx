import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Glyphicon, ButtonGroup, Button, ListGroup, ListGroupItem, Modal} from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Note from '../note/index.jsx';
import Actions from '../../flux/actions.jsx'

export default class Horizontal extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			title : props.title,
			notes : props.notes,
			showModal : false,
			creatingNote : false,
			editing: false,
			newNoteTitle : ""
		}
	}

	componentWillReceiveProps (newProps) {
		this.setState({
			notes : newProps.notes
		})
	}

	render () {
		return (
			<Row className="show-grid" key={this.state.title} className='horizontal' data-vertical-id={this.props.vertical} data-horizontal-id={this.props.id}>
				<Col xs={12} md={12}>
					{this.renderTitle()}
					{this.renderNotes()}
					{this.state.showModal ? this.renderModal() : null}
				</Col>
			</Row>
		)
	}

	renderTitle () {
		if (this.state.editing) {
			return (
				<h4>
					<input
						className='form-control leftInput'
						type='text'
						value={this.state.title}
						ref="input"
						onChange={ event => this.setState({title : event.target.value}) }
					/>
					<Button bsStyle="success" onClick={event => this.updateHorizontal() }><Glyphicon glyph="ok" /></Button>
				</h4>
			)
		} else {
			return (
				<h4>
					{this.state.title}
					<ButtonGroup className='edit-panel'>
						<Button bsSize="xsmall" onClick={event => this.setState({editing : true})}><Glyphicon glyph="pencil" /></Button>
						<Button bsSize="xsmall" onClick={event => this.setState({showModal: true})}><Glyphicon glyph="remove" /></Button>
					</ButtonGroup>
				</h4>
			)
		}
	}

	renderNotes () {
		return (
			<div><ListGroup ref={'ListGroup'}>
				<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				{this.state.notes.map(
					(note) => {
						return (
							<Note {...note} key={note.title} />
						)
					}
				)}
				</ReactCSSTransitionGroup>
				</ListGroup>
					{
						this.state.creatingNote ?
						(<div style={{textAlign: "center", marginTop : "10px"}} className='buttonAddNote'>
							<input
								className='form-control leftInput newNoteInput'
								type='text'
								value={this.state.newNoteTitle}
								ref="noteInput"
								onChange={ event => this.setState({newNoteTitle : event.target.value}) }
							/>
							<Button bsStyle="success" onClick={event => this.createNote()}><Glyphicon glyph="ok" /></Button>
						</div>)
						:
						(<Button bsStyle="success" onClick={event => this.setState({creatingNote : true})}><Glyphicon glyph="plus" />Добавить</Button>)
					}
			</div>
		)
	}

	renderModal () {
		return (
			<Modal show={this.state.showModal} onHide={this.close}>
			<Modal.Header closeButton>
				<Modal.Title>Remove  "{this.state.title}" ? </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				All notes included to this vertical will be removed too.
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.close}>No</Button>
				<Button onClick={event => this.removeHorizontal()}>Yes</Button>
			</Modal.Footer>
			</Modal>
		)
	}

	close () {
		this.setState({ showModal: false });
	}

	open () {
		this.setState({ showModal: true });
	}

	updateHorizontal () {
		this.setState({editing: false})
		var newHorizontal = {
			title : this.state.title,
			vertical : this.props.vertical
		}
		Actions.updateHorizontal(this.props.id, newHorizontal)
	}

	removeHorizontal () {
		this.setState({showModal: false})
		Actions.removeHorizontal(this.props.id)
	}

	createNote () {
		this.setState({
			creatingNote: false,
			newNoteTitle : ""
		})
		var newNote = {
			title : this.state.newNoteTitle,
			vertical : this.props.vertical,
			horizontal : this.props.id
		};
		Actions.createNote(newNote);
	}

	componentDidMount () {
		window.dragula.containers.push(ReactDOM.findDOMNode(this.refs.ListGroup))
	}

	componentDidUpdate () {
		window.dragula.containers.push(ReactDOM.findDOMNode(this.refs.ListGroup))
		if (this.refs.input) {
			this.refs.input.focus();
			this.refs.input.selectionStart = this.state.title ? this.state.title.length : 0;
		} else if (this.refs.noteInput) {
			this.refs.noteInput.focus();
			this.refs.noteInput.selectionStart = this.state.newNoteTitle.length;
		}
	}

}
