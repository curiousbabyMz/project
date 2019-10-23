<template>
	<view class="calendar">
		<calendar ref='calendar' :SundayFirst="true" :marks='marks' @change='calendarChange' @dateChange='dateSelect'></calendar>
		<view class="dateInfo flex" v-if="dateInfo.length>0">
			<view class="pannel">
				<view class="clock">
					<view class="circle"></view>
					<view class="progress flex" v-for="(item,i) in dateInfo" :key='i' v-if="i<1">
						<view class="left" >
							<view class="circle" :style="{clipPath:'polygon(50% 50%)'}"></view>
							<!-- <view class="circle" :style='{transform:"rotate("+((item.startDeg>180?item.startDeg:180)-315)+"deg)"}'></view> -->
						</view>
						<view class="right" >
							<view class="circle" :style='{transform:"rotate("+((item.startDeg>180?0:item.startDeg)-135)+"deg)",opacity:0}'></view>
						</view>
					</view>
					<view class="inside">
						<text>AM</text>
					</view>
					<view class="hour"></view>
				</view>
			</view>
			<view class="items">
				<view class="item" v-for="item in dateInfo" :key='item._id'>
					<view>{{item.start}}~{{item.end}}</view>
					<view>
						<text v-if="item.long.slice(0,2)>0">{{item.long.slice(0,2)}}小时</text>
						<text v-if="item.long.slice(3,5)>0">{{item.long.slice(3,5)}}分钟</text>
						<text v-if="item.long.slice(6)>0">{{item.long.slice(6)}}秒</text>
					</view>
				</view>
			</view>
		</view>
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
				dateInfo: null
			}
		},
		methods: {
			calendarChange(e) {
				console.log(e);
			},
			time2Deg(time) {
				let [h, m, s] = time.split(':'),
					date = new Date(2000, 0, 0, h, m, s),
					hour0 = new Date(2000, 0, 0),
					duration = date.getTime() - hour0.getTime();
				return (duration / 1000 / 60 / 60 - 12) / 12 * 360;
			},
			dateSelect(e) {
				console.log(e);
				cloudFn({
						name: 'getLogs',
						data: {
							start: `${e.year}/${e.month}/${e.date}`,
							end: `${e.year}/${e.month}/${e.date}`,
						}
					})
					.then(r => {
						this.dateInfo = r.result.data.map(each => {
							each.start = each.start.slice(-8);
							each.end = each.end.slice(-8);
							each.long = new Date(0, 0, 0);
							each.long.setSeconds(each.duration / 1000);
							each.long = each.long.toLocaleString('chinses', {
								hour12: false
							}).slice(-8);

							each.startDeg = this.time2Deg(each.start);
							each.endDeg = this.time2Deg(each.end);

							return each;
						});
					})
			},
			getLogs() {
				cloudFn({
						name: 'getLogs',
						data: {
							// size:20
						},
					})
					.then(r => {
						let marks = []
						r.result.data.map(each => {
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

		.dateInfo {
			padding: 20rpx 0;
			animation: dateInfo 200ms ease-out forwards;

			.pannel {
				background: #312A32;
				box-shadow: 0 0 5rpx 2rpx #e1e1e1;
				border-radius: 20rpx;
				padding: 20rpx;
				margin-right: 10rpx;

				.clock {
					position: relative;
					width: 250rpx;
					height: 250rpx;

					.circle {
						position: absolute;
						margin: auto;
						left: 0;
						right: 0;
						top: 0;
						bottom: 0;
						width: 250rpx;
						height: 250rpx;
						box-sizing: border-box;
						border: 5rpx solid #E6FF00;
						border-radius: 50%;
					}

					&>.circle {
						border-color: #D8D9DBdd;
					}

					.progress {
						position: absolute;
						margin: auto;
						left: 0;
						right: 0;
						top: 0;
						bottom: 0;
						width: inherit;
						height: inherit;

						.left {
							width: 50%;
							height: inherit;
							overflow: hidden;
							transform-origin: 100% 50% 0;
							position: relative;
							// transform: rotate(180deg);

							.circle {
								right: auto;
								// border-right-color: transparent;
								// border-top-color: transparent;
							}
						}

						.right {
							width: 50%;
							height: inherit;
							overflow: hidden;
							transform-origin: 0% 50% 0;
							position: relative;
							// transform: rotate(0deg);

							.circle {
								left: auto;
								border-left-color: transparent;
								border-bottom-color: transparent;
							}
						}
					}

					.inside {
						position: absolute;
						left: 0;
						right: 0;
						top: 10rpx;
						margin: auto;
						text-align: center;
						color: #BEC2CA;
						font-size: 24rpx;
						line-height: 1.8rem;
					}

					.hour {
						position: absolute;
						top: 5rpx;
						left: 0;
						right: 0;
						margin: auto;
						width: 8rpx;
						height: 15rpx;
						background: #D8D9DBdd;
						border-radius: 0 0 4rpx 4rpx;
					}
				}
			}

			.items {
				flex: 1;
				text-align: center;
				overflow-y: auto;
				height: 300rpx;
				margin: -10rpx 0;

				.item {
					line-height: 1.1rem;
					font-size: 26rpx;
					background: #CFECFE;
					padding: 10rpx;
					margin: 10rpx 0;
					border-radius: 10rpx;

					&>view:nth-of-type(2) {
						font-weight: bold;
					}
				}
			}
		}

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

	@keyframes dateInfo {
		0% {
			transform: translateY(-30rpx);
			opacity: 0;
		}

		100% {
			transform: none;
			opacity: 1;
		}
	}
</style>
