const request = require('request');
class Utils {
	isValidUpdateReq(profile) {
		if (profile.email && profile.name && profile.year && profile.linkedInProfile && profile.resume && profile.status &&
				profile.company && profile.positionOffered) {
			return true;
		}
		return false;
	}

	verifyToken(token, email){
		return new Promise((resolve, reject) =>  {
			const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
			const options = {
				url: url,
				method: 'GET',
				json: true
			};
			request(options, (err, response, body) => {
				if (err) {
					return resolve(false);
				}
				if (response.statusCode != 200) {
					return resolve(false);
				}
				if(body.email != email){
					return resolve(false);
				}
				return resolve(true);
			});
		});
	}
}

module.exports = Utils;
