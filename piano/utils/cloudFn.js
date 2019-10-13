wx.cloud.init({
	env: 'cloud1-dbe5a2'
})
var cloudFn = ({
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
}
export var
	wxCloudLogin = () => {
		return cloudFn({
				name: 'login',
			})
			.then(r => {
				return r.result
			})
	}
