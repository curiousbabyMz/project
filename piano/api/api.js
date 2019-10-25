import {
	uniApi
} from '../lib/base.js';
import {
	cloudFn
} from '../lib/cloudFn.js';
// async function api({
// 	url,
// 	data,
// 	wxCloud,
// 	log = false,
// }) {
// 	try {
// 		if (wxCloud) {
// 			let r = await cloudFn({
// 				name: url,
// 				data
// 			})
// 			if (log) console.log(r);
// 			// return r
// 		} else {
// 			let r = await uniApi({
// 				name: 'request',
// 				data: {
// 					url,
// 					data
// 				}
// 			})
// 			if (log) console.log(r);
// 			// return r
// 		}
// 	} catch (e) {
// 		// TODO handle the exception
// 		console.log(e);
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
			.then(r=>{
				if(log)console.log(r)
				res(r);
			})
			.catch(e=>{
				rej(e);
			})
		} else {
			 uniApi({
				name: 'request',
				url,
				data,
			})
			.then(r=>{
				if(log)console.log(r)
				res(r);
			})
			.catch(e=>{
				rej(e);
			})
		}
	})
}
export var getLogs = ({
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
