<template>
	<view class="calendar">
		<view class="title">
			<Toggle class='toggle' :items='title' @change='toggleChange'></Toggle>
		</view>
		<view class="date">
			<view class="week flex">
				<view v-for="(item,index) in week" :key="index">
					<view class="weekItem">{{item.label}}</view>
					<view class="dateItem flex" v-for="(day,i) in item.list" :key='i' @click="dayChange(day)">
						<view :class="['inside',{
							selected:day.date===date&&day.month===month&&day.year===year,
						now:(day.date==new Date().getDate()&&day.month==new Date().getMonth()&&day.year==new Date().getFullYear()),
						mark:day.mark
						}]">
							{{day.date}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toggle from '@/components/toggle.vue'
	export default {
		components: {
			Toggle
		},
		props: {
			SundayFirst: {
				type: Boolean,
				default: true
			},
			marks: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				date: null,
				month: null,
				year: null,
				current: null,
				title: {
					month: {
						holder: null,
						index: null,
						items: []
					},
					year: {
						holder: null,
						index: null,
						items: []
					}
				},
				week: [{
					label: '日',
					id: 0,
					list: []
				}, {
					label: '一',
					id: 1,
					list: []
				}, {
					label: '二',
					id: 2,
					list: []
				}, {
					label: '三',
					id: 3,
					list: []
				}, {
					label: '四',
					id: 4,
					list: []
				}, {
					label: '五',
					id: 5,
					list: []
				}, {
					label: '六',
					id: 6,
					list: []
				}]
			};
		},
		created() {
			let now = new Date(),
				yearsNum = 50; //年份数
			this.title.month.items = Array(12).fill(1).map((each, i) => ({
				label: i + 1 + '月',
				id: i
			}))
			this.title.year.items = Array(yearsNum).fill(1).map((each, i) => ({
				label: now.getFullYear() - yearsNum + 1 + i + '年',
				id: now.getFullYear() - yearsNum + 1 + i
			}))
			if (!this.SundayFirst) {
				this.week.push(this.week.shift());
			}


			this.current = now;
			// this.date = now.getDate()
			// this.month = now.getMonth()
			// this.year = now.getFullYear()

			this.title.month.index = now.getMonth();
			this.title.year.index = yearsNum - 1;
			this.getDates();
		},
		methods: {
			getDates() {
				this.week.map(each => {
					each.list = []
				})
				let first = new Date(this.current.getFullYear(), this.current.getMonth(), 1),
					last = new Date(this.current.getFullYear(), this.current.getMonth() + 1, 0);
				console.log(first, last);
				Array(first.getDay() - (this.SundayFirst ? 0 : 1)).fill(0).map((each, i) => {
					this.week[i].list.push({
						date: ''
					});
				})
				Array(last.getDate()).fill(0).map((each, i) => i + 1)
					.map((each, i) => {
						this.week[(first.getDay() - (this.SundayFirst ? 0 : 1) + i) % 7].list.push({
							date: each,
							month: this.current.getMonth(),
							year: this.current.getFullYear(),
							mark: this.marks.some(mark => (mark.date === each && mark.month === this.current.getMonth()+1 && mark.year ===
								this.current.getFullYear()))
						})
					})
			},
			toggleChange(e) {
				console.log(e);
				this.current['month' == e.toggle ? 'setMonth' : 'setFullYear'](e.value.id);
				this.getDates()
			},
			dayChange(day) {
				this.current.setDate(day.date)
				this.date = this.current.getDate()
				this.month = this.current.getMonth()
				this.year = this.current.getFullYear()
				this.$emit('change', this.current)
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../comm/color.less';

	.calendar {
		position: relative;
		padding: 10rpx 0 50rpx;

		&::before {
			filter: blur(2rpx);
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: -1;
			background-color: hsla(210, 66%, 18%, 0.2);
			border-radius: 10rpx;
		}

		.title {
			font-size: 30rpx;
			line-height: 2rem;
			color: #333;
		}

		.date {
			.week {
				padding: 0 30rpx;
				text-align: center;
				align-items: flex-start;
				color: #444;

				&>view {
					flex: 1;
				}

				.weekItem {
					font-size: 28rpx;
					border-bottom: 1rpx solid @lineColor;
					line-height: 2rem;
				}

				.dateItem {
					height: 80rpx;
					font-size: 26rpx;

					.inside {
						width: 60rpx;
						line-height: 60rpx;
						border-radius: 50%;
					}

					.now {
						border: 1rpx solid #F0AD4E;
					}

					.selected {
						background: #2c80ff;
						color: #fff;
						box-shadow: 0 1rpx 1rpx 1rpx #1e385044;
					}

					.mark {
						position: relative;

						&::after {
							content: '';
							bottom: -15rpx;
							position: absolute;
							border-radius: 50%;
							background: #35bfff;
							padding: 5rpx;
							left: 50%;
							transform: translate(-50%);
						}
					}
				}

			}
		}
	}
</style>
