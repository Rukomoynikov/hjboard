import React from 'react';
import {Router, browserhistory, Route, hashHistory} from 'react-router'
import ReactDOM from 'react-dom';

import {Grid, Row, Col, Button, Jumbotron, Glyphicon} from 'react-bootstrap';
import Actions from './flux/actions.jsx';
import { BoardsStore } from './flux/stores.jsx';
import Board from './components/board/index.jsx';
import '../styles.css';

export default class Main extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			newBoardTitle : ""
		}
        BoardsStore.listen(
            (eventName, data) => {
                this.props.history.push('/board/' + data.name())
            }
        )
	}

	render () {
		return (
            <Grid>
                <Row className="show-grid">
                    <Jumbotron>
                        <Col xs={12} md={12}>
                            <h1>Board for anything!</h1>
                            <p>Hey hey hey, hurry up, try to create a board! And make you life better.</p>
                        </Col>

                        <Col xs={12} md={5}>
                            <input
                                className='form-control newBoardInput'
                                type='text'
                                value={this.state.newBoardTitle}
                                ref="boardInput"
                                onChange={ event => this.setState({newBoardTitle : event.target.value}) } />
                        </Col>
                        <Col xs={12} md={1}>
                            <Button bsStyle="success" onClick={event => Actions.createBoard({title : this.state.newBoardTitle})}>
                                <Glyphicon glyph="plus" /> Create
                            </Button>
                        </Col>
                    </Jumbotron>
                </Row>
            </Grid>
        );
	}
}

const Routes = (
    <Router history={browserhistory}>
    <Route path='/' component={Main} />
    <Route path='/board/:id' component={Board} />
    </Router>
)


ReactDOM.render(Routes, document.querySelector('#app'))
