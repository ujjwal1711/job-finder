let AWS = require("aws-sdk");
let awsConfig = {
	"region" : "ap-south-1",
	"endpoint" : "http://dynamodb.ap-south-1.amazonaws.com",
	"accessKeyId" : "AKIAJ7DP6RXLLHAB62WA",
	"secretAccessKey" : "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"
};

AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

class Model{
	updateProfile(profile){
		return new Promise((resolve, reject) => {
			const params = {
				TableName: 'Profile',
				Item: profile
			};
			docClient.put(params, (err, data) => {
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
			docClient.get(params, (err, data) => {
				if (err) {
					reject(err);
				}
				console.log(data);
				return resolve(data);
			});
		});
	}
}

module.exports = Model;
