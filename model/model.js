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
			const params = {
				TableName: 'Profile',
				Item: profile
			};
			dynamoDb.put(params, (err, data) => {
				if (err) {
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
			dynamoDb.scan(params, (err, data) => {
				if (err) {
					console.log(err);
					return reject(err);
				}
				return resolve(data);
			});
		});
	}
}

module.exports = Model;
