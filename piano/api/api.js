import {
	cloudFn
} from '../lib/cloudFn.js';
// async function api({
// 	url,
// 	data,
// 	wxCloud,
// 	log = false,
// }) {
// 	if (wxCloud) {
// 		let r = await cloudFn({
// 			name: url,
// 			data
// 		})
// 		if (log) console.log(r);
// 		// if (err) console.log(err);
// 		return r
// 	} else {
// 		let [err, r] = await uni.request({
// 			data: {
// 				url,
// 				data
// 			}
// 		})
// 		if (log) console.log(r);
// 		if (err) console.log(err);
// 		// return r
// 	}
// };
const api = ({
	url,
	data,
	wxCloud,
	log = false
}) => {
	return new Promise((res, rej) => {
		if (wxCloud) {
			cloudFn({
					name: url,
					data,
					log
				})
				.then(r => {
					if (log) console.log(r)
					res(r);
				})
				.catch(e => {
					rej(e);
				})
		} else {
			uni.request({
					url,
					data,
				})
				.then(r => {
					if (log) console.log(r)
					res(r);
				})
				.catch(e => {
					rej(e);
				})
		}
	})
}
export var
	getConfig = ({
		data,
		log,
		wxCloud = false
	}) => {
		return api({
			url: wxCloud ? 'config' : '',
			data,
			log,
			wxCloud
		})
	},
	getLogs = ({
		data,
		log,
		wxCloud = false
	}) => {
		return api({
			url: wxCloud ? 'getLogs' : '',
			data,
			log,
			wxCloud
		})
	},
	uploadLog = ({
		data,
		log,
		wxCloud = false
	}) => {
		return api({
			url: wxCloud ? 'uploadLog' : '',
			data,
			log,
			wxCloud
		})
	},
	getSumInfo = ({
		data,
		log,
		wxCloud = false
	}) => {
		return api({
			url: wxCloud ? 'getSumInfo' : '',
			data,
			log,
			wxCloud
		})
	}
