
class CodesService {

	getCodes() {
		return fetch('https://www.papajohns.by/api/stock/codes')
			.then(response => response.json())
			.then(data => data.codes)
	}

}

export default new CodesService()
