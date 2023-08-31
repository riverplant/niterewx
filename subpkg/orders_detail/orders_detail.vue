<template>
    <view>
        <view class="search-box">
             <my-search></my-search> 
        </view>
        <view class="scroll-view-container">
           <scroll-view class="scroll-view" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
               <block v-for="(item,i) in orderList" :key="i">
                    <view :class="['sroll-item', i === active ? 'active' : '']  " @click="activeChanged(i)">{{item.name}}</view>
               </block>
           </scroll-view> 
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                wh:0,
                orderList:[],
                active:0,
                scrollTop:0
            };
        },
        onLoad(e) {
            let orderstatus = e.orderstatus
            let payStatus = e.payStatus
             console.log('e:',e)
            console.log('orderstatus:',orderstatus)
            console.log('payStatus:',payStatus)
          const sysInfo =  uni.getSystemInfoSync()
           this.wh = sysInfo.windowHeight - 50
           this.getOrderList( orderstatus, payStatus ) 
        },
        methods: {
            async getOrderList(orderstatus, payStatus ) {
               this.orderList = [
                   {"name":'test1'},
                   {"name":'test2'},
                    {"name":'test3'},
                  {"name":'test4'},
                   {"name":'test5'},
                   {"name":'test1'},
                    {"name":'test2'},
                     {"name":'test3'},
                   {"name":'test4'},
                    {"name":'test5'},
                    {"name":'test1'},
                     {"name":'test2'},
                      {"name":'test3'},
                    {"name":'test4'},
                     {"name":'test5'}
                 
                   ]
            },
            
            activeChanged(index) {
                this.active = index
                this.scrollTop = this.scrollTop === 0 ? 1 : 0
            }
        }
    }
</script>

<style lang="scss">
    .search-box {
        position: sticky;
        top: 0;
        z-index: 999;
        background-color: #C00000;
    }
.scroll-view-container {
    display: flex;
    .scroll-view{
        width: 100%;
        align-items: center;
        .sroll-item {
            background-color: #F7F7F7;
            line-height: 60px;
            text-align: center;
            font-size: 12px;
            &.active {
                background-color: #FFFFFF;
                position: relative;
                
                &::before {
                    content:'';
                    display: block;
                    height: 30px;
                    width: 3px;
                    background-color: #C00000;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                }
            }
        }
    }
}
</style>
