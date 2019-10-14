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
		})),
	urlParse = (str) => {
		let [url, query] = str.split('?'),
			data = {};
		query.split('&').map(each => {
			let [key, value] = each.split('=');
			data[key] = value;
		})
		return {url,data};
	},
	urlStringity = ({
		url,
		data
	}) => {
		let query = '';
		if (data) {
			Object.keys(data).map((each, i) => {
				query += `${i===0?'?':'&'}${each}=${data[each]}`
			})
		}
		return url + query;
	}
