<template>
	<view class="container">
		<view class="personal flex">
			<button class="login" @getuserinfo="getUserAuth" open-type="getUserInfo">
				<view class="head">
					<image :src="userInfo.avatarUrl" mode="aspectFill" :class="{headIn:userAuth,headOut:!userAuth}" class="headImg"></image>
					<text class="headImg icon_person1" :class="{headIn:!userAuth,headOut:userAuth}"></text>
				</view>
				<view class="name">
					<text v-if="userAuth">{{userInfo.nickName}}</text>
					<text v-else>登录</text>
				</view>
			</button>
			<view class="sea"></view>
		</view>
		<view class="menu">
			<view class="calendar item" @click="navTo({url:'../calendar/calendar',data:{a:1}})">
				<text class="label">
					足迹
				</text>
				<text class="icon_arrowR"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserAuth,
		auth2Page
	} from '../../../utils/login.js'
	import {
		showPic,
		navTo
	} from '../../../utils/default.js'
	export default {
		data() {
			return {
				userAuth: false,
				userInfo: null,
			}
		},
		methods: {
			showPic,
			navTo,
			getUserAuth(e) {
				if (getUserAuth.call(this, e)) {
					this.userAuth = true;
					this.userInfo = getApp().globalData.userInfo;
				}
			},
		},
		onLoad() {
			console.log('Mine onLoad');
			this.$state.setWatch(this, 'userAuth', 'userAuth');
			this.userInfo = getApp().globalData.userInfo;
			getApp().loginCB = () => {
				console.log('loginCB');
				this.userInfo = getApp().globalData.userInfo;
			}
		},
		onShow() {

		}
	}
</script>

<style lang="less">
	@import '../../../comm/flex.less';
	@import '../../../comm/color.less';

	.container {
		.personal {
			flex-flow: column nowrap;
			background: #FFFFFF;
			position: relative;

			.login {
				margin-top: 100rpx;
				z-index: 1;
				overflow: visible;

				.head {
					position: relative;
					width: 1em;
					height: 1em;
					font-size: 150rpx;

					.headImg {
						position: absolute;
						left: 0;
						top: 0;
						background: #FFFFFF;
						border-radius: 50%;
						width: inherit;
						height: inherit;
						font-size: 150rpx;
						color: @defaultColor;
						box-shadow: 0 0 5rpx 5rpx #4481bb62;
						// border: 8rpx solid @defaultColor;
					}

					.headIn {
						transition: all 0.25s 0.25s ease-out;
						transform: none;
					}

					.headOut {
						transition: all 0.25s ease-out;
						transform: rotateY(90deg);
					}
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
				animation-duration: 11s;
				animation-name: 'sea2';
				top: 0;
				content: "";
			}
		}

		.menu {
			padding: 0 50rpx;
			font-size: 34rpx;
			line-height: 100rpx;
			color: #333333;

			&>.item {
				.flex();
				border-top: 1rpx solid @lineColor;
				justify-content: space-between;

				text {
					font-size: 34rpx;
				}

				&:nth-of-type(1) {
					border: none;
				}
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
