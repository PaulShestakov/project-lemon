import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app.jsx'


class Index extends React.Component {
	render() {
		return (
			<App />
		);
	}
}

ReactDOM.render(<Index />, document.getElementById('root'));
