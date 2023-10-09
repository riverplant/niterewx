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
</template>

<script>
	export default{
	data() {
		return {
			strings: '<p><br/></p><p></p><p><strong>快递丢失</strong></p><p>- 如物流信息显示签收后3天，国内仓库仍没收到货物，您需要联系卖家或快递公司理赔。</p><p>- ‼是否收到物品，不能以物流信息为准。快递送错地址并显示签收的情况时有发生。‼</p><p>赔付条款</p><p>- 漫长的运输过程中，丢失与破损难免发生。贵重物品慎重寄！</p><p>- 物品丢失，按照运费3倍赔偿。每个包裹最高上限赔付300人民币。(每个包裹视为一个快递单号)</p><p>- 物品破损不赔付！</p><p><br/></p><p style="text-align: center;"><span style="color: rgb(165, 165, 165);"><sub>© 逆海淘 - 加拿大最佳淘宝方案</sub></span></p>'
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