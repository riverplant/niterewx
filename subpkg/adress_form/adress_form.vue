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
                    <uni-forms-item label="家庭地址" required >

                        <view class="uni-forms-item__content">
                         <input-autocomplete class="uni-easyinput" :min=1  placeholder="家庭地址" @input="handleInput"   :value="testObj.sname"
                              v-model="testObj.sname" highlightColor="#FF0000" :stringList="autocompleteStringList" v-on:selectItem="selectItemS"></input-autocomplete>
                        </view>
                       
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
    import inputAutocomplete from '@/components/address-autocomplete/address-autocomplete.vue'
    import { mapState,mapMutations, mapGetters } from 'vuex'
	export default {
        components: {inputAutocomplete}, 
		data() {
			return {
                timer: null,
                kw: '',
				dynamicFormData: {
                    mobile:  '',
                    place_id:  '',
                    formatted_address:  '',
                    userName:  '',
                    openId: ''
					
				},

                testObj: {
                	sname: '',
                	dname: '动态'
                },
                autocompleteStringList: [],
				dynamicRules: {
                    mobile: {
                    	rules: [{
                    		format: 'number',
                    		errorMessage: '電話號碼只能输入数字'
                    	}]
                    },
					email: {
						rules: [{
							required: true,
							errorMessage: '域名不能为空'
						}, {
							format: 'email',
							errorMessage: '域名格式错误'
						}]
					}
				}
			}
		},

		onLoad(e) {
                this.dynamicFormData.userName = this.userinfo.userName
                this.dynamicFormData.mobile = this.userinfo.mobile
                this.testObj.sname = this.userinfo.address.formatted_address

            },
		
		methods: {
            ...mapMutations('m_user',['updateAddress', 'updateUserInfo']),
            //响应选择事件，接收选中的数据
            selectItemD(data) {
            	console.log('收到数据了:', data);
            },
            selectItemS(data) {
            	//选择事件
            	console.log('收到数据了:', data);
               let item = data.selectItem
               this.dynamicFormData.place_id = item.key
               this.dynamicFormData.formatted_address = item.text
            },
            
            handleInput(res) {
              clearTimeout(this.timer)
              this.timer = setTimeout(() => {
                  this.kw = res,
                 this.getAutocompleteStringList() 
              }, 500)
            },
            
           async getAutocompleteStringList() {
               this.autocompleteStringList = []
                if(this.kw !== '') {
                   this.autocompleteStringList = []
                   const param = {
                       str: this.kw
                   }
                   const {
                       data: addressRes
                   } = await uni.$http.get('/wx/users/addressItemList?kw='+this.kw)
                   if (addressRes.status != 200) return uni.$showMsg('獲取地址列表失败!')
                   console.log('res.data:', addressRes.data)
                   this.autocompleteStringList = addressRes.data
                 }
            },
 
			onClickItem(e) {
				console.log("address:",e);
				
			},

			submit(ref) {
				this.$refs[ref].validate().then(res => {
                  console.log('dynamicFormData:', this.dynamicFormData)
                  this.dynamicFormData.openId = this.openid 
                   this.dynamicFormData.formatted_address = this.testObj.sname
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
               this.updateAddress(this.dynamicFormData.formatted_address)
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