import env from '../config/server.js'
wx.cloud.init({
	env
})
export var
	cloudFn = ({
		name,
		data,
		log
	}) => {
		return wx.cloud.callFunction({
				name,
				data
			})
			.then(r => {
				if(log)console.log(r)
				return r
			})
	}
