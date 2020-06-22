let Model = require('../model/model');
let model = new Model();

class GetFeedLogic {
	getFeed(req) {
		return new Promise( async (resolve,reject) => {
			try {
				let offset = Number(req.query.offset) || 0;
				let limit = Number(req.query.limit) || 10;
				let filterObject = {};
				filterObject.positionType = req.query.jobType || null;
				filterObject.positionTitle = req.query.jobTitle || null;
				filterObject.year = req.query.year || null;
				let data = await model.feed(offset, limit, filterObject);
				let totalCount = await model.getCount(filterObject);
				data.totalCount = totalCount[0].totalCount;
				return resolve(data);
			}
			catch(err) {
				return reject(err);
			}
		});
	}
}

module.exports = GetFeedLogic;
