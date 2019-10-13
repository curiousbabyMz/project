<script>
	import {
	login
	} from './utils/login.js'
	export default {
		globalData: {

		},
		onLaunch: function() {
			console.log('App Launch')
			login()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	.flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button {

		&,
		&::after {
			width: auto;
			line-height: auto;
			padding: 0;
			margin: 0;
			background: none;
			border: none;
			font-size: 0;
		}
	}

	.button-hover {
		background: none;
	}

	@font-face {
		font-family: 'iconfont';
		/* project id 1449661 */
		src: url('//at.alicdn.com/t/font_1449661_nyzqwtdm1s.eot');
		src: url('//at.alicdn.com/t/font_1449661_nyzqwtdm1s.eot?#iefix') format('embedded-opentype'),
			url('//at.alicdn.com/t/font_1449661_nyzqwtdm1s.woff2') format('woff2'),
			url('//at.alicdn.com/t/font_1449661_nyzqwtdm1s.woff') format('woff'),
			url('//at.alicdn.com/t/font_1449661_nyzqwtdm1s.ttf') format('truetype'),
			url('//at.alicdn.com/t/font_1449661_nyzqwtdm1s.svg#iconfont') format('svg');
	}

	[class*=icon] {
		font-family: "iconfont" !important;
		font-size: 16rpx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		line-height: 1.2em;
	}

	.icon_person1:before {
		content: "\e62e"
	}
</style>
