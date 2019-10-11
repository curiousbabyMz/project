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
		<calendar />
	</view>
</template>

<script>
	import Calendar from '@/components/calendar.vue'
	export default {
		components: {
			Calendar
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
.sumTime{
	justify-content: space-between;
}
</style>
