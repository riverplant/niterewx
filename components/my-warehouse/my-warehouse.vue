<template>
    <view>
        <view class="warehouse-choose-box" v-if="code == ''">
			<navigator class="panel-item" :url="'/subpkg/warehouse_form/warehouse_form?uinfo='">
         <button type="primary"  class="btnChooseAddress" >創建倉庫+</button> 
			 </navigator>
         </view>
       <view class="warehouse-info-box" v-else >
		   <navigator class="panel-item" :url="'/subpkg/warehouse_form/warehouse_form?uinfo='+JSON.stringify(this.userinfo)" v-if="this.requestCount > 0" >
           <view class="row1">
              <view class="row1-left">
                  <view class="username"> 收货碼: {{code}}</view>
              </view>  
           </view>
           <view class="row2"  >
              <view class="row2-left">收货倉庫: </view>
              <view class="row2-right">{{pickPoint}} </view>  
           </view>
           </navigator>
		   <navigator class="panel-item" :url="''" v-else>
		   <view class="row1">
		      <view class="row1-left">
		          <view class="username"> 收货碼: {{code}}</view>
		      </view>  
		   </view>
		   <view class="row2"  >
		      <view class="row2-left">收货倉庫: </view>
		      <view class="row2-right">{{pickPoint}} </view>  
		   </view>
		   </navigator>
		   
		   <view class="table">
		   	
		   	<view class="tr">
		   		<view class="th">舊倉庫</view>
		   		<view class="th">新倉庫</view>
		   		<view class="th">申請狀態</view>	
		   		<view class="th">審核信息</view>
		   	</view>
		   	<block v-for="(item, index) in warehouseRequestList" :key="index">
		   		<view class="tr">
		   			<view class="td">{{ item.pidOlderName }}</view>
		   			<view class="td">{{ item.pidNewName }}</view>
		   			<view class="td">{{ item.isAccepted === 1 ? '申請審核中' : item.isAccepted === 2 ? '申請通過' : '申請拒絕'}}</view>
		   		<view class="td">{{ item.msg || '無'}}</view>
		   		</view>
		   	</block>
		   	
		   </view> 
	 </view>     	   
        
    </view>
</template>

<script>
    import {
        mapState, mapMutations, mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
               dataTree:[],
               node:'',
			   searchResults:[]
            }
        },
        computed: {
            ...mapState('m_user', ['userinfo', 'pickPointList', 'pickPoint', 'code', 'openid']),
			 ...mapState('m_order', ['warehouseRequestList']), 
			  ...mapGetters('m_order', ['requestCount'])
        },

        methods: {
            ...mapMutations('m_user',['updatePickPointList', 'updatePickPoint', 'updateCode']),
            onchange(e) {
                const value = e.detail.value
                this.node = value[value.length - 1].value
            },
            
            async createWarehouse() { 
                const param = {
                    openid: this.openid,
                    pid:  this.node
                }
                const { data:result } =   await uni.$http.put('http://127.0.0.1:8080/wx/users/createWarehouse', param );
                  if( result.status !== 200 ) return uni.$showMsg()  
                    this.updateCode(result.data.code)
                    this.updatePickPoint(result.data.ppName)
                    uni.navigateBack({
                        delta: 1
                    });
            },
            
            async updateWarehouse() {
                const param = {
                    openid: this.openid,
                    pid:  this.node
                }
                const { data:result } =   await uni.$http.put('http://127.0.0.1:8080/wx/users/updateWarehouse', param );
                  if( result.status !== 200 ) return uni.$showMsg()  
                    uni.navigateBack({
                        delta: 1
                    });
                    
            },
             
           
        },   
    }
</script>

<style>
	.warehouse-info-box {
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
	 
	 .row2-left{
	   white-space: nowrap;  
	 } 
	
	.table {
		width: 95%;
		border-radius: 8rpx;
		display: table;
		border: 1px solid #C00000;
		border-collapse: collapse;
		margin-left: 8px;
		margin-right: 3px;
		margin-top: 10px;
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
</style>