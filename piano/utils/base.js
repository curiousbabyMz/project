export var
	wxApi = ({
		name,
		data
	}) => (
		new Promise((resolve, reject) => {
			wx[name](Object.assign(data || {}, {
				success: r => {
					console.log(r);
					resolve(r)
				},
				fail: e => {
					reject(e)
				}
			}))
		}))
