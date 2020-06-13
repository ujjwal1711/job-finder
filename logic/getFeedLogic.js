let Model = require('../model/model');
let model = new Model();

class GetFeedLogic {
	getFeed(req) {
		return new Promise( async (resolve,reject) => {
			try {
				let offset = Number(req.query.offset) || null;
				let limit = Number(req.query.limit) || 10;
				let filterBy = req.query.filterBy || null;
				let filterValue = req.query.filterValue || null;
				let data = await model.feed(offset, limit, filterBy, filterValue);
				return resolve(data);
			}
			catch(err) {
				return reject(err);
			}
		});
	}
}

module.exports = GetFeedLogic;
