<template>
		<view class="claim-table-container">
            <uni-forms ref="claimFormData" :rules="dynamicRules" :modelValue="claimFormData" label-position="top">
              
                <uni-forms-item label="快遞單號" required name="trackingNumber">
                	<uni-easyinput disabled v-model="claimFormData.trackingNumber" placeholder="请输入快遞單號" />
                </uni-forms-item>
                <uni-forms-item label="快递单截图" >
                	<view class="main-wrap">
						<view class="img-wrap" v-for="(item,index) in imageUrlList" :key="index">
						   <view class="img-wrap">
						       <image :src="item" @click="TanPreviewImage()" mode=""></image>
						   </view>
						    
						</view>
                	</view>  
                </uni-forms-item>
               <block v-if="this.showButton">
                <uni-forms-item label="是否通過" required name="pass">
                    <radio-group @change="radioChange">
                	<label class="radio"><radio value="2" :checked="radioValue==2" />通過</label>
                	<label class="radio"><radio value="3" :checked="radioValue==3" />未通過</label>
                    </radio-group>
                </uni-forms-item>
                
                <uni-forms-item label="未通過原因 "  name="msg" v-if="isShow" >
                	<uni-easyinput v-model="claimFormData.msg"  />
                </uni-forms-item>
				
				 </block>
            </uni-forms>
             <block v-if="this.showButton">      
            <view class="button-group">
            	<button type="primary" size="default" @click="submit('claimFormData')">提交</button>
            </view>
		     </block>
		</view>
</template>
<script>
    import {
        mapGetters,
        mapState,
        mapMutations
    } from 'vuex'
    export default {
        data() {
            return {
                isShow : false,
                isHidden: false,
				showButton:true,
				imageUrlList: [],
				radioValue: 0,
                claimFormData: {
                    trackingNumber:  '',
                    status: 1,
					msg:''	
                }
            };
        },
        
        onLoad(e) {
            
            if(e && e.claim) {
               let uinfo = JSON.parse(e.claim)
                if(uinfo !== null || uinfo !== {}) {
                    this.claimFormData.trackingNumber = uinfo.trackingNumber
                    this.radioValue = uinfo.status+''
					 console.log('radioValue:', this.radioValue)
        			this.isShow = uinfo.status == 3
        			if(this.isShow)
        			   this.claimFormData.msg = uinfo.msg
					this.imageUrlList = uinfo.imageUrlList
                } 
				this.showButton = e.showButton
				console.log('e.showButton:',e.showButton)
				console.log('this.showButton:',this.showButton)
            }
          
            },
        methods: {

                    radioChange: function (e) {
                            this.claimFormData.status = e.detail.value === '2' ? 2 : 3
                            this.isShow = e.detail.value === '3' ? true : false
                    	},
        			 TanPreviewImage(){  
        			        var images = this.imageUrlList
        			        console.log(images)  // ["http://192.168.100.251:8970/6_1597822634094.png"]
        			        uni.previewImage({ // 预览图片  图片路径必须是一个数组 => ["http://192.168.100.251:8970/6_1597822634094.png"]
        			            current:0,
        			            urls:images,
        			            longPressActions: {  //长按保存图片到相册
        			                itemList: ['保存图片'],
        			                success: (data)=> {
        			                    uni.saveImageToPhotosAlbum({ //保存图片到相册
        			                        filePath: payUrl,
        			                        success: function () {
        			                            uni.showToast({icon:'success',title:'保存成功'})
        			                        },
        			                        fail: (err) => {
        			                            uni.showToast({icon:'none',title:'保存失败，请重新尝试'})
        			                        }
        			                    });
        			                },
        			                fail: (err)=> {
        			                    console.log(err.errMsg);
        			                }
        			        }
        			        });
        			    },
						submit(ref) {
							console.log('orderFormData:', this.claimFormData)
							this.$refs[ref].validate().then(res => {
						    this.updateClaimStatus()
							}).catch(err => {
                                uni.$showMsg(err) 
							})
						},
						
						async updateClaimStatus() {
						   const {
						       data: claimRes
						   } = await uni.$http.put('/wx/users/claim/updateStatus', this.claimFormData)  
						    if (claimRes.status != 200) return uni.$showMsg('修改申请状态失败!') 
						 
						   uni.navigateBack({
						       delta: 2
						   }); 
						},
        		}
        
    }
</script>
<style lang="scss">
    .create-order-form-containe {
    	padding: 15px;
    	background-color: #fff;
    }
    
    .segmented-control {
    	margin-bottom: 15px;
    }
    
    .button-group {
    	margin-top: 15px;
    	display: flex;
    	justify-content: space-around;
    }
    
    .form-item {
    	display: flex;
    	align-items: center;
    }
    
    .button {
    	display: flex;
    	align-items: center;
    	height: 35px;
    	margin-left: 10px;
    }
    
    .content {
    	text-align: center;
    	height: 100%;
    }
    .claim-table-container {
      justify-content: space-between;
          align-items: center;
          padding-left: 5px;
          padding-right: 5px;
    }
    
    .main-wrap{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .img-wrap{
            width: 221rpx;
              height: 195rpx;
              float: left;
              margin-left: 20px;
            image{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        
    }
</style>