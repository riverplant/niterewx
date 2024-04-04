<template>
    <view class="create-box-button-container" >
         <view class="btn-claim" @click="settlement" >{{title}}</view>
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
			pid: {
				type: String,
				default: '',
			}
        },
        data() {
            return {
				dynamicBoxForm: 
				{
					id:'',
				    boxNumber:  0,
				    pid: '',
					pName:'',
					boxStatus: 1,
					boxType: 1,
					orderIds:[]
				},
            };
        },
		
		methods: {
		    settlement() {
				 if(this.pid == '') 
				 {
					uni.showToast({
					  title: "请从仓库列表中选择仓库",
						duration: 2000,
						icon: 'none'
						}) 
				 } 
				 else  
				 {
				  this.createBoxNumber()
				  this.dynamicBoxForm.pid = this.pid
				  let url = '/subpkg/box_form/box_form?box='+JSON.stringify(this.dynamicBoxForm)
				  uni.navigateTo({
					url: url
					});
				}
		    },
			
			async createBoxNumber() {
				   const {
				       data: orderRes
				   } = await uni.$http.get('/wx/box/createBoxNumber')  
				    if (orderRes.status != 200) return uni.$showMsg('创建箱子号码失败!') 
					
			     this.dynamicBoxForm.boxNumber = orderRes.data
			},
			
			}
    }
</script>

<style lang="scss">    

    .create-box-button-container {
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