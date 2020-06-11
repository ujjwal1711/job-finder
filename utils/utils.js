class Utils {
	isValidUpdateReq(profile) {
		if (profile.email && profile.name && profile.year && profile.LinkedInProfile && profile.resume && profile.stat &&
				profile.company && profile.positionOffered) {
			return false;
		}
		return true;
	}
}

module.exports = Utils;
