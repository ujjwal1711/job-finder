const Utils = require('../utils/utils');
const Model = require('../model/model');
const utils = new Utils();
const model = new Model();


let handlers = {
	// eslint-disable-next-line consistent-return
	updateProfile: async (req, resp) => {
		const profile = {
			email: req.body.email,
			name : req.body.name,
			year : req.body.year,
			linkedInProfile : req.body.linkedInProfile,
			otherLinks : req.body.otherLinks,
			resume : req.body.resume,
			status : req.body.status,
			company : req.body.company,
			positionOffered : req.body.positionOffered,
			revokedLetter : req.body.revokedLetter,
			avatar: req.body.avatar,
			isverified: false,
			updatedOn: new Date().toString()
		};
		if (!utils.isValidUpdateReq(profile)) {
			return resp.status(400).json({ msg: 'Bad Request' });
		}

		const params = {
			TableName: 'Profile',
			Item: profile
		};

		await model.updateProfile(profile)
			.then(() => {
				return resp.status(200).json({ msg: 'successfully updated profile' });
			})
			.catch(error => {
				return resp.status(500).json({ msg: 'Internal Server Error' });
			});
	},

	getProfile: async (req, resp) => {
		let email = req.body.email;
		console.log(email);
		await model.getProfile(email)
			.then((data) => {
				let userData = data.Item;
				return resp.status(200).json({ profile: userData });
			})
			.catch(error => {
				console.log(error);
				return resp.status(500).json({ msg: 'Internal Server Error' });
			});
	}
};
module.exports = handlers;
