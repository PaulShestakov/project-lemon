import React from 'react';

import { Code, Header, Input } from '../../components/components.js'

import CodesService from '../../services/CodesService.js'
import CodesTransform from '../../transform/CodesTransform.js'

import './main.scss';


export default class Main extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			initialCodes: [],
			filteredCodes: [],
			nameQuery: '',
			priceQuery: '',
		};

		this.handleNameQueryChange = this.handleNameQueryChange.bind(this);
		this.handlePriceQueryChange = this.handlePriceQueryChange.bind(this);
		this.filterCodes = this.filterCodes.bind(this);
	}

	componentDidMount() {
		CodesService.getCodes().then(codes => {
			const initialCodes = CodesTransform.transformCodes(codes)

			this.setState({
				isLoading: false,
				initialCodes,
				filteredCodes: initialCodes,
			})
		})
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
		}).sort((a, b) => {
			return b.fromPrice - a.fromPrice;
		})
	}

	render() {
		const { filteredCodes, isLoading } = this.state;

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
						{
							isLoading ? null : (
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
							)
						}
					</div>
				</main>
				<footer>

				</footer>
			</React.Fragment>
		)
	}
}
