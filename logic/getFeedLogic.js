let Model = require('../model/model');
let model = new Model();

class GetFeedLogic {
	getFeed(req) {
		return new Promise( async (resolve,reject) => {
			try {
				let offset = Number(req.query.offset) || 0;
				let limit = Number(req.query.limit) || 10;
				let filterObject = {};
				filterObject.jobType = req.query.jobType || null;
				filterObject.jobTitle = req.query.jobTitle || null;
				filterObject.year = req.query.year || null;
				let finalResp = {};
				let data = await model.feed(offset, limit, filterObject);
				let totalCount = await model.getCount(filterObject);
				finalResp.candidates = data.data;
				finalResp.offset = data.offset;
				finalResp.totalCount = totalCount[0].totalCount;
				return resolve(finalResp);
			}
			catch(err) {
				return reject(err);
			}
		});
	}
}

module.exports = GetFeedLogic;
