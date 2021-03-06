import {
	wxApi
} from './base.js'
import {
	wxCloudLogin
} from './cloudFn.js'

export var
	login = async () => {
			let islogin = null;
			try {
				// #ifdef MP-WEIXIN
				let loginInfo = await wxCloudLogin();
				getApp().globalData.secretInfo = loginInfo;
				let setting = await wxApi({
					name: 'getSetting'
				});
				if (setting.authSetting[`scope.userInfo`]) {
					getApp().globalData[`userAuth`] = setting.authSetting[`scope.userInfo`];
					let {
						userInfo
					} = await wxApi({
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
