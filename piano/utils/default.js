import {
	// wxApi,
	urlParse,
	urlStringity
} from './base.js'
export var
	showPic = ({
		arr,
		i
	}) => {
		// return wxApi({
		// 	name: 'previewImage',
		// 	data: {
		// 		urls: arr,
		// 		current: arr[i]
		// 	}
		// })
		return uni.previewImage({
			data: {
				urls: arr,
				current: arr[i]
			}
		})
	},
	navTo = ({
		url,
		data
	}) => {
		// return wxApi({
		// 	name: 'navigateTo',
		// 	url:urlStringity({
		// 		url,data
		// 	})
		// })
		return uni.navigateTo({
			url:urlStringity({
				url,data
			})
		})
	}
