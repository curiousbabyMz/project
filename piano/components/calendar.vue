<template>
	<view>
		<view class="title flex">
			<view class="month">
				{{month}}
			</view>
			<view class="year">
				{{year}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				month: '',
				year: ''
			};
		},
		mounted() {
			let now = new Date();
			this.month = now.getMonth();
			this.year = now.getFullYear();
		}
	}
</script>

<style>

</style>
