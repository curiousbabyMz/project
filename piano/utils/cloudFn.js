import env from '../config/server.js'
wx.cloud.init({
	env
})
export var
	cloudFn = ({
		name,
		data
	}) => {
		return wx.cloud.callFunction({
				name,
				data
			})
			.then(r => {
				console.log(r)
				return r
			})
	},
	wxCloudLogin = () => {
		return cloudFn({
				name: 'login',
			})
			.then(r => {
				return r.result
			})
	}
