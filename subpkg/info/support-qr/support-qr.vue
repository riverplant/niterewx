<template>
	<view class="my-information-container">

		<!-- list -->
		<view class="panel-list">
			<view class="panel">
				<image src="https://aoaofast.cn/images/wx/weixin_csr_bi.jpg" class="qr-image"></image>
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
				strings: '<p><br/></p><p><strong><span style="text-wrap: nowrap;"></span></strong></p><p><strong><span style="text-wrap: nowrap;"> 请咨询专项客服：</span></strong></p><p><span style="text-wrap: nowrap;">逆海淘-立方拼箱客服</span></p><br/><p><strong><span style="text-wrap: nowrap;"> 微信号：</span></p></strong><span style="text-wrap: nowrap;">nihaitao_bi</span></p><p><p><br/></p><p style="text-align: center;"><span style="color: rgb(165, 165, 165);"><sub>© 逆海淘 - 加拿大最佳淘宝方案</sub></span></p>'
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

	.qr-image {
		padding-left: 140rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 450rpx;
		height: 450rpx;
	}
</style>