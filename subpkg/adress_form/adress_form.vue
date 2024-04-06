<template>
		<uni-section  type="line">
	<view class="container">
	
			<view class="address-form-containe">
				<!-- 动态表单校验 -->
				<uni-forms ref="dynamicForm" :rules="dynamicRules" :modelValue="dynamicFormData" label-position="top">
                    <uni-forms-item label="用戶名" required name="userName">
                    	<uni-easyinput v-model="dynamicFormData.userName" placeholder="用戶名" />
                    </uni-forms-item> 
					<uni-forms-item label="微信号码" required name="wxnumber">
						<uni-easyinput v-model="dynamicFormData.wxnumber" placeholder="微信号码" />
					</uni-forms-item> 
                    <uni-forms-item label="电话号码" required name="mobile">
                    	<uni-easyinput v-model="dynamicFormData.mobile" placeholder="电话号码" />
                    </uni-forms-item>
					<uni-forms-item label="收货仓库" required>
						<uni-data-picker placeholder="请选择收货仓库" popup-title="请选择所在地区" :localdata="pplist" v-model="userinfo.pid"
						    @change="onchange" >
						</uni-data-picker>
					</uni-forms-item>
                    <uni-forms-item label="家庭地址" required name="address">
                        <uni-easyinput v-model="dynamicFormData.address" required placeholder="家庭地址" />
                    </uni-forms-item>
                    <uni-forms-item label="city" required name="city">
                    	<uni-easyinput v-model="dynamicFormData.city" placeholder="城市" />
                    </uni-forms-item>
                    <uni-forms-item label="province"  name="province">
                        <uni-data-select
                              v-model="default_value"
                              :localdata="range"
                              @change="change"
                            ></uni-data-select>
                    
                    </uni-forms-item>
                    <uni-forms-item label="Postal code" required name="pcode">
                    	<uni-easyinput v-model="dynamicFormData.pcode" placeholder="Postal code" />
                    </uni-forms-item>
				</uni-forms>
			</view>
	</view>
	<view class="button-group">
		<button type="primary" size="mini" @click="submit('dynamicForm')" class="btn-text">
			<text class="btn-text">提交</text>
		</button>
	</view>
	
		<view>
			<uni-popup
				ref="alertDialog"
				:mask-click="false"
				type="center">
				<view class="agreement-view" :style="{ width: 273 + 'px', height: 150 + 'px' }">
					<!-- 弹框提示头 -->
					<view class="u-text-center">用户使用须知</view>
					<scroll-view scroll-y class="agreement-content" :style="{ height:150 + 'px' }">
						<view class="crntent">
							使用前，请您仔细阅读<text style="color: cornflowerblue;" @click="xieyi">《用户服务协议》</text>及<text style="color: cornflowerblue;" @click="yinsi">《隐私政策》</text>
						</view>
					</scroll-view>
					<view class="agreement-btns" :style="{ height: 42 + 'px' }" >
						<view class="no-btn text" @tap="refuse">
							暂不使用
						</view>
						<view class="yse-btn text" @tap="admit">同意</view>
					</view>
				</view>
			</uni-popup>
		</view>
	
	</uni-section>
</template>

<script>
    import { mapState,mapMutations, mapGetters } from 'vuex'
	export default {
     
		data() {
			return {
                timer: null,
                kw: '',
				dynamicFormData: {
                    mobile:  '',
                    address:  '',
                    city: '',
                    province:0,
                    userName:  '',
                    pcode: '',
                    openId: '',
					wxnumber: '',
					code:  '',
					pid: '',
				},  
				node:'',
				
				pplist:[],
                range: getApp().globalData.range,
               default_value:1,
	
			}
		},
		
		dynamicRules: {
		    mobile: {
		    	rules: [
		            {
		            	required: true,
		            	errorMessage: '電話號碼不能为空'
		            },
		            {
		            required: true,
		    		format: 'number',
		    		errorMessage: '電話號碼只能输入数字'
		    	}]
		    },
			
		    address: {
		        rules: [{
		        	required: true,
		        	errorMessage: '地址不能为空'
		        }]
		    },
			
			wxnumber: {
			    rules: [{
			    	required: true,
			    	errorMessage: '微信号码不能为空'
			    }]
			},
			
		    city: {
		       rules: [{
		       	required: true,
		       	errorMessage: '不能为空'
		       }] 
		    },
		    province: {
		       rules: [{
		       	required: true,
		       	errorMessage: '不能为空'
		       }] 
		    },
		    pcode: {
		       rules: [{
		       	required: true,
		       	errorMessage: '不能为空'
		       }] 
		    }
		},
      computed: {
			    ...mapState('m_user', [ 'userinfo', 'pickPointList',  'openid']), 
			},
		onLoad(e) {
			let ppll = JSON.parse(uni.getStorageSync('pickPointList'))
			console.log('ppll:',ppll)
			this.pplist = ppll
			console.log('pplist:',this.pplist)
			    this.judge();
                this.dynamicFormData.userName = this.userinfo.userName
                this.dynamicFormData.mobile = this.userinfo.mobile
                if(this.userinfo.address) {
                  this.dynamicFormData.address = this.userinfo.address.address   
                  this.dynamicFormData.city = this.userinfo.address.city
                  this.dynamicFormData.province = this.userinfo.address.province
                   this.dynamicFormData.pcode = this.userinfo.address.pcode
                   this.default_value = this.userinfo.address.province   
                }
				 this.dynamicFormData.wxnumber = this.userinfo.wxnumber
				 this.dynamicFormData.code = this.userinfo.code
            },
			
		methods: {
            ...mapMutations('m_user',[ 'updateUserInfo']),
			
			onchange(e) {
			    const value = e.detail.value
			    this.node = value[value.length - 1].value
			},
			
			judge() {
				uni.getStorage({
								key:'agreement_key',
								success: () => {
									// 获取到了不显示弹窗
								 this.$refs.alertDialog.close();
								},
								fail: () => {
									this.$refs.alertDialog.open();
								}
							})
			},
			
			xieyi(){
				uni.navigateTo({
					url: '/subpkg/xieyi/xieyi'
					});
					},
			yinsi(){
					uni.navigateTo({
						url: '/subpkg/yinsi/yinsi'
						});
						},	

			admit() {
					try{
						uni.setStorageSync('agreement_key', 'yes');
						uni.setStorageSync('agreement_Date', new Date().toLocaleString())
						}
						catch(e)
						{
									//TODO handle the exception
						}
						this.$refs.alertDialog.close();
					},
							
	         refuse() {
						uni.navigateBack({
							 delta: 2
							});	
					  },

          change(e) {
                   this.dynamicFormData.province = e
                  },
			submit(ref) {
				if(this.node == '') {
					uni.showToast({
					  title: "请从仓库列表中选择仓库",
					  duration: 2000,
					  icon: 'none'
					}) 
				} else  {
					this.$refs[ref].validate().then(res => {
					  this.dynamicFormData.openId = this.openid 
					  this.dynamicFormData.pid = this.node
					  this.updateUserInfos()
					}).catch(err => {
						console.log('err', err);
					})
				}

			},
             updateUserInfos() {
				if(this.userinfo.code === null) {
					this.creatAddressAndPickPoint()
				}else {
					uni.showModal({
					    title: '提示',
					    content: '修改地址或者仓库需要等待管理员的审核通过才能生效，如果您修改了仓库，会获得新的提货码',
					    success: function (res) {
					        if (res.confirm) {
					           this.updateAddressAndPickPoint()
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }.bind(this)
					});
					
				}
            },
			
			async creatAddressAndPickPoint() {
				const {
				     data: userInfoRes
				 } = await uni.$http.put('/wx/users/updateUserInfo', this.dynamicFormData)  
				  if (userInfoRes.status != 200) return uni.$showMsg('更新用戶信息失败!')
				  this.updateUserInfo(userInfoRes.data)
				  
				uni.navigateBack({
				    delta: 2
				});
			},
			
			async updateAddressAndPickPoint() {
				this.dynamicFormData.openid = this.userinfo.openid
				    this.dynamicFormData.pid =  this.node
					this.dynamicFormData.code = this.userinfo.code
				const { data:result } =   await uni.$http.put('/wx/users/updateWarehouse', this.dynamicFormData );
				  if( result.status !== 200 ) return uni.$showMsg()  
				    uni.navigateBack({
				        delta: 2
				    });
			}
            
		},
        computed: {
            ...mapState('m_user',['address','openid', 'userinfo']) 
        }
	}
</script>

<style lang="scss">

  // 弹窗
  .line{
  	/* line-height: 18px; */
  	font-family:Arial,Helvetica,sans-serif;
  	font-size:1em;
  	vertical-align:middle;
  	font-weight:normal
  }
  .agreement-view{
  	margin-top: 20px;
  	box-shadow: 0 5rpx 20rpx 0rpx rgba(0, 0, 150, .2);
  	border-radius: 20rpx;
  	padding: 20rpx 0rpx 0rpx 0rpx;
  	display: flex;
  	flex-direction: column;
  	width: 300px;
  	height: 200rpx;
  	align-items: center;
  	/* justify-content: center; */
  	background-color: #fff;
  }
  .u-text-center{
  	font-size: 15px;
  	padding-bottom: 20rpx;
  	font-family:Arial,Helvetica,sans-serif;
  	font-weight: 600;
  	width: 100%;
  	height: 30px;
  	text-align: center;
  }
  .agreement-content{
  	overflow-y: scroll;
  	padding: 0rpx 20rpx 10rpx 20rpx;
  }
  .agreement-btns{
  	width: 100%;
  	/* height: 85rpx; */
  	display: flex;
  	flex-direction: row;
  }
  .yse-btn{
  	color: #fff;
  	background-color: red;
  	flex: 1;
  	text-align: center;
  	width: 100%;
  	height: 100%;
  	border-radius: 0 0 20rpx 0;
  	flex-direction: column;
  	align-items: center;
  	justify-content: center;
  }
  .no-btn{
  	/* background-color: aquamarine; */
  	flex: 1;
  	text-align: center;
  	width: 100%;
  	height: 100%;
  	border-radius: 0 0 0 20rpx;
  }
  .text{
  	line-height: 46px;
  }
  
	.address-form-containe {
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
	.btn-text {
		width: 750rpx;
		background-color: #00aa00;
		height: 50px;
		color: white;
		line-height: 50px;
		text-align: center;
		text-size: 40rpx;
	}
    
</style>