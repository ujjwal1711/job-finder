let Model = require('../model/model');
let model = new Model();

class GetFeedLogic {
	getFeed(req) {
		return new Promise( async (resolve,reject) => {
			try{
				let offset = req.query.offset || null;
				let limit = Number(req.query.limit) || 10;
				let filterBy = req.query.filterBy || null;
				let filterValue = req.query.filterValue || null;
				let data = await model.feed(offset, limit, filterBy, filterValue);
				if(offset === null) {
					let totalCount = await model.getCount(filterBy,filterValue);
					data.totalCount = totalCount[0].totalCount;
				}
				return resolve(data);
			}
			catch(err) {
				console.log(err);
				return reject(err);
			}
		});
	}
}

module.exports = GetFeedLogic;
