export var
	wxapi = ({
		name,
		data
	}) => (
		new Promise((resolve, reject) => {
			wx[name](Object.assign(data, {
				success: r => {
					resolve(r)
				},
				fail: e => {
					reject(e)
				}
			}))
		}))
