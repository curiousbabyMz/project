<template>
	<view class="container">
		<view class="personal flex">
			<image class="headImg" src="/static/person.png" mode="widthFix"></image>
			<view class="name">
				<text v-if="isLogin">mz</text>
				<text v-else>登录</text>
			</view>
			<view class="sea">
				<!-- <view class="sea1"></view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		onLoad() {
			console.log('Mine onLoad');
		}
	}
</script>

<style lang="less">
	

	.container {
		.personal {
			flex-flow: column nowrap;
			background: #FFFFFF;
			position: relative;

			.headImg {
				margin-top: 100rpx;
				width: 200rpx;
				z-index: 1;
				flex-shrink: 0;
				background: #FFFFFF;
				border-radius: 50%;
			}

			.name {
				margin-top: 20rpx;
				font-size: 26rpx;
				color: #007AFF;
			}

			.sea,
			.sea::after {
				position: absolute;
				top: -1850rpx;
				width: 2000rpx;
				height: 2000rpx;
				border-radius: 40% 38%;
				animation: 9s sea forwards infinite linear;
				overflow: hidden;
				background: #8ac7ff;
			}

			.sea::after {
				background: #5daefb;
				animation-delay: 1s;
				top: 0;
				content: "";
			}
		}

		@keyframes sea {
			0% {}

			100% {
				transform: rotate(360deg)
			}
		}
	}
</style>
