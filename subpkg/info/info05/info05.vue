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
			strings: '<p><br/></p><p><strong>禁运清单</strong></p><p>- 包含实体肉蛋奶的食品，海鲜制品，自制食品（包括但不限于自制干菜、自制酱菜、自制咸菜、醋蒜、腐乳、各种粉末）</p><p>- 原生态未加工的粮食不可运，包括但不限于玉米、小麦、大米、花生、油菜籽、大豆、绿豆。。。</p><p>- 纯电池，包括锂电池，干电池，纽扣电池等</p><p>- 防疫用品、药品、烟草、种子、艾条、艾柱、艾灸、保健品、医疗器械</p><p>- 化妆品、护肤品、胶水，卫生巾、面膜、液体、枪型玩具、各种刀剑(家用厨具可以)、奢侈品及仿造大牌</p><p>- 易燃品、白色粉末、自发热产品（自热火锅等）、喷雾、各种危险品违禁品等物品均不可运。</p><p>- 婴儿安全用品，隐形眼镜，成人用品，动物制品，真人假发</p><p>- 化学物品，土壤，原木，侵权产品，使用过的物品（包括但不局限于旧衣服\旧电器、旧家具等）</p><p>- 禁运所有带软垫的家具，(包括但不局限于沙发、躺椅、沙发床、蒲团、卧榻、凳子等其余软垫类座椅)</p><p><br/></p><p><strong><strong style="text-wrap: wrap;">禁运清单不可能涵盖所有物品，请多与客服沟通，以避免不必要的损失。</strong></strong></p><p><strong><strong style="text-wrap: wrap;"><br/></strong></strong></p><p><strong>如有不符合安全运输的违禁品，恕概不通知，一律销毁。</strong></p><p><strong>如有夹带禁运物品者，查出将由您承担一切罚款和法律后果</strong></p><p><strong>如有违禁品发到仓库需要邮寄到其他地址. 需支付¥15元退货费+顺丰到付</strong></p><p><br/></p><p style="text-align: center;"><span style="color: rgb(165, 165, 165);"><sub>© 逆海淘 - 加拿大最佳淘宝方案</sub></span></p>'
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