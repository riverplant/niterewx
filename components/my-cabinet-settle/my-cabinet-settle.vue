<template>
    <view class="my-cabinet-settle-container" v-if="show">
        <!-- 全选 -->
        <label class="radio">
            <radio color="#C00000" :checked="isFullCheck" @click="changeAllState" /><text>全选</text>
        </label>
        <!-- 合计 -->
        <view class="count-box">
            箱子总数: <text class="count">{{count}}</text>
        </view>

        <!--  结算 -->
        <view class="btn-settle" @click="settlement">確定({{checkedCount}})</view>
    </view>
</template>

<script>
    import {
        mapGetters,
        mapState,
        mapMutations
    } from 'vuex'
    export default {
        props: {
            show: {
                type: Boolean,
                default: false,
            },
			cabinetCreateParam: {
				type: Object,
				default: {},
			}
        },
        data() {
            return {
            };
        },
        computed: {
            ...mapGetters('m_cabinet', ['checkedCount', 'count', 'checkedBoxIDS']),
            isFullCheck() {
                return this.count === this.checkedCount
            }
        },
        methods: {
            ...mapMutations('m_cabinet', ['updateAllBoxsState']),

            changeAllState() {
                this.updateAllBoxsState(!this.isFullCheck)
            },

            settlement() {
                if (!this.checkedCount) return uni.$showMsg('请至少选择一个要發送的包裹')
				if (this.cabinetCreateParam.departureDate === '') return uni.$showMsg('请选择發貨時間')
				
			  this.cabinetCreateParam.boxIds = this.checkedBoxIDS
              if(this.cabinetCreateParam.id === ''){
				  this.createCabinet()
			  }else {
				  this.updateCabinet()
			  }
            },
			
			async createCabinet() {
			    const {data: res} = await uni.$http.post('/wx/cabinet/create', this.cabinetCreateParam)
				if (res.status != 200) return uni.$showMsg('創建櫃子失败!')
				uni.navigateBack({
				    delta: 1
				});   
			},
			
			async updateCabinet() {
			    const {data: res} = await uni.$http.put('/wx/cabinet/update', this.cabinetCreateParam)
				if (res.status != 200) return uni.$showMsg('更新櫃子失败!')
				uni.navigateBack({
				    delta: 1
				});   
			}
        }
    }
</script>

<style lang="scss">
    .my-cabinet-settle-container {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background-color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        padding-left: 5px;

        .radio {
            display: flex;
            align-items: center;
        }

        .count-box {
            .count {
                color: #C00000;
                font-weight: bold;
            }
        }

        .btn-settle {
            background-color: #C00000;
            height: 50px;
            color: white;
            line-height: 50px;
            padding: 0 10px;
            min-width: 100px;
            text-align: center;
        }
    }
</style>