import {
	urlParse,
	urlStringity
} from '../lib/base.js'
export var
	showPic = ({
		arr,
		i
	}) => {
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
		return uni.navigateTo({
			url: urlStringity({
				url,
				data
			})
		})
	},
	toast = data => {
		return uni.showToast(
			Object.assign({
				title: '操作成功',
				icon: 'none'
			}, data)
		)
	}
