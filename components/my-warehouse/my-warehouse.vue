<template>
    <view>
        <view class="warehouse-choose-box" v-if="code == ''">
         <button type="primary" size="mini" class="btnChooseAddress" @click="updateWarehose">創建倉庫+</button> 	
         </view>
       <view class="warehouse-info-box" v-else >
           <view class="row1">
              <view class="row1-left">
                  <view class="username"> 收货碼: {{code}}</view>
              </view> 
              <view class="row1-right">
                  <button  type="primary" size="mini"  @click="updateWarehose">申請修改倉庫+</button> 
              </view> 
           </view>
           <view class="row2">
              <view class="row2-left">收货倉庫: </view>
              <view class="row2-right">{{pickPoint}} </view>  
           </view>
           
       </view>     
            <uni-data-picker placeholder="请选择收穫倉庫" popup-title="请选择所在地区" :localdata="pickPointList" 
                @change="onchange" >
            </uni-data-picker>
          
           
    </view>
</template>

<script>
    import {
        mapState, mapMutations
    } from 'vuex'
    export default {
        data() {
            return {
               dataTree:[],
               node:'verdun'
            }
        },
        computed: {
            ...mapState('m_user', ['userinfo', 'pickPointList', 'pickPoint', 'code']), 
        },
        methods: {
            ...mapMutations('m_user',['updatePickPointList', 'updatePickPoint', 'updateCode']),
            onchange(e) {
                const value = e.detail.value
                this.node = value[value.length - 1].value
                this.updateCode(this.node + Math.floor(Math.random() * 1000000))
            },
           
        },   
    }
</script>

<style>
.address-border{
    display: block;
    width: 100%;
    height: 5px;
}
.warehouse-choose-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
}

  .row1 {
        display: flex;
        justify-content: space-between;
    }  
    .row1-right {
        display: flex;
        justify-content: space-between;
    }
    .row2-left{
      white-space: nowrap;  
    } 
    
    .row2 {
        display: flex;
        align-items: center;
        margin-top: 10px;
      
    }
.warehouse-info-box {
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;  
}

.warehouse-border{
    display: block;
    width: 100%;
    height: 5px;
}
</style>