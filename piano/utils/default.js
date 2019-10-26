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
	},
<<<<<<< HEAD
	formateTime = (date) => {
=======
	formateTime = date => {
>>>>>>> db3df3497e59c6ca0bd0d9420c2617d270ce4f44
		let
			y = date.getFullYear(),
			m = date.getMonth(),
			d = date.getDate(),
			h = date.getHours(),
			min = date.getMinutes(),
			s = date.getSeconds();
<<<<<<< HEAD
=======

>>>>>>> db3df3497e59c6ca0bd0d9420c2617d270ce4f44
		m = m < 10 ? `0${m}` : m;
		d = d < 10 ? `0${d}` : d;
		h = h < 10 ? `0${h}` : h;
		min = min < 10 ? `0${min}` : min;
		s = s < 10 ? `0${s}` : s;
<<<<<<< HEAD
=======

>>>>>>> db3df3497e59c6ca0bd0d9420c2617d270ce4f44
		return `${y}/${m}/${d} ${h}:${min}:${s}`
	}
