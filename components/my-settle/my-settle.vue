<template>
    <view class="my-settle-container" v-if="show">
        <!-- 全选 -->
        <label class="radio">
            <radio color="#C00000" :checked="isFullCheck"/><text>全选</text>
        </label>
        <!-- 合计 -->
        <view class="count-box">
           订单总数: <text class="count">{{count}}</text>
        </view>
        
       <view class="count-box">
           订单总价: <text class="total">${{total}}</text>
        </view>
        
        <!--  结算 -->
        <view class="btn-settle">结算({{checkedCount}})</view>
    </view>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
       props: {
           show: {
               type: Boolean,
               default: false,
           }
       },
        data() {
            return {
                
            };
        },
        computed: {
              ...mapGetters('m_order', ['checkedCount', 'count', 'total']),
              isFullCheck() {
                  return this.count === this.checkedCount
              }  
        },
        methods: {
         
        }
    }
</script>

<style lang="scss">
.my-settle-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color:white;
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