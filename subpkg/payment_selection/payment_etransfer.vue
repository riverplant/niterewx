<template>
	<view class="my-information-container">

		<!-- list -->
		<view class="panel-list">
			<view class="panel">
				<image src="/static/payment-etransfer.png" class="payment-image"></image>
				<view class="info-text">
					<rich-text :nodes="strings" ></rich-text>
				</view>

			</view>


		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				strings: '<p><br/></p><p><strong><span style="text-wrap: nowrap;"></span></strong></p><p><strong><span style="text-wrap: nowrap;">请使用eTransfer转账到</span></strong></p><p><span style="text-wrap: nowrap;">nihaitao.trt@gmail.com</span></p><br/></p><br/></p></p><br/></p></p><br/></p></p><br/></p><span style="text-wrap: nowrap;"><sub>© 逆海淘 - 加拿大最佳淘宝方案</sub></span></p>'
			}
		}
	}
</script>


<style lang="scss">
	.panel-list {
		padding: 0 10px;
		position: relative;
		top: 10rpx;
		align-items: center;

		.panel {
			position: sticky;
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;
			align-items: center;
			width: 100%;
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

	.info-text {
		padding-left: 200rpx;
		display: flex;
		width: 750 rpx;
		margin: 20rpx;
		font-size: 25rpx;
		line-height: 36rpx;
		text-align: center;
		color: #202020;
	}

	.payment-image {
		padding-top: 150rpx;
		padding-left: 150rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 400rpx;
		height: 177rpx;
	}
</style>