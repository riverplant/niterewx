<template>
    <view>
            <!--选择收获地址得盒子-->
            <view class="address-choose-box" >
               <button type="primary" size="mini" class="btnchooseWarehouse" @click="initDataTree">请选择收貨倉庫+</button> 
            </view>       
            
            <!--渲染收货信息得盒子-->
      <!--     <view class="address-info-box" v-else  @click="changeWarehouse">
               <view class="row1">
                  <view class="row1-left">
                      <view class="username"> 收货人: {{address.userName}}</view>
                  </view> 
                  <view class="row1-right">
                       <view class="phone"> 电话: {{address.telNumber}}</view>
                       <uni-icons type="arrowright" size="16"></uni-icons>
                  </view> 
               </view>
               <view class="row2">
                  <view class="row2-left">收货地址: </view>
                  <view class="row2-right">{{addstr}} </view>  
               </view>
               
           </view>
           -->
          <my-warehouse ref="picker"></my-warehouse>

    </view>
</template>

<script>
    import { mapState,mapMutations, mapGetters } from 'vuex'
    export default {
        data() {
            return {
                
            };
        },
        methods: {
             ...mapMutations('m_user',['updatePickPointList']),
            async initDataTree() {
                const {data: res} = await uni.$http.get('http://127.0.0.1:8080/wx/users/pickPointList')
                if (res.status != 200) return uni.$showMsg('查詢提貨點列表失败!')
                 console.log('res:', res.data)
                 this.updatePickPointList(res.data)
                // let data = {
                //     classes: '1-2',
                //     dataTree: [{
                //     	text: "一年级",
                //     	value: "1-0",
                //     	children: [{
                //     		text: "1.1班",
                //     		value: "1-1"
                //     	},
                //     	{
                //     		text: "1.2班",
                //     		value: "1-2"
                //     	}]
                //     },
                //     {
                //     	text: "二年级",
                //     	value: "2-0",
                //     	children: [{
                //     		text: "2.1班",
                //     		value: "2-1"
                //     	},
                //     	{
                //     		text: "2.2班",
                //     		value: "2-2"
                //     	}]
                //     },
                //     {
                //     	text: "三年级",
                //     	value: "3-0",
                //     	disable: true
                //     }]
                // }
            },
             
             async chooseWarehouse() {
                this.$refs.picker.show()
             }
        },
        computed: {
            ...mapState('m_user',['userinfo'])
        }
    }
</script>

<style lang="scss">
.address-border{
    display: block;
    width: 100%;
    height: 5px;
}
.address-choose-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.address-info-box {
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;
    .row1 {
        display: flex;
        justify-content: space-between;
      .row1-right {
          display: flex;
          justify-content: space-between;
      }
    }  
    .row2 {
        display: flex;
        align-items: center;
        margin-top: 10px;
       .row2-left{
         white-space: nowrap;  
       } 
    }
}
</style>
