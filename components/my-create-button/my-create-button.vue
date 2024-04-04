<template>
    <view class="create-order-button-container" >
        <navigator class="panel-item" :url="navigatorUrl">
         <view class="btn-claim" @click="settlement" >{{title}}</view>
        </navigator>
        </view> 
    </view>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '',
            },
        	navigatorUrl: {
        		type: String,
        		default: '',
        	}
        },
        data() {
            return {
            };
        },
		
		methods: {
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
			
			}
    }
</script>

<style lang="scss">    

    .create-order-button-container {
		position: relative;
        width: 100%;
        height: 100rpx;
        background-color: white;



        .btn-claim {
            background-color: #C00000;
            height: 100rpx;
            color: white;
            line-height: 100rpx;
            padding: 0 100rpx;
            min-width: 100rpx;
            text-align: center;
        }
    }
</style>