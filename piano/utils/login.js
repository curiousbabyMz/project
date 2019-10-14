import {
	wxApi
} from './base.js'
import {
	wxCloudLogin
} from './cloudFn.js'


export var
	login = async () => {
			let islogin = null;
			// #ifdef MP-WEIXIN
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
			}
			let loginInfo = await wxCloudLogin();
			getApp().globalData.secretInfo = loginInfo;
			islogin = true;
			// #endif
			
			if (getApp().loginCB) getApp().loginCB();
			return islogin;
		},
		wxlogin = () => {
			return wxApi({
				name: 'login',
			})
		},
		getSetting = () => {
			return
		},
		getUserAuth = e => {
			console.log(e);
			getApp().globalData.userInfo = e.detail.userInfo;
			getApp().globalData[`userAuth`] = true;
			return (/ok/).test(e.detail.errMsg);
		},
		auth2Page = function() {
			this.userAuth = getApp().globalData.userAuth;
		}
