import {
	uniApi,
	urlParse,
	urlStringity
} from '../lib/base.js'
export var
	showPic = ({
		arr,
		i
	}) => {
		return uniApi({
			name: 'previewImage',
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
		return uniApi({
			name: 'navigateTo',
			data: {
				url: urlStringity({
					url,
					data
				})
			}
		})
	},
	toast = data => {
		return uniApi({
			name: 'showToast',
			data: Object.assign({
				title: '操作成功',
				icon: 'none'
			}, data)
		})
	}
