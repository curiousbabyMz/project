<template>
	<view>
		<view class="title">
			<Toggle :items='title.titleItems' :holder='title.holder' :index='title.index' @change='toggleChange'></Toggle>
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
				title: {
					holder: [null, null],
					index: [0, 0],
					titleItems: [
						[1],
						[1]
					]
				}
			};
		},
		created() {
			let now = new Date();
			this.title.titleItems[0] = Array(12).fill(1).map((each, i) => ({
				label: i + 1 + '月',
				id: i + 1
			}))
			this.title.titleItems[1] = [{label:1,id:2}]
			this.title.index[0] = now.getMonth();
			this.year = now.getFullYear();
		},
		methods:{
			toggleChange(e){
				console.log(e);
			}
		}
	}
</script>

<style>

</style>
