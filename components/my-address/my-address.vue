<template>
    <view>
        <view class="address-choose-box" v-if="userinfo.formatted_address == null">
        <!--选择收获地址得盒子-->
        <navigator class="panel-item" :url="'/subpkg/adress_form/adress_form'">
         <text class="button-text">點擊完善您的個人信息+</text>   
        </navigator>
        </view>     
        <!--渲染收货信息得盒子-->
    <view class="address-info-box" v-else >
         <navigator class="panel-item" :url="'/subpkg/adress_form/adress_form'">
           <view class="row1">
              <view class="row1-left">
                  <view class="username"> 收货人: {{userinfo.userName}}</view>
              </view> 
              <view class="row1-right">
                   <view class="phone"> 电话: {{userinfo.mobile}}</view>
                   <uni-icons type="arrowright" size="16"></uni-icons>
              </view> 
           </view>
           <view class="row2">
              <view class="row2-left">收货地址: </view>
            <view class="row2-right">{{address}} </view>  
       </view> 
       </navigator>     
       </view> 
       
    </view>
</template>

<script>
    import { mapState,mapMutations, mapGetters } from 'vuex'
    export default {
        name:"my-address",
        data() {
            return {
            };
        },
        
        onShow() {
            console.log('address:', JSON.stringify(address))
             console.log(JSON.stringify(address) === '{}')
        },
        methods: {
            ...mapMutations('m_user',['updateAddress']),
            // async chooseAddress() {
            //     const[err, succ] = await uni.chooseAddress().catch(err => err)                
            //     if(err === null && succ.errMsg === 'chooseAddress:ok') {
            //        console.log('succ:',succ)
            //         this.address = succ
            //         this.updateAddress(succ)
            //     }else {
            //          console.log('err:',err)
            //     }
            // }
            
        },
        computed: {
            ...mapState('m_user',['address','userinfo']) 
           
        }
    }
</script>

<style lang="scss">
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