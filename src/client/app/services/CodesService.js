import data from '../data/codes.json';

class CodesService {

	getAll() {
		return data.codes
	}

}

export default new CodesService()
