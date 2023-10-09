<template>
	<view class="my-information-container">

		<!-- list -->
		<view class="panel-list">
			<view class="panel">	
				<view class="info-text">
					<rich-text :nodes="strings"></rich-text>
</view>
				 
			</view>


		</view>

	</view>
</template>

<script>
	export default{
	data() {
		return {
			strings: '<p><br/></p><p><strong><span style="text-wrap: nowrap;">关于时效</span></strong></p><p><span style="text-wrap: nowrap;">- 海运时效通常为发船后35-45天，不排除一些不可控因素(疫情严峻、恶劣天气、海关查验、火车排期等)。</span></p><p><span style="text-wrap: nowrap;">- 疫情期间，到库时间基本都在出海后50天以上。</span></p><p><span style="text-wrap: nowrap;"><br/></span></p><p><strong><span style="text-wrap: nowrap;">物品寄到国内仓库如何处理</span></strong></p><p><span style="text-wrap: nowrap;">- 我们会根据和货物运输相关的法律法规进行拆箱查验。</span></p><p><span style="text-wrap: nowrap;">- 查验后会根据货物的物品重量或体积重量核算价格并显示在逆海淘官网的包裹栏页面。</span></p><p><span style="text-wrap: nowrap;">- 如查验外观有严重损坏，我们会联系您决定后续处理方式。</span></p><p><span style="text-wrap: nowrap;">- 如有不符合安全运输的违禁品，概不通知，直接销毁。</span></p><p><span style="text-wrap: nowrap;">- 到付的包裹一律拒收，请下单前和卖家谈妥运费。</span></p><p><span style="text-wrap: nowrap;">- ‼我们不负责对物品的颜色、数量、型号、适用性、配件是否齐全等商品细节进行核对。如商家物品出现漏寄，错寄等导致的货不对板，逆海淘概不负责‼</span></p><p><span style="text-wrap: nowrap;"><br/></span></p><p><strong><span style="text-wrap: nowrap;">如何知道物品是否到达国内仓库</span></strong></p><p><span style="text-wrap: nowrap;">- 国内仓库收到您的物品后会进行开箱查验，录入物品的重量和体积，并显示您需要支付的费用。</span></p><p><span style="text-wrap: nowrap;">- 您可登陆逆海淘官网www.nihaitao.com的包裹界面查看。</span></p><p><span style="text-wrap: nowrap;">- 注：当您发现，物流信息表明您的包裹已经在逆海淘国内仓库签收，但是在您的包裹列表页面迟迟不见其显示。 此时，您需要发起包裹认领/查找请求。</span></p><p><span style="text-wrap: nowrap;"><br/></span></p><p><strong><span style="text-wrap: nowrap;">物品到达仓库能存放多久</span></strong></p><p><span style="text-wrap: nowrap;">- 物品抵达加拿大取货点，自通知取货之日起7天内免仓储费。</span></p><p><span style="text-wrap: nowrap;">- 超过7天免费存放期，请联系客服支付存放费。</span></p><p><span style="text-wrap: nowrap;">- 超过7天后收取管理费$1.00/天。</span></p><p><span style="text-wrap: nowrap;">- 按立方结算的货物，每立方$2.00/天仓储费。</span></p><p><span style="text-wrap: nowrap;">- 注：如超过30天不联系客服，将视为自动弃货处理。</span></p><p><br/></p><p style="text-align: center;"><span style="color: rgb(165, 165, 165);"><sub>© 逆海淘 - 加拿大最佳淘宝方案</sub></span></p>'
		}
		}
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
		top: 10rpx;

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

	.info-text{
		display: flex;
		width: 680rpx;
		margin: 20rpx;
		font-size: 25rpx;
		line-height: 36rpx;
		color: #202020;
		}
</style>