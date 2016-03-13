import React from 'react';
import {ListGroupItem, Button, Glyphicon, Modal} from 'react-bootstrap';

import Actions from '../../flux/actions.jsx'

export default class Note extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			title : props.title,
			editing : false,
			showModal : false
		}
	}

	render () {
		if (this.state.editing) {
			return (
					<div>
						<input
								className='form-control leftInput newNoteInput'
								type='text'
								value={this.state.title}
								ref="input"
								onChange={ event => this.setState({title : event.target.value}) }
							/>
						<Button bsStyle="success" onClick={event => this.updateNote() }><Glyphicon glyph="ok" /></Button>
					</div>
					)
		} else {
			return (<div className='note'>
				<ListGroupItem key={this.state.title} onClick={event => this.setState({editing: true})}>
					{this.state.title}
				</ListGroupItem>
				<Button bsSize="xsmall" className='removeNoteButton' onClick={event => this.setState({showModal : true})}><Glyphicon glyph="remove" /></Button>
				{this.state.showModal ? this.renderModal() : null}
			</div>)
		}

	}

	renderModal () {
		return (
			<Modal show={this.state.showModal} onHide={this.close}>
			<Modal.Header closeButton>
				<Modal.Title>Remove note "{this.state.title}" ? </Modal.Title>
			</Modal.Header>
			<Modal.Footer>
				<Button onClick={this.close}>No</Button>
				<Button onClick={event => this.removeNote()}>Yes</Button>
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

	removeNote() {
		this.setState({showModal: false})
		Actions.removeNote(this.props.id)
	}

	updateNote () {
		this.setState({
			editing : false			
		})
		var updatedNote = {
			title : this.state.title,
			vertical : this.props.vertical,
			horizontal : this.props.horizontal,
		}
		Actions.updateNote(this.props.id, updatedNote);
	}
}