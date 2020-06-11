let Model = require('../model/model');
let model = new Model();

class GetFeedLogic {
	getFeed(req) {
		return new Promise( async (resolve,reject) => {
			try{
				let offset = req.query.offset || null;
				let limit = Number(req.query.limit) || 10;
				let filterExpression = 'stat = :val';
				let expressionAttributeValues = {
					':val': 'revoked'
				};
				let params = {
					TableName: 'Profile',
					FilterExpression: filterExpression,
					ExpressionAttributeValues: expressionAttributeValues,
					Limit: limit,
				};
				if (offset !== null) {
					let offsetstring = new Buffer.from(offset, 'base64').toString('ascii');
					let offsetObject = JSON.parse(offsetstring);
					params.ExclusiveStartKey = offsetObject;
				}
				let data = {};
				data = await model.feed(params)
				let finalResp = {};
				finalResp.feed = data.Items || [];
				if (data.LastEvaluatedKey){
					let buff = new Buffer.from(JSON.stringify(data.LastEvaluatedKey)).toString("base64");
					finalResp.offset = buff;
				}
				return resolve(finalResp);
			}
			catch(err) {
				console.log(err);
				return reject(err);
			}
		});
	}
}

module.exports = GetFeedLogic;
