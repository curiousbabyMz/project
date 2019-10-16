<template>
	<view class="calendar">
		<view class="title">
			<Toggle class='toggle' :items='title.titleItems' :holder='title.holder' :index='title.index' @change='toggleChange'></Toggle>
		</view>
		<view class="date">
			<view class="week flex">
				<view v-for="(item,index) in week" :key="index">
					<view class="weekItem">{{item.label}}</view>
					<view class="dateItem" v-for="(date,i) in item.list" :key='i'>
						{{date}}
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
		data() {
			return {
				current: {
					date: null,
					month: null,
					year: null,
				},
				title: {
					holder: [null, null],
					index: [0, 0],
					titleItems: [
						[1],
						[1]
					]
				},
				week: [{
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
				}, {
					label: '日',
					id: 7,
					list: []
				}]
			};
		},
		created() {
			let now = new Date(),
				yearsNum = 50; //年份数

			this.title.titleItems[0] = Array(12).fill(1).map((each, i) => ({
				label: i + 1 + '月',
				id: i + 1
			}))
			this.title.titleItems[1] = Array(yearsNum).fill(1).map((each, i) => ({
				label: now.getFullYear() - yearsNum + 1 + i + '年',
				id: i + 1
			}))
			this.title.index[0] = now.getMonth();
			this.title.index[1] = 49;
			this.current.month = now.getMonth();
			this.current.year = now.getFullYear();
			this.getDates();
		},
		methods: {
			getDates() {
				this.week.map(each => {
					each.list = []
				})
				let first = new Date(this.current.year, this.current.month, 1),
					last = new Date(this.current.year, this.current.month, 0);
				Array(first.getDay() - 1).fill(0).map((each, i) => {
					this.week[i].list.push('');
				})
				Array(last.getDate()).fill(0).map((each, i) => i + 1)
					.map((each, i) => {
						this.week[(first.getDay() - 1 + i) % 7].list.push(each)
					})
				console.log(first);
			},
			toggleChange(e) {
				console.log(e);
				this.current[e.current] = e.index;
				this.getDates()
			}
		}
	}
</script>

<style lang="less" scoped>
	.week {
		padding: 0 30rpx;
		text-align: center;
		align-items: flex-start;

		&>view {
			flex: 1;
		}

		.weekItem {}

		.dateItem {
			height: 50rpx;
		}
	}
</style>
