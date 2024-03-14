<template>
		<uni-section  type="line">
	<view class="container">
	
			<view class="address-form-containe">
				<!-- 动态表单校验 -->
				<uni-forms ref="dynamicForm" :rules="dynamicRules" :modelValue="dynamicFormData" label-position="top">
                    <uni-forms-item label="用戶名" required name="userName">
                    	<uni-easyinput v-model="dynamicFormData.userName" placeholder="用戶名" />
                    </uni-forms-item> 
                    <uni-forms-item label="电话号码" required name="mobile">
                    	<uni-easyinput v-model="dynamicFormData.mobile" placeholder="电话号码" />
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
                    place_id:  '',
                    address:  '',
                    city: '',
                    province:0,
                    userName:  '',
                    pcode: '',
                    openId: ''	
				},            
                range: getApp().globalData.range,
               default_value:1,
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
				}
			}
		},

		onLoad(e) {
                this.dynamicFormData.userName = this.userinfo.userName
                this.dynamicFormData.mobile = this.userinfo.mobile
                if(this.userinfo.address) {
                  this.dynamicFormData.address = this.userinfo.address.address   
                  this.dynamicFormData.city = this.userinfo.address.city
                  this.dynamicFormData.province = this.userinfo.address.province
                   this.dynamicFormData.pcode = this.userinfo.address.pcode
                   this.default_value = this.userinfo.address.province
                }
            },
		
		methods: {
            ...mapMutations('m_user',[ 'updateUserInfo']),

          change(e) {
                   this.dynamicFormData.province = e
                   console.log("e:", e);
                  },
			submit(ref) {
				this.$refs[ref].validate().then(res => {
                  console.log('dynamicFormData:', this.dynamicFormData)
                  this.dynamicFormData.openId = this.openid 
                  this.updateUserInfos()
				}).catch(err => {
					console.log('err', err);
				})
			},
            async updateUserInfos() {
              const {
                  data: userInfoRes
              } = await uni.$http.put('/wx/users/updateUserInfo', this.dynamicFormData)  
               if (userInfoRes.status != 200) return uni.$showMsg('更新用戶信息失败!')
               this.updateUserInfo(userInfoRes.data)
               
             uni.navigateBack({
                 delta: 1
             });
            }
            
		},
        computed: {
            ...mapState('m_user',['address','openid', 'userinfo']) 
        }
	}
</script>

<style lang="scss">

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