import React from 'react';
import {ListGroupItem} from 'react-bootstrap';

export default class Note extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			title : props.title	
		}
	}

	render () {
		return <ListGroupItem key={this.state.title}>{this.state.title}</ListGroupItem>
	}

}