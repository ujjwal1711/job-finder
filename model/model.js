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
			let query = `INSERT INTO PROFILE SET ? ON DUPLICATE KEY UPDATE linkedInProfile = "${profile.linkedInProfile}", otherLinks = '${profile.otherLinks}', resume = "${profile.resume}", avatar = "${profile.avatar}"`;
			if(updateIsVerified) {
				query += `, isVerified = 0`;
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

	feed(offset, limit, filterBy, filterValue) {
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

	getCount(filterBy,filterValue) {
		return new Promise((resolve, reject) => {
			let query;
			if(filterBy) {
				query = `SELECT COUNT(*) AS totalCount FROM PROFILE WHERE ${filterBy} = "${filterValue}" AND isVerified = 1`;
			} else {
				query = `SELECT COUNT(*) AS totalCount FROM PROFILE WHERE isVerified = 1`;
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
