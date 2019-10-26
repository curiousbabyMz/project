<template>
	<view class="toggle">
		<view class="navBar flex" @click="toggleChange">
			<view v-for="(item,index) in toggleItems" :key="index" :data-i='index'>
				{{item.items[item.index||0].label||item.holder}}
			</view>
		</view>
		<view class="items" :class="{toggleIn:visible,toggleOut:!visible}" :style="{transitionDuration:animateTime+'ms'}"
		 @click="itemChange">
			<view v-for="(item,index) in toggleItems[indexToggle].items" :key="index" :data-i='index'>
				{{item.label}}
			</view>
		</view>
		<view class="mask" v-if="indexToggle!==null" @click="toggleChange" :style="{opacity:mask?1:0}">
			<view :data-i='indexToggle'></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			items: {
				type: Object,
				required: true,
			},
			mask: {
				type: Boolean,
				value: false
			}
		},
		data() {
			return {
				indexToggle: null,
				toggleItems: null,
				// current: [0],
				visible: false,
				action: false,
				animateTime: 200
			};
		},
		mounted() {
			// console.log(this.items);
			this.toggleItems = this.items;
			return
			this.current = Array(this.items.length).fill(0);
			if (this.holder) this.current = this.holder.map(each => (each ? -1 : 0));
			if (this.index) this.current = this.index;
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
						this.indexToggle = null;
						clearTimeout(t);
					}, this.animateTime)
				}
			},
			itemChange(e) {
				let i = e.target.dataset.i;
				this.toggleItems[this.indexToggle].index = i;
				this.toggleChange({
					target: {
						dataset: {
							i: this.indexToggle
						}
					}
				})
				this.$emit('change', {
					index: i,
					value: this.toggleItems[this.indexToggle].items[i],
					toggle: this.indexToggle
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.toggle {
		position: relative;

		.navBar {
			// border-bottom: 1rpx solid #C8C7CC;

			&>view {
				flex: 1;
				text-align: center;
			}
		}

		.items {
			transition-property: all;
			transform-origin: 50% 0 0;
			max-height: 300rpx;
			overflow: auto;
			position: absolute;
			width: 100%;
			background: rgba(255, 255, 255, .7);
			z-index: 1;

			&>view {
				text-align: center;
			}
		}
	}

	.mask {
		view {
			width: 100vw;
			height: 100vh;
			position: fixed;
			background: rgba(0, 0, 0, 0.2);
		}
	}

	.toggleIn {
		transition-timing-function: ease-out;
		transform: scaleY(1);
	}

	.toggleOut {
		transition-timing-function: ease-in;
		transform: scaleY(0);
	}
</style>
