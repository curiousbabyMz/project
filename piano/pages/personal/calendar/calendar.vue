<template>
	<view class="calendar">
		<calendar ref='calendar' :SundayFirst="true" :marks='marks' @change='calendarChange' @dateChange='dateSelect'></calendar>
		<view class="dateInfo flex" v-if="dateInfo.length>0">
			<view class="pannel">
				<view class="clock">
					<view class="circle"></view>
					<view :class="['flex','progress']">
						<view class="mask">
							<view class="circle" :style="{clipPath:dateInfo[currentProgress].clipPath,transform:dateInfo[currentProgress].rotate}"></view>
						</view>
					</view>
					<view class="inside">
						<text>{{12>(dateInfo[currentProgress].start[0]+dateInfo[currentProgress].start[1])-0 ?'AM':'PM'}}</text>
					</view>
					<view :class="'hour'+i" v-for="(item,i) in 12" :key='i'></view>
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
		formateTime
	} from '../../../utils/default.js'
	import {
		getLogs,
		getSumInfo,
	} from "../../../api/api.js"
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
			time2Deg(start, end) {
				let [sh, sm, ss] = start.split(':'),
					[eh, em, es] = end.split(':'),
					startDate = new Date(2000, 0, 0, sh, sm, ss),
					endDate = new Date(2000, 0, 0, eh, em, es),
					duration = endDate.getTime() - startDate.getTime();
				let deg = (duration / 1000 / 60 / 60 - 12) / 12 * 360,
					x = 50 + Math.sin(Math.PI / 180 * deg) * Math.sqrt(5000),
					y = 50 - Math.cos(Math.PI / 180 * deg) * Math.sqrt(5000)
				return {
					deg,
					x: x > 100 ? 100 : (x < 0 ? 0 : x),
					y: y > 100 ? 100 : (y < 0 ? 0 : y)
				}
			},
			calendarChange(e) {
				console.log(e);
			},
			dateSelect(e) {
				console.log(e);
				getLogs({
						data: {
							start: `${e.year}/${e.month<10?'0'+e.month:e.month}/${e.date<10?'0'+e.date:e.date}`,
							end: `${e.year}/${e.month<10?'0'+e.month:e.month}/${e.date<10?'0'+e.date:e.date}`,
						},
						wxCloud: true
					})
					.then(r => {
						this.currentProgress = 0;
						this.dateInfo = r.result.data.map(each => {
							each.long = new Date(0, 0, 0);
							let duration = new Date(each.end).getTime() - new Date(each.start).getTime();
							each.long.setSeconds(duration / 1000);
							each.long = formateTime(each.long).slice(-8);
							each.start = each.start.slice(-8);
							each.end = each.end.slice(-8);
							let {
								deg
							} = this.time2Deg('0:0:0', each.start);
							let {
								x,
								y
							} = this.time2Deg(each.start, each.end);

							each.rotate = `rotate(${deg}deg)`;
							each.clipPath = `polygon(50% 50%,50% 0,${x}% ${y}%)`;
							// let start = this.time2Deg(each.start),
							// 	end = this.time2Deg(each.end);
							// each.clipPath = `polygon(50% 50%,${start.x}% ${start.y}%,${end.x}% ${end.y}%)`;
							return each;
						});
					})
			},
			progressChange(i) {
				this.currentProgress = i;
			},
			getLogs() {
				getLogs({
						data: {
							// size:20
						},
						wxCloud: true,
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
					.catch(e => {})
			},
			getSumInfo() {
				getSumInfo({
						wxCloud: true,
						log: true
					})
					.then(r => {
						this.sumDay = r.result.sumDay;
						this.sumTime = r.result.sumTime;
					})
					.catch(e => {})
			}
		},
		onLoad() {},
		onShow() {
			this.getLogs()
			this.getSumInfo()
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../comm/color.less';


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

	.calendar {
		padding: 30rpx;
		color: #333333;

		.dateInfo {
			padding: 20rpx 0;
			animation: dateInfo 200ms ease-out forwards;

			.pannel {
				background: linear-gradient(135deg,#57CFF9,#1C5CD0);
				box-shadow: 0 0 5rpx 2rpx #e1e1e1;
				border-radius: 20rpx;
				padding: 20rpx;
				margin-right: 10rpx;

				.clock {
					@clockWidth: 280rpx;
					@clockWeight: 8rpx;
					@clockColor: RGB(47,76,136,.8);
					position: relative;
					width: @clockWidth;
					height: @clockWidth;

					.circle {
						position: absolute;
						margin: auto;
						left: 0;
						right: 0;
						top: 0;
						bottom: 0;
						width: @clockWidth;
						height: @clockWidth;
						box-sizing: border-box;
						// background: #e6ff00;
						// border: @clockWeight solid transparent;
						border-radius: 50%;
					}

					&>.circle {
						border: @clockWeight solid @clockColor;
						z-index: 1;
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
								transition: all .3s ease-out;
								width: @clockWidth;
								height: @clockWidth;
								background: radial-gradient(hsl(70, 100%, 50%), hsl(200, 100%, 50%))
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
						color: #E6F2E9;
						font-size: 24rpx;
						line-height: 1.8rem;
					}

					[class*=hour] {
						position: absolute;
						top: @clockWeight;
						left: 0;
						right: 0;
						margin: auto;
						width: @clockWeight;
						height: @clockWeight*2.2;
						background: @clockColor;
						border-radius: 0 0 50% 50%;
						transform-origin: 50% @clockWidth/2-@clockWeight*2/2 0;
					}

					.hour(@i)when(@i<12) {
						.hour@{i} {
							transform: rotate(@i*30deg);
						}

						.hour(@i+1);
					}

					.hour(0);
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
					background: #BAD6E7;
					padding: 10rpx;
					margin: 10rpx 0;
					border-radius: 10rpx;

					&>view:nth-of-type(2) {
						font-weight: bold;
					}
				}

				.selected {
					background: #CFECFE;
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
