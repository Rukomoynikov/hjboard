import React from 'react';
import {Row, Col, Glyphicon, ButtonGroup, Button, ListGroup, ListGroupItem} from 'react-bootstrap';

import Note from '../note/index.jsx';

export default class Horizontal extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			title : props.title,
			notes : props.notes
		}
	}

	render () {
		return (
			<Row className="show-grid" key={this.state.title} className='horizontal'>
				<Col xs={12} md={12}>
					<h4>{this.state.title}
						<ButtonGroup className='edit-panel'>
							<Button bsSize="xsmall"><Glyphicon glyph="pencil" /></Button>
							<Button bsSize="xsmall"><Glyphicon glyph="remove" /></Button>
						</ButtonGroup>
					</h4>
					{this.renderNotes()}
				</Col>
			</Row>
		)
	}

	renderNotes () {
		return (
			<ListGroup>
				{this.state.notes.map(
					(note) => {
						return (
							<Note {...note} key={note.title} />
						)
					}
				)}
				<ListGroupItem>Добавить</ListGroupItem>
			</ListGroup>
		)
	}

}