const Utils = require('../utils/utils');
const Model = require('../model/model');
const GetFeedLogic = require('../logic/getFeedLogic');
const utils = new Utils();
const model = new Model();
const getFeedLogic = new GetFeedLogic();


let handlers = {
	// eslint-disable-next-line consistent-return
	updateProfile: async (req, resp) => {
		const profile = {
			email: req.body.email,
			name : req.body.name,
			year : req.body.year,
			linkedInProfile : req.body.linkedInProfile,
			otherLinks : JSON.stringify(req.body.otherLinks),
			resume : req.body.resume,
			status : req.body.stat,
			company : req.body.company,
			positionOffered : req.body.positionOffered,
			revokedLetter : req.body.revokedLetter,
			avatar: req.body.avatar,
			isVerified: false,
			updatedOn: Number(new Date)
		};
		if (!utils.isValidUpdateReq(profile)) {
			return resp.status(400).json({ msg: 'Bad Request' });
		}

		await model.updateProfile(profile)
			.then(() => {
				return resp.status(200).json({ msg: 'successfully updated profile' });
			})
			.catch(error => {
				console.log(error);
				return resp.status(500).json({ msg: 'Internal Server Error' });
			});
	},

	getProfile: async (req, resp) => {
		let email = req.query.email;
		await model.getProfile(email)
			.then((data) => {
				return resp.status(200).json({ profile: (data[0] || {}) });
			})
			.catch(error => {
				console.log(error);
				return resp.status(500).json({ msg: 'Internal Server Error' });
			});
	},

	getFeed: async (req, resp) => {
		await getFeedLogic.getFeed(req)
			.then((data) => {
				return resp.status(200).json({ feed: data });
			})
			.catch(error => {
				console.log(error);
				return resp.status(500).json({ msg: 'Internal Server Error' });
			});
	}
};
module.exports = handlers;
