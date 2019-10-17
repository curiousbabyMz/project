<script>
	import {
		login
	} from './utils/login.js'
	export default {
		globalData: {

		},
		onLaunch: function() {
			console.log('App Launch')
			this.$state.setState({
				userAuth: false
			})
			login()
				.then(r => {
					this.$state.userAuth = r;
				})
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
	  font-family: 'iconfont';  /* project id 1449661 */
	  src: url('//at.alicdn.com/t/font_1449661_p5isjlsv7v.eot');
	  src: url('//at.alicdn.com/t/font_1449661_p5isjlsv7v.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1449661_p5isjlsv7v.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1449661_p5isjlsv7v.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1449661_p5isjlsv7v.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1449661_p5isjlsv7v.svg#iconfont') format('svg');
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

	.icon_arrowR:before {
		content: '\e65c';
	}
	.icon_note:before{
		content:'\e624'
	}
</style>
