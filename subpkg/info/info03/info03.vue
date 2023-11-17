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
			strings: '<p><br/></p><p><strong><span style="text-wrap: nowrap;">蒙特利尔</span></strong></p><p><strong><span style="text-wrap: nowrap;"><br/></span></strong></p><p><span style="text-wrap: nowrap;">- downtown (送货分区)</span></p><p><span style="text-wrap: nowrap;">- 东区 (送货分区)</span></p><p><span style="text-wrap: nowrap;">- 北岸 (送货分区)</span></p><p><span style="text-wrap: nowrap;">- 南岸 (送货分区)</span></p><p><span style="text-wrap: nowrap;">- 西岛 (送货分区)</span></p><p><span style="text-wrap: nowrap;">&nbsp;</span></p><p><br><strong><span style="text-wrap: nowrap;">渥太华</span></strong></p><p><strong><span style="text-wrap: nowrap;"><br/></span></strong></p><p><span style="text-wrap: nowrap;">- 渥太华/大统华内卖抽油烟机店 (提货点)</span></p><p><span style="text-wrap: nowrap;">&nbsp;&nbsp;&nbsp;&nbsp;Range Hood Depot</span></p><p><span style="text-wrap: nowrap;">&nbsp;&nbsp;&nbsp;&nbsp;地址: 224 Hunt Club Road unit C2, Ottawa, ON K1V 1C1</span></p><p><span style="text-wrap: nowrap;">&nbsp;</span></p><p><br><span style="text-wrap: nowrap;">- 渥太华/ 加蒂诺 Aylmer (提货点)</span></p><p><span style="text-wrap: nowrap;">&nbsp;&nbsp;&nbsp;&nbsp;民宅</span></p><p><span style="text-wrap: nowrap;">&nbsp;&nbsp;&nbsp;&nbsp;地址: 17 Rue Stuart, Gatineau, QC J9J 1J9</span></p><p><span style="text-wrap: nowrap;">&nbsp;</span></p><p><br><span style="text-wrap: nowrap;">- 渥太华/巴囤 (提货点)</span></p><p><span style="text-wrap: nowrap;">&nbsp;&nbsp;&nbsp;&nbsp;民宅</span></p><p><span style="text-wrap: nowrap;">&nbsp;&nbsp;&nbsp;&nbsp;地址: 3215 River Rock Ave, Nepean, ON K2J 0T4</span></p><p><span style="text-wrap: nowrap;">&nbsp;</span></p><p><br><span style="text-wrap: nowrap;">- 渥太华/砍囤 (提货点)</span></p><p><span style="text-wrap: nowrap;">&nbsp;&nbsp;&nbsp;&nbsp;民宅</span></p><p><span style="text-wrap: nowrap;">&nbsp;&nbsp;&nbsp;&nbsp;地址: 16 Gray Crescent, Kanata,, ON K2K 3J5</span></p><p><br/></p><p style="text-align: center;"><span style="color: rgb(165, 165, 165);"><sub>© 逆海淘 - 加拿大最佳淘宝方案</sub></span></p>'
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