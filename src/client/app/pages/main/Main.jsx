import React from 'react';

import { Code, Header, Input } from '../../components/components.js'

import CodesService from '../../services/CodesService.js'
import CodesTransform from '../../transform/CodesTransform.js'

import './main.scss';


export default class Main extends React.Component {

	constructor(props) {
		super(props);

		const codes = CodesTransform.transformCodes(CodesService.getAll());

		this.state = {
			initialCodes: codes,
			filteredCodes: codes,
			nameQuery: '',
			priceQuery: '',
		};

		this.handleNameQueryChange = this.handleNameQueryChange.bind(this);
		this.handlePriceQueryChange = this.handlePriceQueryChange.bind(this);
		this.filterCodes = this.filterCodes.bind(this);
	}

	handleNameQueryChange(nameQuery) {
		this.setState({
			nameQuery,
			filteredCodes: this.filterCodes(this.state.initialCodes, nameQuery, this.state.priceQuery)
		})
	}

	handlePriceQueryChange(priceQuery) {
		this.setState({
			priceQuery,
			filteredCodes: this.filterCodes(this.state.initialCodes, this.state.nameQuery, priceQuery)
		})
	}

	filterCodes(initialCodes, name, price) {
		return initialCodes.filter(code => {
			let nameTest = true;
			let descriptionTest = true;
			let priceTest = true;

			if (name) {
				nameTest = new RegExp(name, 'i').test(code.code);
				descriptionTest = new RegExp(name, 'i').test(code.description);
			}
			if (price) {
				priceTest = code.fromPrice <= +price;
			}

			return (nameTest || descriptionTest) && priceTest
		})
	}

	render() {
		const { filteredCodes } = this.state;

		return (
			<React.Fragment>
				<Header />
				<main>
					<div className="listSearch">

						<div className="searchBlock">
							<Input
								placeholder="Search name..."
								className="input"
								value={this.state.nameQuery}
								onChange={this.handleNameQueryChange} />

							<Input
								placeholder="Enter max price..."
								className="input"
								value={this.state.priceQuery}
								onChange={this.handlePriceQueryChange} />
						</div>

						<div className="codeCardsList">
							{
								filteredCodes.map(code => {
									return (
										<Code
											code={code.code}
											description={code.description}
											fromPrice={code.fromPrice} />
									)
								})
							}
						</div>
					</div>
				</main>
				<footer>

				</footer>
			</React.Fragment>
		)
	}
}
