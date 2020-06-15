let AWS = require("aws-sdk");
let awsConfig = {
	"region" : "ap-south-1",
	"endpoint" : "http://dynamodb.ap-south-1.amazonaws.com",
	"accessKeyId" : "AKIAIS3DDEBR27HJUGCA",
	"secretAccessKey" : "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"
};

AWS.config.update(awsConfig);

let dynamoDb = new AWS.DynamoDB.DocumentClient();

class Model{
	updateProfile(profile){
		return new Promise((resolve, reject) => {
			let query = `INSERT INTO PROFILE SET ? ON DUPLICATE KEY UPDATE linkedInProfile = "${profile.linkedInProfile}", otherLinks = '${profile.otherLinks}', resume = "${profile.resume}", avatar = "${profile.avatar}"`;
			db.query(query, profile, (err, result) => {
				if(err) {
					console.log(err);
					return reject(err);
				}
				return resolve(data);
			});
		});
	}

	getProfile(email) {
		return new Promise((resolve, reject) => {
			const params = {
				TableName: 'Profile',
				Key: {
					email: email
				}
			};
			dynamoDb.get(params, (err, data) => {
				if (err) {
					return reject(err);
				}
				console.log(data);
				return resolve(data);
			});
		});
	}

	feed(params) {
		return new Promise((resolve, reject) => {
			let query;
			if(filterBy) {
				query = `SELECT * FROM  PROFILE WHERE ${filterBy} = "${filterValue}" AND isVerified = 1 ORDER BY updatedOn DESC LIMIT ${limit}`;
			} else {
				query = `SELECT * FROM  PROFILE WHERE isVerified = 1 ORDER BY updatedOn DESC LIMIT ${limit}`;
			}
			if(offset){
				query +=  ` OFFSET ${offset}`;
			}
			db.query(query, (err, result) => {
				if(err) {
					console.log(err);
					return reject(err);
				}
				return resolve(data);
			});
		});
	}

	getCount(filterBy,filterValue) {
		return new Promise((resolve, reject) => {
			let query;
			if(filterBy) {
				query = `SELECT COUNT(*) AS totalCount FROM PROFILE WHERE ${filterBy} = "${filterValue}" AND isVerified = 0`;
			} else {
				query = `SELECT COUNT(*) AS totalCount FROM PROFILE WHERE isVerified = 0`;
			}
			db.query(query, (err, result) => {
				if(err) {
					return reject(err);
				}
				return resolve(result);
			});
		});
	}
}

module.exports = Model;
