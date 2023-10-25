<template>
		<view class="claim-table-container">
            <uni-forms ref="orderFormData" :rules="dynamicRules" :modelValue="orderFormData" label-position="top">
                <uni-easyinput disabled v-model="orderFormData.orderId"  v-if="isHidden === true" />
                <uni-forms-item label="快遞單號" required name="trackingNumber">
                	<uni-easyinput disabled v-model="orderFormData.trackingNumber" placeholder="请输入快遞單號" />
                </uni-forms-item>
                <uni-forms-item label="快递单截图" required name="pHeight">
                	<view class="main-wrap">
                	    <view class="img-wrap">
                	        <image :src="src" @click="TanPreviewImage()" mode=""></image>
                	    </view>
                	    <view class="img-wrap">
                	        <image :src="src" @click="TanPreviewImage()" mode=""></image>
                	    </view>
                	</view>  
                </uni-forms-item>
                <uni-forms-item label="選擇物品分類" required name="catId">
                	<uni-data-picker placeholder="请选择選擇物品分類" popup-title="请选择選擇物品分類" :localdata="catList"
                	    @change="onchange" >
                	</uni-data-picker>
                </uni-forms-item>
                <uni-forms-item label="是否驗貨通過" required name="pass">
                    <radio-group @change="radioChange">
                	<label class="radio"><radio value="1" :checked="radioValue==1" />通過</label>
                	<label class="radio"><radio value="2" :checked="radioValue==2" />未通過</label>
                    </radio-group>
                </uni-forms-item>
                
                <uni-forms-item label="驗貨未通過原因 "  name="msg" v-if="isShow" >
                	<uni-easyinput v-model="orderFormData.msg"  />
                </uni-forms-item>
            </uni-forms>
                  
            <view class="button-group">
            	<button type="primary" size="default" @click="submit('orderFormData')">提交</button>
            </view>
		    
				
              <!--   <view class="image-list">
                            <view class="image-item" v-for="(item,index) in array" :key="index">
                                <view class="image-content">
                                    <image style="width: 200px; height: 200px; background-color: #eeeeee;" :mode="item.mode" :src="src"
                                        @error="imageError"></image>
                                </view>
                                <view class="image-title">{{item.text}}</view>
                            </view>
                        </view>
                        </view> -->
  
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
                src: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
                isShow : false,
                isHidden: false,
                orderFormData: {
                    orderId: '',
                    trackingNumber:  '',
                	orderNumber: '',
                    code:  '',
                    pLong:  '',
                    pWidth:  '',
                    pHeight: '',
                    pWeight:'',
                    catId: '',
                    pass:'',
                    msg:'',
                    orderStatus: 1,
                	openId:''
                    
                	
                },
            };
        },
        
        onLoad(e) {
            this.catList = this.catTree.data
            console.log('e:',e)
            if(e && e.oinfo) {
               let uinfo = JSON.parse(e.oinfo)
                if(uinfo !== null || uinfo !== {}) {
                    this.orderFormData.orderId = uinfo.id
                    this.orderFormData.orderNumber = uinfo.orderNumber
                    this.orderFormData.trackingNumber = uinfo.trackingNumber
                    this.orderFormData.code = uinfo.code
                    this.orderFormData.pLong = uinfo.pLong
                    this.orderFormData.pWidth = uinfo.pWidth
        			this.orderFormData.pHeight = uinfo.pHeight
                    this.orderFormData.pWeight = uinfo.pWeight
                   
                    this.radioValue = uinfo.orderStatus+''
        			this.isShow = uinfo.orderStatus == 2
        			if(this.isShow)
        			   this.orderFormData.msg = uinfo.msg
                      
               
                } 
            }else {
              this.orderFormData.orderNumber =  Math.floor(Math.random() * 100000000)
            }
          
            },
        methods: {
        			formSubmit: function(e) {
        				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
        				var formdata = e.detail.value
        				uni.showModal({
        					content: '表单数据内容：' + JSON.stringify(formdata),
        					showCancel: false
        				});
        			},
                    radioChange: function (e) {
                            this.orderFormData.orderStatus = e.detail.value === '2' ? 2 : 1
                            this.isShow = e.detail.value === '2' ? true : false
                    	},
        			 TanPreviewImage(){  
        			        var images = [];
        			        images.push(this.src);
        			        console.log(images)  // ["http://192.168.100.251:8970/6_1597822634094.png"]
        			        uni.previewImage({ // 预览图片  图片路径必须是一个数组 => ["http://192.168.100.251:8970/6_1597822634094.png"]
        			            current:0,
        			            urls:images,
        			            longPressActions: {  //长按保存图片到相册
        			                itemList: ['保存图片'],
        			                success: (data)=> {
        			                    console.log(data);
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
        			    }
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