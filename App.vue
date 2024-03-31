<script>
	export default {
		globalData: {  
		            clientTabBarList: [
						{
							path: "pages/info/info",
							iconPath: "/static/icon-client-tabbar-03b.png",
							text: "逆海淘首页",
							index: 0
						},
						{
							path: "pages/claim/claim",
							iconPath: "/static/icon-client-tabbar-02a.png",
							text: "认领请求",
							index: 1
						},
						{
							path: "pages/userInfo/userInfo",
							iconPath: "/static/icon-client-tabbar-01b.png",
							text: "我的账户",
							index: 2
						}
						],
						
					adminTabBarList: [
						{
							path: "pages/info/info",
							iconPath: "/static/package.png",
							text: "包裹管理",
							index: 0
						},
						{
							path: "pages/claim/claim",
							iconPath: "/static/icon-client-tabbar-02b.png",
							text: "认领请求管理",
							index: 1
						},
						
						{
							path: "pages/box/box",
							iconPath: "/static/package.jpg",
							text: "箱子管理",
							index: 2
						},
						{
							path: "pages/cabinet/cabinet",
							iconPath: "/static/icon-info-07.png",
							text: "柜子管理",
							index: 3
						}
						],
						
						rootTabBarList: [
							{
								path: "pages/userInfo/userInfo",
								iconPath: "/static/package.png",
								text: "打印提货凭证",
								index: 0
							}
							
							],
						
						imageList: [{
								"image_src": " https://aoaofast.cn/images/wx/banner-01.jpg "
							},
							{
								"image_src": " https://aoaofast.cn/images/wx/banner-02.jpg "
							},
							{
								"image_src": " https://aoaofast.cn/images/wx/banner-03.jpg "
							},
						],
						range: [
						        { value: 1, text: "AB" },
						        { value: 2, text: "BC" },
						        { value: 3, text: "MB" },
						        { value: 4, text: "NS" },
						        { value: 5, text: "ON" },
						        { value: 6, text: "QC" }
						      ],
						uploadUrl:'https://aoaofast.cn',
						//uploadUrl:'http://10.0.0.168:8080'
						  
				     
		        },
				
		onLaunch: function() {
			console.log('App Launch')
			uni.hideTabBar({})
		},
		onShow: function() {
			console.log('App Show')
			uni.hideTabBar({})
		},
		onHide: function() {
			console.log('App Hide')
		},
		
		
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
