const request = require('request');
class Utils {
	isValidUpdateReq(profile) {
		if (profile.email && profile.name && profile.year && profile.linkedInProfile && profile.resume && profile.status &&
				profile.company && profile.jobType && profile.jobTitle) {
			return true;
		}
		return false;
	}

	verifyToken(token){
		return new Promise((resolve, reject) =>  {
			const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
			const options = {
				url: url,
				method: 'GET',
				json: true
			};
			request(options, (err, response, body) => {
				if (err) {
					return resolve( { valid : false } );
				}
				if (response.statusCode != 200) {
					return resolve({valid : false});
				}
				if(body.email){
					return resolve({valid : true, email : body.email});
				}
				return resolve({valid : false});
			});
		});
	}
}

module.exports = Utils;
