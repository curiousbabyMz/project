<template>
	<view class="calendar">
		<calendar ref='calendar' :SundayFirst="true" :marks='marks' @change='calendarChange' @dateChange='dateSelect'></calendar>
		<view class="dateInfo flex" v-if="dateInfo.length>0">
			<view class="pannel">
				<view class="clock">
					<view class="circle"></view>
					<view :class="['flex','progress'+i]" v-for="(item,i) in dateInfo" :key='i' v-if="i===currentProgress">
						<view class="mask">
							<view class="circle" :style="{clipPath:item.clipPath}"></view>
							<!-- <view class="circle" :style='{transform:"rotate("+((item.startDeg>180?item.startDeg:180)-315)+"deg)"}'></view> -->
						</view>
					</view>
					<view class="inside">
						<text>{{dateInfo<12?'AM':'PM'}}</text>
					</view>
					<view class="hour"></view>
				</view>
			</view>
			<view class="items">
				<view :class="['item',{selected:i===currentProgress}]" v-for="(item,i) in dateInfo" :key='item._id' @click="progressChange(i)">
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
				dateInfo: null,
				currentProgress: 0
			}
		},
		methods: {
			time2Deg(time) {
				let [h, m, s] = time.split(':'),
					date = new Date(2000, 0, 0, h, m, s),
					hour0 = new Date(2000, 0, 0),
					duration = date.getTime() - hour0.getTime();
				let deg = (duration / 1000 / 60 / 60 - 12) / 12 * 360,
					x = 50 + Math.sin(Math.PI / 180 * deg) * Math.sqrt(5000),
					y = 50 - Math.cos(Math.PI / 180 * deg) * Math.sqrt(5000)
				return {
					x: x > 100 ? 100 : (x < 0 ? 0 : x),
					y: y > 100 ? 100 : (y < 0 ? 0 : y)
				}
			},
			calendarChange(e) {
				console.log(e);
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
						this.currentProgress = 0;
						this.dateInfo = r.result.data.map(each => {
							each.start = each.start.slice(-8);
							each.end = each.end.slice(-8);
							each.long = new Date(0, 0, 0);
							each.long.setSeconds(each.duration / 1000);
							each.long = each.long.toLocaleString('chinses', {
								hour12: false
							}).slice(-8);

							let start = this.time2Deg(each.start),
								end = this.time2Deg(each.end);

							each.clipPath = `polygon(50% 50%,${start.x}% ${start.y}%,${end.x}% ${end.y}%)`;
							return each;
						});
					})
			},
			progressChange(i) {
				this.currentProgress = i;
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

	.loop(@i)when(@i<5) {
		.progress@{i} {
			.circle {
				border-color: hsl(@i*77+66, 100%, 50%)
			}
		}

		.loop(@i+1);
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

	@keyframes clockProgess {
		0% {
			transform: none;
		}

		100% {
			transform: scale(1.2);
		}
	}

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
					@clockWeight: 8rpx;

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
						border: @clockWeight solid #E6FF00;
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

						.mask {
							width: inherit;
							height: inherit;

							.circle {
								// animation: clockProgess .2s linear forwards 2 alternate;
							}
						}
					}

					.loop(0);

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
						top: @clockWeight;
						left: 0;
						right: 0;
						margin: auto;
						width: @clockWeight;
						height: @clockWeight*2.2;
						background: #D8D9DBdd;
						border-radius: 0 0 @clockWeight/2 @clockWeight/2;
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

				.selected {
					background: #BAD6E7;
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
</style>
