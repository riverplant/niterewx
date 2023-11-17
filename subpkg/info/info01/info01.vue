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
			strings: '<br><p><strong>第一步-注册逆海淘会员</strong></p><p>- 登录www.nihaitao.com</p><p>- 填写加拿大手机号</p><p>- 点击注册</p><p>- 短信接收密码（N+数字）注：此密码也是您的提货码，请牢记</p><p>- 输入密码点击登录</p><p><br/></p><p><strong>第二步-下单</strong></p><p>- 下单时请在地址栏和姓名栏加入您的提货码（N+数字）</p><p>- 国内中转仓收货地址：</p><p>- 浙江省 宁波市 鄞州区 首南街道 檀江北路1001号星文科技城D幢302-(您的提货码)，葛为存(您的提货码) 15724276445</p><p>- ‼请严格按照我们预留的联系地址，姓名和电话来发送货物！为了尽早收到您的货物，请配合我们的工作‼</p><p><br/></p><p><strong>第三步-及时查询包裹是否入库</strong></p><p>- 国内仓库收到您的货物后会进行开箱查验，录入货物的体积和重量。</p><p>- 入库后会显示在逆海淘官网的包裹页面，您可以随时查询。</p><p><br/></p><p><strong>第四步-及时付费避免延误送货和提货</strong></p><p>- 货物入库后会在逆海淘官网的包裹页面显示您需要支付的费用。</p><p>- 付费后方可提货。</p><p>- 所有付费操作均在网站完成。</p><p><br/></p><p><strong>第五步-派送与自提货</strong></p><p>- 大蒙特里尔地区收到通知后安排送货</p><p>- 渥太华地区收到通知后到提货点取货</p><p>- 请确认运费已经支付完毕，提货点才会放货，才会安排送货。</p><p>- 所有付费操作均在网站完成，提货点不能收现金。</p><p>- 提货点会验证信息，避免误提他人包裹。</p><p><br/></p><p style="text-align: center;"><span style="color: rgb(165, 165, 165);"><sub>© 逆海淘 - 加拿大最佳淘宝方案</sub></span></p>'
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