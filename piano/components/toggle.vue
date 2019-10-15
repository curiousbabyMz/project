<template>
	<view>
		<view class="navBar flex" @click="toggleChange">
			<view v-for="(item,index) in items" :key="index" :data-i='index'>
				{{item[current[index]].label||holder[index]}}
			</view>
		</view>
		<view class="items" :class="{toggleIn:visible,toggleOut:!visible}" :style="{transitionDuration:animateTime+'ms'}" @click="itemChange">
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
				required: true,
			},
			holder: {
				default: null,
				type: Array
			},
			index: {
				default: null,
				type: Array,
			}
		},
		data() {
			return {
				indexToggle: -1,
				current: [0],
				visible: false,
				action: false,
				animateTime: 200
			};
		},
		mounted() {
			this.current = Array(this.items.length).fill(this.holder ? -1 : 0);
			if (this.index) this.current = this.index;
			console.log(this.current, this.index);
		},
		methods: {
			toggleChange(e) {
				let sw = this.indexToggle !== e.target.dataset.i;
				if (sw) {
					this.visible = sw;
					this.indexToggle = e.target.dataset.i
				} else {
					this.visible = sw;
					let t = setTimeout(() => {
						this.indexToggle = -1;
						clearTimeout(t);
					}, this.animateTime)
				}
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
		transition-property: all;
		transition-timing-function: ease-out;
		transform-origin: 50% 0 0;

		&>view {
			text-align: center;
		}
	}

	.toggleIn {
		transform: scaleY(1);
	}

	.toggleOut {
		transform: scaleY(0);
	}
</style>
