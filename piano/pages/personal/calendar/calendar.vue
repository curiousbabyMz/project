<template>
	<view class="calendar">
		<calendar v-if="marks" :SundayFirst="true" :marks='marks' @change='calendarChange'></calendar>
		<view class="sumTime flex">
			<view class="hour">
				<text>已练习</text>
				<text class='time'>{{sumTime}}</text>
				<text>小时</text>
			</view>
			<view class="day">
				<text>已练习</text>
				<text class='time'>{{sumDay}}</text>
				<text>天</text>
			</view>
		</view>

	</view>
</template>

<script>
	import Calendar from '@/components/calendar.vue'
	import {
		cloudFn
	} from '../../../utils/cloudFn.js'
	export default {
		components: {
			Calendar,
		},
		data() {
			return {
				marks: null,
				sumTime: 0,
				sumDay: 0
			}
		},
		methods: {
			calendarChange(e) {
				console.log(e);
			},
			getLogs() {
				let theMonth = new Date().getMonth();
				cloudFn({
						name: 'getLogs',
						data: {
							// size: 20,
						},
					})
					.then(r => {
						let marks = [],
							sumTime = 0;
						r.result.data.map(each => {
							let date = new Date(each.start);
							if (date.getMonth() === theMonth) {
								marks.push({
									date: date.getDate(),
									month: date.getMonth() + 1,
									year: date.getFullYear()
								})
							}
							sumTime += (new Date(each.end).getTime() - date.getTime()) / 1000 / 60 / 60;
						})
						this.marks = [...new Set(marks)];
						this.sumTime = Math.floor(sumTime);
						this.sumDay = marks.length;
					})
			}
		},
		onLoad() {
			// this.getLogs()
		},
		onShow() {
			this.getLogs()
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

			.time {
				font-size: 38rpx;
				padding: 0 10rpx;
				color: #5DDCEB;
			}
		}
	}
</style>
