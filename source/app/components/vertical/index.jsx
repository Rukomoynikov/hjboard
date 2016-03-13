import React from 'react';
import {Col, Glyphicon, ButtonGroup, Button, Input, Modal} from 'react-bootstrap';
import ColorPicker from 'react-color';

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
			showColorPicker : false,
			backgroundColor : '#E3E0E2'
		}
		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
		this.removeVertical = this.removeVertical.bind(this);
	}

	componentWillReceiveProps (newProps) {
		this.setState({
			horizontals : newProps.horizontals,
			notes : newProps.notes
		})
	}

	render () {
		if (this.state.editing) {
			return (
				<Col xs={2} md={2} className='vertical' style={{backgroundColor : this.state.backgroundColor}}>
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
					{this.state.renderModal ? this.renderModal() : null}
					{this.renderHorizontals()}
				</Col>
			)
		} else {
			return (
				<Col xs={2} md={2} className='vertical' style={{backgroundColor : this.state.backgroundColor}}>
					<h2>{this.state.title}
						<ButtonGroup className='edit-panel'>
							<Button bsSize="xsmall" onClick={event => Actions.createHorizontal({vertical: this.props.id})} ><Glyphicon glyph="plus-sign" /></Button>
						</ButtonGroup>
						<ButtonGroup className='edit-panel'>
							<Button bsSize="xsmall" onClick={event => this.setState({showColorPicker: !this.state.showColorPicker})}><Glyphicon glyph="text-background" /></Button>
							<Button bsSize="xsmall" onClick={event => this.setState({editing: true})}><Glyphicon glyph="pencil" /></Button>
							<Button bsSize="xsmall" onClick={event => this.setState({showModal: true})}><Glyphicon glyph="remove" /></Button>
						</ButtonGroup>
					</h2>
					{this.state.showColorPicker ? <ColorPicker color={ this.state.backgroundColor } type="compact" onChange={ this.changeBackground.bind(this) } /> : null}
					{this.renderModal()}
					{this.renderHorizontals()}
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

	componentDidUpdate () {
		if (this.refs.input) {
			this.refs.input.focus()
			this.refs.input.selectionStart = this.state.title.length
		}
	}

	changeBackground (color) {
		this.setState({
			backgroundColor : '#' +color.hex
		})
	}

}