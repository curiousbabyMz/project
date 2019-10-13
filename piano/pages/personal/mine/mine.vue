<template>
	<view class="container">
		<view class="personal flex">
			<button class="login" @getuserinfo="getUserAuth" open-type="getUserInfo">
				<image :src="userInfo.avatarUrl" mode="aspectFill" v-if="userAuth" class="headImg"></image>
				<text class="headImg icon_person1" v-else></text>
				<view class="name">
					<text v-if="userAuth">{{userInfo.nickName}}</text>
					<text v-else>登录</text>
				</view>
			</button>
			<view class="sea"></view>
		</view>
		<div v-for="(item,index) in [1,2,3,4,5,0,6,7]" :key="index">
			{{ item }}
		</div>
	</view>
</template>

<script>
	import {
		getUserAuth,
		auth2Page
	} from '../../../utils/login.js'
	import {
		showPic,
	} from '../../../utils/default.js'
	export default {
		data() {
			return {
				userAuth: false,
				userInfo: null
			}
		},
		methods: {
			getUserAuth(e) {
				if (getUserAuth(e)) {
					this.userAuth = true;
					this.userInfo = getApp().globalData.userInfo;
				}
			},
			showPic
		},
		onLoad() {
			console.log('Mine onLoad');
			this.userInfo = getApp().globalData.userInfo;
			getApp().loginCB = () => {
				console.log('loginCB');
				auth2Page.call(this)
				this.userInfo = getApp().globalData.userInfo;
			}
		},
		onShow() {

		}
	}
</script>

<style lang="less">
	.container {
		.personal {
			flex-flow: column nowrap;
			background: #FFFFFF;
			position: relative;

			.login {
				margin-top: 100rpx;
				z-index: 1;

				.headImg {
					background: #FFFFFF;
					border-radius: 50%;
					font-size: 150rpx;
					width: 150rpx;
					height: 150rpx;
					color: #5daffb;
					border: 8rpx solid #5daffb;
				}

				.name {
					margin-top: 30rpx;
					font-size: 28rpx;
					color: #007AFF;
				}
			}

			.sea,
			.sea::before,
			.sea::after {
				position: absolute;
				top: -1850rpx;
				width: 2000rpx;
				height: 2000rpx;
				border-radius: 44% 46%;
				animation: 10s sea0 forwards infinite linear;
				// overflow: visible;
				background: #8aedffdc;
			}

			.sea:before {
				background: #ffe6b152;
				animation-duration: 12s;
				animation-name: 'sea1';
				top: 0;
				content: "";
			}

			.sea::after {
				background: #5daffb7c;
				animation-duration: 14s;
				animation-name: 'sea2';
				top: 0;
				content: "";
			}
		}

	}

	.loop(@i)when(@i<3) {

		@keyframes ~'sea@{i}' {
			0% {
				transform: rotate(@i*60deg)
			}

			100% {
				transform: rotate(@i*60+360deg)
			}
		}

		.loop(@i+1);
	}

	.loop(0);
</style>
