import env from '../config/server.js'
wx.cloud.init({
	env
})
export var
	cloudFn = ({
		name,
		data,
	}) => {
		return wx.cloud.callFunction({
				name,
				data
			})
			.then(r => {
				return r
			})
			.catch(e=>{
				console.log(e);
			})
	}
