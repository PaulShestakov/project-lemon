import React from 'react';
import PropTypes from 'prop-types';

import './input.scss';


export default class Input extends React.Component {

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.props.onChange(event.target.value)
	}

	render() {
		const { value, placeholder, className } = this.props;

		return (
			<input
				placeholder={placeholder}
				className={["input", className].join(' ')}
				value={value}
				onChange={this.handleChange} />
		)
	}
}

Input.propTypes = {
	value: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
};
