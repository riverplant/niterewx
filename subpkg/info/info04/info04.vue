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
			strings: '<p><strong><span style="text-wrap: nowrap;"><br/></span></strong></p><p><strong><span style="text-wrap: nowrap;">小件包裹运费计算方式</span></strong></p><p><span style="text-wrap: nowrap;">- 无首重、起重要求，所有包裹按物品重量或体积重量实重结算。 ‼4刀/公斤包关税‼</span></p><p><span style="text-wrap: nowrap;">- 只要是我们能运的，不管是食品，电器，还是别的，都是一个价‼4刀/公斤包关税‼</span></p><p><span style="text-wrap: nowrap;">- 例：包裹0.2kg那么计算方式就是4刀×0.2kg=0.8刀</span></p><p><span style="text-wrap: nowrap;">- ‼物品重量与体积重量，取大值收取运费 ‼</span></p><p><span style="text-wrap: nowrap;">- 体积重量计算公式：物品外包装 长x宽x高(cm)/6000=体积重量</span></p><p><span style="text-wrap: nowrap;">- 单个包裹超过0.1立方或者16.666公斤，自动按照立方方式计费。</span></p><p><span style="text-wrap: nowrap;">- 每件包裹以网站显示的价格为准。货物入库后请及时支付费用以免耽误船期。</span></p><p><span style="text-wrap: nowrap;"><br/></span></p><p><strong><span style="text-wrap: nowrap;">大件、包立方</span></strong></p><p><span style="text-wrap: nowrap;">- 请咨询专项客服：逆海淘-立方拼箱客服</span></p><p><span style="text-wrap: nowrap;">- 微信号：nihaitao_bi</span></p><p><span style="text-wrap: nowrap;">- 注：大件立方是不同的提货码、不同的付费、不同的提货方式、不同的系统！‼已经走散货系统的不可转立方‼</span></p><p><br/></p><p style="text-align: center;"><span style="color: rgb(165, 165, 165);"><sub>© 逆海淘 - 加拿大最佳淘宝方案</sub></span></p>'
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