import React from 'react';
import {Col, Glyphicon, ButtonGroup, Button, Input, Modal} from 'react-bootstrap';

import Actions from '../../flux/actions.jsx'
import Horizontal from '../horizontal/index.jsx';

export default class Vertical extends React.Component {
	constructor (props) {
		super(props)
		this.state ={
			title : props.title,
			horizontals : props.horizontals,
			notes : props.notes,
			editiing : false,
			showModal : false,
			creatingNewHorizontal : false
		}
		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
		this.removeVertical = this.removeVertical.bind(this);
	}

	componentWillReceiveProps (newProps) {
		this.setState({
			horizontals : newProps.horizontals
		})
	}

	render () {
		if (this.state.editing) {
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
						<Button bsStyle="success" onClick={event => this.updateVertical() }><Glyphicon glyph="ok" /></Button>
					</h2>
					{this.renderModal()}
					{this.renderHorizontals()}
				</Col>
			)
		} else {
			return (
				<Col xs={2} md={2} className='vertical'>
					<h2>{this.state.title}
						<ButtonGroup className='edit-panel'>
							<Button bsSize="xsmall" onClick={event => this.setState({editing: true})}><Glyphicon glyph="pencil" /></Button>
							<Button bsSize="xsmall" onClick={event => this.setState({showModal: true})}><Glyphicon glyph="remove" /></Button>
							<Button bsSize="xsmall" onClick={event => Actions.createHorizontal({vertical: this.props.id})} ><Glyphicon glyph="plus-sign" /></Button>
						</ButtonGroup>
					</h2>
					{this.renderModal()}
					{this.renderHorizontals()}
					{this.renderNewHorizontalForm()}
				</Col>
			)
		}
	}

	renderHorizontals () {
		return this.state.horizontals.map(
			(horizontal) => {
				var notes = this.state.notes.filter(
					note => note.horizontal === horizontal.id
				)
				return (
					<Horizontal {...horizontal} key={horizontal.id} notes={notes} vertical={this.props.id} />
				)
			}
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
				<Button onClick={this.removeVertical}>Yes</Button>
			</Modal.Footer>
			</Modal>
		)
	}


	renderNewHorizontalForm () {
		if (this.state.creatingNewHorizontal) {
			return (
				<Horizontal {...{"title" : "New one", "id" : 0}} key={0} notes={[]}/>
			)
		} else {
			return null
		}
	}

	close () {
		this.setState({ showModal: false });
	}

	open () {
		this.setState({ showModal: true });
	}

	removeVertical () {
		Actions.removeVertical(this.props.id)
	}

	updateVertical () {
		this.setState({editing: false})
		var newVertical = {
			title : this.state.title
		}
		Actions.updateVertical(this.props.id, newVertical)
	}

}