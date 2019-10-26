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
			<view class="sea">
				<view class="sea1"></view>
				<view class="sea2"></view>
			</view>
		</view>
		<view class="exercise">
			<view @click="clockChange()">
				<view class="clockIn flex">
					<text :class="['icon_note',{play:exercise.clockState}]"></text>
					<view :class="['border',{play:exercise.clockState}]"></view>
				</view>
				<!-- <view class="tip">
					<text v-if="!exercise.clockState">开始练琴</text>
					<text v-else>结束练琴</text>
				</view> -->
			</view>
			<view class="timeing">
				<view class="duration">{{exercise.duration.slice(-8)}}</view>
				<view class="progress">
					<view :class="['point',{done:exercise.start}]"></view>
					<view :class="['line',{done:exercise.end}]"></view>
					<view :class="['point',{done:exercise.end}]"></view>
				</view>
				<view class="time">
					<view class="start">{{exercise.start.slice(-8)}}</view>
					<view class="end">{{exercise.end.slice(-8)}}</view>
				</view>
			</view>
		</view>
		<view class="menu">
			<view class="calendar item" @click="navTo({url:'../calendar/calendar',data:{a:1}})">
				<text class="label">
					我的足迹
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
		toast,
		navTo,
		formateTime
	} from '../../../utils/default.js'
	import {
		uploadLog
	} from '../../../api/api.js'
	export default {
		data() {
			return {
				userAuth: false,
				userInfo: null,
				exercise: {
					clock: null,
					clockState: false,
					start: '',
					end: '',
					duration: '00:00:00',
					lessTime: 10 * 60
				}
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
			clockChange(history = false) {
				if (!history) this.exercise.clockState = !this.exercise.clockState;
				if (this.exercise.clockState) {
					console.log(this.exercise);
					this.exercise.end = '';
					this.exercise.clockState = true;
					this.exercise.uploaded = false;
					let tick = new Date(0, 0, 0, 0, 0, 1);
					if (history) {
						tick.setSeconds((new Date().getTime() - new Date(this.exercise.start).getTime()) / 1000)
					} else {
						this.exercise.start = formateTime(new Date());
					}
					console.log(this.exercise.start);
					this.exercise.duration = formateTime(tick)
					this.exercise.clock = setInterval(() => {
						tick.setSeconds(tick.getSeconds() + 1);
						// console.log(1);
						this.exercise.duration = formateTime(tick);
						if (tick.getHours() > 23) {
							this.clockChange();
						}
					}, 1000)
				} else {
					if (!history) {
						this.exercise.end = formateTime(new Date());
					}
					this.exercise.clockState = false;
					clearInterval(this.exercise.clock);
					this.updateLog();
				}
			},
			updateLog() {
				if (this.exercise.uploaded) return;
				let duration = new Date(this.exercise.end).getTime() - new Date(this.exercise.start).getTime();
				if (duration < this.lessTime * 1000) {
					toast({
						title: '练习时间少于5分钟不计入哦，请加油~',
						duration: 3000
					})
					return
				}
				uploadLog({
						data: {
							start: this.exercise.start,
							end: this.exercise.end,
							duration,
						}
					})
					.then(r => {
						this.exercise.uploaded = true;
						uni.setStorage({
							key: 'exercise',
							data: this.exercise
						})
					})
			}
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
			let history = uni.getStorageSync('exercise')
			if (history) {
				this.exercise = history;
				this.clockChange(true);
			}
		},
		onHide() {
			clearInterval(this.exercise.clock)
			uni.setStorage({
				key: 'exercise',
				data: this.exercise
			})
		},
		onUnload() {
			clearInterval(this.exercise.clock)
			uni.setStorage({
				key: 'exercise',
				data: this.exercise
			})
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../comm/flex.less';
	@import '../../../comm/color.less';

	.container {
		color: #333;

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
						box-shadow: 0 0 5rpx 5rpx rgba(68, 129, 187, 0.384);
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
			.sea1,
			.sea2 {
				position: absolute;
				top: -1850rpx;
				width: 2000rpx;
				height: 2000rpx;
				border-radius: 44% 46%;
				animation: 10s sea0 forwards infinite linear;
				// overflow: visible;
				background: rgba(138, 237, 255, 0.863);
			}

			.sea1 {
				background: rgba(255, 230, 177, 0.322);
				animation: 12s sea1 forwards infinite linear;
				top: 0;
				content: "";
			}

			.sea2 {
				background: rgba(93, 175, 251, 0.486);
				animation: 14s sea2 forwards infinite linear;
				top: 0;
				content: "";
			}
		}

		.white.button-hover {
			filter: brightness(0.8);
		}



		.exercise {
			height: 300rpx;

			.clockIn {
				@c: #41C3CC;

				position: relative;
				font-size: 50rpx;
				// width: 2em;
				height: 2em;
				// border-radius: 50%;
				// border: 4rpx solid @c;
				// border-color: @c #41CC96;
				color: @c ;
				margin: 30rpx auto 10rpx;


				&>text {
					position: absolute;
					font-size: inherit;
					animation-name: note;
					animation-duration: 0.8s;
					animation-iteration-count: infinite;
					animation-direction: alternate;
					animation-timing-function: ease-in-out;
					animation-play-state: paused;
				}

				.border {
					position: absolute;
					width: 2em;
					height: 2em;
					border-radius: 50%;
					border: 5rpx solid @c;
					border-color: @c #41CC96 #57AED6 #57BAD6;
					animation-name: noteBorder;
					animation-duration: 2s;
					animation-iteration-count: infinite;
					animation-timing-function: linear;
					animation-play-state: paused;
				}

				.play {
					animation-play-state: running;
				}
			}

			.tip {
				font-size: 28rpx;
				text-align: center;
				margin-bottom: 20rpx;
			}

			.timeing {
				font-size: 30rpx;

				.duration {
					line-height: 1.8rem;
					text-align: center;
					font-size: 32rpx;
				}

				.progress {
					.flex();

					.point {
						content: '';
						padding: 10rpx;
						border-radius: 50%;
						background: #E2E2E2;
						z-index: 1;
					}

					.line {
						width: 300rpx;
						height: 10rpx;
						background: #E2E2E2;
						margin: 0 -10rpx;
					}

					.done {
						background: #6C73FF;
					}
				}

				.time {
					.flex();
					justify-content: space-between;
					width: 450rpx;
					line-height: 2rem;
					margin: 0 auto;
				}
			}

		}

		.menu {
			margin-top: 50rpx;
			padding: 0 50rpx;
			font-size: 34rpx;
			line-height: 80rpx;

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

	@keyframes note {
		0% {
			transform: translateY(5rpx);
		}

		100% {
			transform: translateY(-5px);
		}
	}

	@keyframes noteBorder {
		0% {
			transform: none;
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.loop(@i)when(@i<3) {

		@keyframes ~'sea@{i}' {
			0% {
				transform: rotate(@i*20deg)
			}

			100% {
				transform: rotate(@i*20+360deg)
			}
		}

		.loop(@i+1);
	}

	.loop(0);
</style>
