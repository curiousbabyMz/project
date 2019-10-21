<template>
	<view class="calendar">
		<calendar ref='calendar' :SundayFirst="true" :marks='marks' @change='calendarChange' @dateChange='dateSelect'></calendar>
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
				marks: [],
				sumTime: 0,
				sumDay: 0,
				exercises: []
			}
		},
		methods: {
			calendarChange(e) {
				console.log(e);
			},
			dateSelect(e) {
				console.log(e);
			},
			getLogDetail(time){
				
			},
			getLogs() {
				cloudFn({
						name: 'getLogs',
						data: {
							// size: 20,
						},
					})
					.then(r => {
						let marks = []
						this.exercises = r.result.data;
						this.exercises.map(each => {
							let date = new Date(each.start);
							marks.push({
								date: date.getDate(),
								month: date.getMonth() + 1,
								year: date.getFullYear()
							})
						})
						this.marks = [...new Set(marks)];
						//渲染先于赋值，原因未明
						let t = setTimeout(() => {
							this.$refs.calendar.getDates();
							clearTimeout(t)
						}, 0)
					})
			},
			getSumInfo() {
				cloudFn({
						name: 'getSumInfo',
						// log: true
					})
					.then(r => {
						this.sumDay = r.result.sumDay;
						this.sumTime = r.result.sumTime;
					})
			}
		},
		onLoad() {

		},
		onShow() {
			this.getLogs()
			this.getSumInfo()
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
