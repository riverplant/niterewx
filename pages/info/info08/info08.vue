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
			strings: '<p><br/></p><p><strong><span style="text-wrap: nowrap;"></span></strong></p><p><strong><span style="text-wrap: nowrap;">关于自寄物品</span></strong></p><p><span style="text-wrap: nowrap;">- 请于包裹内附纸条注明：物品品名以及数量. 且不同的品类需分开.</span></p><p><span style="text-wrap: nowrap;">- 例：衣服归衣服，玩具归玩具. 不可用衣服包玩具.</span></p><p><span style="text-wrap: nowrap;">- ‼禁止在包里鞋里等夹带小物件！如有丢失概不负责！</span></p><p><span style="text-wrap: nowrap;">- ‼如不按要求注明纸条，并归类物品. 您需要支付¥20查验费.</span></p><p><span style="text-wrap: nowrap;">- ‼请合理安排自寄物品的空间. 仓库收到物品需开箱查验.</span></p><p><span style="text-wrap: nowrap;">- 每一样物品都会取出查验登记再装回.无法再复原成一模一样. 相对的体积重量也会发生变化.</span></p><p><span style="text-wrap: nowrap;">- ‼请勿使用医疗产品纸箱、生鲜产品纸箱等来包装您的货物，带来查验的风险.</span></p><p><span style="text-wrap: nowrap;">- ‼自寄食品，必须单独装箱，不可和非食品混装。</span></p><p><br/></p><p style="text-align: center;"><span style="color: rgb(165, 165, 165);"><sub>© 逆海淘 - 加拿大最佳淘宝方案</sub></span></p>'
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