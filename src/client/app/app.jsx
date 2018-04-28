import React from 'react';
import Main from './pages/main/Main.jsx';


export default class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Main />
			</div>
		)
	}
}
