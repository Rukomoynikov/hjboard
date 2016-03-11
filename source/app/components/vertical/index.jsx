import React from 'react';
import {Col, Glyphicon, ButtonGroup, Button} from 'react-bootstrap';

import Horizontal from '../horizontal/index.jsx';

export default class Vertical extends React.Component {
	constructor (props) {
		super(props)
		this.state ={
			title : props.title,
			horizontals : props.horizontals,
			notes : props.notes
		}
	}

	render () {
		return (
			<Col xs={2} md={2} className='vertical'>
				<h2>{this.props.title}
					<ButtonGroup className='edit-panel'>
						<Button bsSize="xsmall"><Glyphicon glyph="pencil" /></Button>
						<Button bsSize="xsmall"><Glyphicon glyph="remove" /></Button>
					</ButtonGroup>
				</h2>
				{this.renderHorizontals()}
			</Col>
		)
	}

	renderHorizontals () {
		return this.state.horizontals.map(
			(horizontal) => {
				var notes = this.state.notes.filter(
					note => note.horizontal === horizontal.id
				)
				return (
					<Horizontal {...horizontal} key={horizontal.id} notes={notes}/>
				)
			}
		)
	}


}