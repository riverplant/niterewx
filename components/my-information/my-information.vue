<template>
	<view class="my-information-container">
		<!-- 通知区域 -->
		<image src="https://aoaofast.cn/images/wx/information-notice.jpg" class="notice-image"></image>

		<!-- list -->
		<view class="panel-list">

			<view class="panel">
				<view class="order-item-msg"></view>
				
				<view class="order-item-msg">
					<view class="order-item-sub-left">
						<image src="/static/note_icon.png" class="order-item-sub-icon"></image>
					</view>
					<view class="order-item-sub-right">
						<text>发货前请务必仔细阅读，选择逆海淘承运物品，即视同已知晓并同意本篇所有信息。</text>
					</view>
				</view>
				 
				<view class="panel-body">
					<uni-badge size="normal" absolute="rightTop" class="badge-style">
						<navigator class="panel-item" url="/subpkg/info/info01/info01">
							<image src="/static/icon-info-01.png" class="icon"></image>
							<text class="badge-text">操作指南</text>
						</navigator>
					</uni-badge>
					<uni-badge size="normal" absolute="rightTop" class="badge-style">
						<navigator class="panel-item" url="/subpkg/info/info02/info02">
							<image src="/static/icon-info-02.png" class="icon"></image>
							<text class="badge-text">国内收货仓地址</text>
						</navigator>
					</uni-badge>
					<uni-badge size="normal" absolute="rightTop" class="badge-style">
						<navigator class="panel-item" url="/subpkg/info/info03/info03">
							<image src="/static/icon-info-03.png" class="icon"></image>
							<text class="badge-text">提货点/送货分区</text>
						</navigator>
					</uni-badge>
					<uni-badge size="normal" absolute="rightTop" class="badge-style">
						<navigator class="panel-item" url="/subpkg/info/info04/info04">
							<image src="/static/icon-info-04.png" class="icon"></image>
							<text class="badge-text">计费方式</text>
						</navigator>
					</uni-badge>
				</view>
				<view class="panel-body">
					<uni-badge size="normal" absolute="rightTop" class="badge-style">
						<navigator class="panel-item" url="/subpkg/info/info05/info05">
							<image src="/static/icon-info-05.png" class="icon"></image>
							<text class="badge-text">禁运清单</text>
						</navigator>
					</uni-badge>
					<uni-badge size="normal" absolute="rightTop" class="badge-style">
						<navigator class="panel-item" url="/subpkg/info/info06/info06">
							<image src="/static/icon-info-06.png" class="icon"></image>
							<text class="badge-text">赔付条款</text>
						</navigator>
					</uni-badge>
					<uni-badge size="normal" absolute="rightTop" class="badge-style">
						<navigator class="panel-item" url="/subpkg/info/info07/info07">
							<image src="/static/icon-info-07.png" class="icon"></image>
							<text class="badge-text">货运流程</text>
						</navigator>
					</uni-badge>
					<uni-badge size="normal" absolute="rightTop" class="badge-style">
						<navigator class="panel-item" url="/subpkg/info/info08/info08">
							<image src="/static/icon-info-08.png" class="icon"></image>
							<text class="badge-text">关于自寄物品</text>
						</navigator>
					</uni-badge>
				
				</view>

			</view>


		</view>

	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				value: 9999

			};
		},

	
	}
</script>

<style lang="scss">
	.badge-style{
		width: 100rpx
	}
	.badge-text{
		align-items: center;
		text-align: center;
	}
	.my-information-container {
		height: 100%;
		background-color: #f4f4f4;

		swiper {
			height: 180px;

			.swiper-item,
			image {
				width: 100%;
				height: 100%;
			}
		}

		.top-box {
			height: 160px;
			background-color: #C00000;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.avatar {
				width: 90px;
				height: 90px;
				border-radius: 45px;
				border: 2px solid #FFF;
				box-shadow: 0 1px 5px black;
			}

			.nickname {
				font-size: 16px;
				color: #fff;
				font-weight: bold;
				margin-top: 10px;
			}
		}
	}

	.panel-list {
		padding: 0 10px;
		position: relative;
		top: -50rpx;

		.panel {
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;

			.panel-title {
				line-height: 45px;
				padding-left: 10px;
				font-size: 15px;
				border-bottom: 1px solid #F4F4F4;
			}

			.panel-body {
				display: flex;
				justify-content: space-around;

				.panel-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					padding: 10px 0;
					font-size: 13px;

					.icon {
						width: 80rpx;
						height: 80rpx;
					}
				}
			}
		}
	}

	.panel-list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 15px;
		padding: 0 10px;
		line-height: 45px;
	}

	.notice-image {
		display: flex;
		align-items: center;
		width: 750rpx;
	}
	
	.order-item {
	    width: 750rpx;
	    box-sizing: border-box;
	    //box-sizing: border-box;
	    display: flex;
	    padding: 10px 5 px;
	    border-bottom: 3px solid#f0f0f0;
	}
	.order-item-left {
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		}
	.order-pic {
		width: 150rpx;
		height: 150rpx;
		display: block;
		}
	.order-item-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		}
		
	.order-item-sub-left{
		display: flex;
		justify-content: space-between;
		align-items: center;
		}
	.order-item-sub-right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		}
	.order-item-sub-icon{
		margin-right: 10rpx;
		width: 30rpx;
		height: 30rpx;
		display: block;
		}
		
	.order-item-sub-right-price{
		width: 320rpx;
		font-weight: 800;
		text-align: right;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: #00a000;
		}
	.order-item-desc {
		display: flex;
		flex-direction: column;
		justify-content: space-between; 
		}
	.order-item-desc-text1 {
		margin-top: 20rpx;
		font-weight: 800;
		font-size: 30rpx;
		color: #000000;
		}
	.order-item-desc-text2 {
		font-size: 20rpx;
		color: #505050;
		}
	.order-item-desc-text3 {
		font-size: 20rpx;
		color: #505050;
		}
		
	.order-item-price{
		display: flex;
		width: 510rpx;
		margin-bottom: 20rpx;
		font-size: 25rpx;
		color: #000000;
		}
	.order-item-msg{
		display: flex;
		width: 660rpx;
		margin: 20rpx;
		font-size: 25rpx;
		color: #fe642c;
		}
</style>

<script>
	export default {
		data() {
			return {
				strings: '<ul style="box-sizing: border-box; padding-left: 2rem; margin-bottom: 1rem; color: rgb(33, 37, 41); font-family: system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; text-wrap: wrap;" class=" list-paddingleft-2"> <li>'
			}
		}
	}
</script>