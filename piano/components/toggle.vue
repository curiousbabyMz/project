<template>
	<view>
		<view class="navBar flex" @click="toggleChange">
			<view v-for="(item,index) in items" :key="index" :data-i='index'>
				{{item[current[index]].label||holder[index]}}
			</view>
		</view>
		<view class="items" @click="itemChange" v-if="visible">
			<view v-for="(item,index) in items[indexToggle]" :key="index" :data-i='index'>
				{{item.label}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			items: {
				type: Array,
			},
			holder:null,
			index: {
				type: Array,
			}
		},
		data() {
			return {
				indexToggle: -1,
				current: [0],
				visible: false,
			};
		},
		mounted() {
			this.current = Array(this.items.length).fill(this.holder ? -1 : 0);
			console.log(this.current, this.holder);
			if (this.index) this.current = this.index;
		},
		methods: {
			visibleChange(sw) {
				this.visible = sw
			},
			toggleChange(e) {
				let sw = this.indexToggle !== e.target.dataset.i;
				this.visibleChange(sw);
				this.indexToggle = sw ? e.target.dataset.i : -1;
			},
			itemChange(e) {
				this.current[this.indexToggle] = e.target.dataset.i;
				this.toggleChange({
					target: {
						dataset: {
							i: this.indexToggle
						}
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.navBar {
		border-bottom: 1rpx solid #C8C7CC;

		&>view {
			flex: 1;
			text-align: center;
		}
	}

	.items {
		&>view {
			text-align: center;
		}
	}
</style>
