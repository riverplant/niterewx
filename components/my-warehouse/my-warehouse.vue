<template>
	<view>
		<view v-if="userinfo.code == null">
			<view class="panel-list2">
				<view class="panel2">
					<view class="panel-title2">
						尚未选择收货仓库
					</view>
				</view>
			</view>

			<navigator :url="'/subpkg/warehouse_form/warehouse_form'">
				<view class="btn-text">选择收货仓库</view>
			</navigator>
		</view>
		<view v-else>

			<view class="panel-list">
				<view class="panel">
					<view class="panel-title">
						收货码
					</view>
					<view class="panel-text">
						<text>{{userinfo.code}}</text>
					</view>
				</view>

				<view class="panel">
					<view class="panel-title">
						收货仓库
					</view>
					<view class="panel-text">
						<text>{{userinfo.ppName}}</text>
					</view>
				</view>
			</view>


			<view class="panel-list" v-if=" requestReviewCount > 0">
				<view class=panel>
					<view class="order-item-msg">
						<view class="order-item-sub-left">
							<image src="/static/note_icon.png" class="order-item-sub-icon"></image>
						</view>
						<view class="order-item-sub-right">
							<text>修改仓库申请已提交,请等待审核结果。</text>
						</view>
					</view>


					
				</view>
			</view>
			<view v-else>
				<navigator :url="'/subpkg/warehouse_form/warehouse_form'">
					<view class="btn-text">修改收货仓库</view>
				</navigator>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				dataTree: [],
				node: '',
				searchResults: []
			}
		},
		computed: {
			...mapState('m_user', ['userinfo', 'pickPointList', 'pickPoint', 'code', 'openid']),
			...mapState('m_order', ['warehouseRequestList']),
			...mapGetters('m_order', ['requestCount', 'requestReviewCount'])
		},

	}
</script>

<style>
	.warehouse-info-box {
		margin-top: 40px;
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;


	}

	.row1 {
		display: flex;
		justify-content: space-between;

	}

	.row1-right {
		display: flex;
		justify-content: space-between;
	}

	.row2 {
		display: flex;
		align-items: center;
		margin-top: 10px;

	}

	.row2-left {
		white-space: nowrap;
	}

	.table {
		margin-top: 15px;
		justify-content: space-around;
		width: 95%;
		border-radius: 8rpx;
		display: table;
		border: 1px solid #C00000;
		border-collapse: collapse;
		margin-left: 8px;
		margin-right: 3px;
	}

	.th {
		text-align: center;
		color: black;
		padding: 20rpx 0;
		font-weight: bolder;
		display: table-cell;
		border: 1px solid #C00000
	}

	.td {
		text-align: center;
		padding: 20rpx 0;
		display: table-cell;
		border: 1px solid #C00000
	}

	.tr {
		display: table-row;
	}


	.btn-text {
		margin-top: 50rpx;
		width: 750rpx;
		background-color: #00aa00;
		height: 50px;
		color: white;
		line-height: 50px;
		padding: 0 10px;
		min-width: 100px;
		text-align: center;
	}


	.panel-list {
		padding: 0 10px;
		position: relative;
		top: 5px;


	}

	.panel {
		background-color: white;
		border-radius: 3px;
		margin-bottom: 8px;
	}

	.panel-list2 {
		padding: 0 10px;
		position: relative;
		top: 5px;
		height: 400rpx;


	}

	.panel2 {
		background-color: white;
		border-radius: 3px;
		margin-bottom: 8px;
		height: 400rpx;
	}

	.panel-text {
		margin-top: 10rpx;
		font-size: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		padding-bottom: 20rpx;
	}

	.panel-title {
		padding-top: 20rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 20rpx;
		color: #aaaaaa;
		border-bottom: 1px solid #F4F4F4;
	}

	.panel-title2 {
		padding-top: 180rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-left: 300rpx;
		margin-right: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 20rpx;
		color: #aaaaaa;
	}

	.order-item-sub-left {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.order-item-sub-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.order-item-sub-icon {
		margin-right: 10rpx;
		width: 30rpx;
		height: 30rpx;
		display: block;
	}

	.order-item-msg {
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		display: flex;
		width: 660rpx;
		margin: 20rpx;
		font-size: 25rpx;
		color: #fe642c;
	}
</style>