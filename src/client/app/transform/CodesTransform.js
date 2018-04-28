

function getFromPrice(description) {
	const match = description.match(new RegExp('От (.*) рублей', 'i'));

	return match && +match[1] || null
}


class CodesTransformer {

	transformCodes(codes) {
		return codes.map(code => ({
			code: code.code,
			description: code.name,
			fromPrice: getFromPrice(code.name)
		}))
	}

}

export default new CodesTransformer()
