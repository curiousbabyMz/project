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
				let [err, setting] = await uni.getSetting()
				if (err) {
					console.log(err);
					return;
				}
				if (setting.authSetting[`scope.userInfo`]) {
					getApp().globalData[`userAuth`] = setting.authSetting[`scope.userInfo`];
					let [err, r] = await uni.getUserInfo()

					if (err) {
						console.log(err);
						return;
					}
					getApp().globalData[`userInfo`] = r.userInfo

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
