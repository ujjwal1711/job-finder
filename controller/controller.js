const Utils = require('../utils/utils');
const Model = require('../model/model');
const GetFeedLogic = require('../logic/getFeedLogic');
const utils = new Utils();
const model = new Model();
const getFeedLogic = new GetFeedLogic();


let handlers = {
	// eslint-disable-next-line consistent-return
	updateProfile: async (req, resp) => {

		let token = req.get('token-id');
		let email = req.body.email;

		let isValidToken = await utils.verifyToken(token,email);
		if(!isValidToken){
			return resp.status(400).json({ msg: 'Invalid Token' });
		}
		const profile = {
			email: email,
			name : req.body.name,
			year : req.body.year,
			linkedInProfile : req.body.linkedInProfile,
			otherLinks : req.body.otherLinks,
			resume : req.body.resume,
			stat : req.body.stat,
			company : req.body.company,
			positionOffered : req.body.positionOffered,
			revokedLetter : req.body.revokedLetter,
			avatar: req.body.avatar,
			isVerified: false,
			updatedOn: new Date().toString()
		};
		if (!utils.isValidUpdateReq(profile)) {
			return resp.status(400).json({ msg: 'Bad Request' });
		}
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
				return resp.status(500).json({ msg: 'Internal Server Error' });
			});
	},

	getFeed: async (req, resp) => {
		await getFeedLogic.getFeed(req)
			.then((data) => {
				//let userData = data.Item;
				return resp.status(200).json({ data: data });
			})
			.catch(error => {
				return resp.status(500).json({ msg: 'Internal Server Error' });
			});
	}
};
module.exports = handlers;
