<template>
	<view>
		<view class="sumTime flex">
			<view class="hour">
				累计练习**小时
			</view>
			<view class="day">
				累计练习**天
			</view>
		</view>
		<calendar></calendar>
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
				items: [
					[{
						label: '一',
						id: 1
					}, {
						label: '二',
						id: 2
					}, {
						label: '三',
						id: 3
					}, ],
					[{
						label: 'abc',
						id: 7
					}]
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.sumTime {
		justify-content: space-between;
	}
</style>
