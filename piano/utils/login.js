import {
	uniApi
} from '../lib/base.js'
import {
	cloudFn
} from '../lib/cloudFn.js'

export var
	login = async () => {
			let islogin = null;
			try {
				// #ifdef MP-WEIXIN
				let loginInfo = await cloudFn({
					name: 'login'
				});
				getApp().globalData.secretInfo = loginInfo.result;
				let setting = await uniApi({
					name: 'getSetting'
				});
				if (setting.authSetting[`scope.userInfo`]) {
					getApp().globalData[`userAuth`] = setting.authSetting[`scope.userInfo`];
					let {
						userInfo
					} = await uniApi({
						name: 'getUserInfo'
					})
					getApp().globalData[`userInfo`] = userInfo

					islogin = true;
				} else {
					islogin = false;
				}
				// #endif
				if (getApp().loginCB) {
					getApp().loginCB();
				}
				return islogin;
			} catch (e) {
				console.log(e);
			}
		},
		getUserAuth = function(e) {
			console.log(e);
			if ((/ok/).test(e.detail.errMsg)) {
				getApp().globalData.userInfo = e.detail.userInfo;
				this.$state.userAuth = true;
				return true;
			}
		}
