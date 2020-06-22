const mysql = require('mysql');

const db = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'jobFinder'
});

db.connect((err) => {
	if(err){
		throw err;
	}
	console.log('mysql connected....');
});

class Model{
	updateProfile(profile, updateIsVerified){
		return new Promise((resolve, reject) => {
			let query = `INSERT INTO PROFILE SET ? ON DUPLICATE KEY UPDATE linkedInProfile = "${profile.linkedInProfile}", otherLinks = '${profile.otherLinks}', resume = "${profile.resume}", avatar = "${profile.avatar}", name = "${profile.name}", updatedOn = ${profile.registeredOn}`;
			if(updateIsVerified) {
				query += `, verifiedState = 0`;
			}
			db.query(query, profile, (err, result) => {
				if(err) {
					console.log(err);
					return reject(err);
				}
				return resolve(result);
			});
		});
	}

	getProfile(email) {
		return new Promise((resolve, reject) => {
			let query = ` SELECT * FROM PROFILE WHERE email = "${email}"`;
			db.query(query, (err, result) => {
				if(err) {
					return reject(err);
				}
				if(result.length === 0) {
					return resolve([]);
				}
				result[0].otherLinks = JSON.parse(result[0].otherLinks);
				return resolve(result);
			});
		});
	}

	feed(offset, limit, filterObject) {
		return new Promise((resolve, reject) => {
			let query = `SELECT * FROM PROFILE WHERE `;
			for (let [key, value] of Object.entries(filterObject)) {
				console
				if(key == 'year' && value) {
					query += `${key} = ${value} AND `;
				} else if(value){
					query += `${key} = "${value}" AND `;
				}
			}
			query += `verifiedState = 1 ORDER BY registeredOn ASC LIMIT ${limit} OFFSET ${offset}`;
			db.query(query, (err, result) => {
				if(err) {
					console.log(err);
					return reject(err);
				}
				result.forEach(element => {
					element.otherLinks = JSON.parse(element.otherLinks);
				});
				let finalResp = { data : result};
				if(result.length === limit) {
					finalResp.offset = offset ? offset + limit : limit;
				}
				return resolve(finalResp);
			});
		});
	}

	getCount(filterObject) {
		return new Promise((resolve, reject) => {
			let query = `SELECT COUNT(*) AS totalCount FROM PROFILE WHERE `;
			for (let [key, value] of Object.entries(filterObject)) {
				console
				if(key == 'year' && value) {
					query += `${key} = ${value} AND `;
				} else if(value){
					query += `${key} = "${value}" AND `;
				}
			}
			query += `verifiedState = 1`;
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
