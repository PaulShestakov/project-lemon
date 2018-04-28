import React from 'react';

import './codeCard.scss';


export default class Code extends React.Component {
	render() {
		const { description, code, fromPrice } = this.props;

		return (
			<div className="code">
				<div className="codeItem">
					<span className="label">Code name: </span>
					<span>{code}</span>
				</div>
				<div className="codeItem">
					<span className="label">From price: </span>
					<span>{fromPrice}</span>
				</div>
				<div className="codeItem">
					<span className="label">Description: </span>
					<span>{description}</span>
				</div>
			</div>
		)
	}
}
