<template>
	<view class="calendar">
		<calendar :SundayFirst="true" :marks='marks' @change='calendarChange'></calendar>
		<view class="sumTime flex">
			<view class="hour">
				<text>已练习</text>
				<text class='time'>366</text>
				<text>小时</text>
			</view>
			<view class="day">
				<text>已练习</text>
				<text class='time'>12</text>
				<text>天</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import Calendar from '@/components/calendar.vue'
	export default {
		components: {
			Calendar,
		},
		data() {
			return {
				marks: [
					{
						date:3,
						month:10,
						year:2019,
					},
					{
						date:26,
						month:10,
						year:2019,
					},
					{
						date:12,
						month:10,
						year:2019,
					},
				]
			}
		},
		methods: {
			calendarChange(e) {
				console.log(e);
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../comm/color.less';

	.calendar {
		padding: 30rpx;
		color: #333333;

		.sumTime {
			margin-top: 30rpx;
			justify-content: space-between;
			font-size: 30rpx;
			line-height: 1.8rem;
			border-bottom: 1rpx solid @lineColor;
			.time{
				font-size: 38rpx;
				padding: 0 10rpx;
				color: #5DDCEB;
			}
		}
	}
</style>
