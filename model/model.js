const mysql = require('mysql');

const db = mysql.createPool({
	connectionLimit : 10,
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'jobFinder'
})

class Model{
	updateProfile(profile, updateIsVerified){
		return new Promise((resolve, reject) => {
			let query = `INSERT INTO PROFILE SET ? ON DUPLICATE KEY UPDATE linkedInProfile = ?, otherLinks = ?, resume = ?, avatar = ?, name = ?, updatedOn = ?`;
			if(updateIsVerified) {
				query += `, verifiedState = 0`;
			}
			db.query(query, [ profile, profile.linkedInProfile, profile.otherLinks, profile.resume, profile.avatar, profile.name, profile.registeredOn ], (err, result) => {
				if(err) {
					return reject(err);
				}
				return resolve(result);
			});
		});
	}

	getProfile(email) {
		return new Promise((resolve, reject) => {
			let query = ` SELECT * FROM PROFILE WHERE email = ?`;
			db.query(query, email,(err, result) => {
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
			let queryParamArray = [];
			for (let [key, value] of Object.entries(filterObject)) {
				if(value){
					query += `${key} = ? AND `;
					queryParamArray.push(value);
				}
			}
			query += `verifiedState = 1 ORDER BY registeredOn ASC LIMIT ? OFFSET ?`;
			queryParamArray.push(limit, offset);
			db.query(query, queryParamArray,(err, result) => {
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
			let queryParamArray = [];
			for (let [key, value] of Object.entries(filterObject)) {
				if(value){
					query += `${key} = ? AND `;
					queryParamArray.push(value);
				}
			}
			query += `verifiedState = 1`;
			db.query(query, queryParamArray, (err, result) => {
				if(err) {
					return reject(err);
				}
				return resolve(result);
			});
		});
	}
}

module.exports = Model;
