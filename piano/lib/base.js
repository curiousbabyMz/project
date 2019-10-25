export var
	$await = promise => {
		return promise.then(r => {
			return [r, null]
		}).catch(e => {
			return [r, e]
		})
	},
	urlParse = (str) => {
		let [url, query] = str.split('?'),
			data = {};
		query.split('&').map(each => {
			let [key, value] = each.split('=');
			data[key] = value;
		})
		return {
			url,
			data
		};
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
