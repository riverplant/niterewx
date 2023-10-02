<template>
	<view class="container">
		<uni-section title="动态表单" type="line">
			<view class="address-form-containe">
				<!-- 动态表单校验 -->
				<uni-forms ref="dynamicForm" :rules="dynamicRules" :modelValue="dynamicFormData">
                    <uni-forms-item label="用戶名" required name="userName">
                    	<uni-easyinput v-model="dynamicFormData.userName" placeholder="请输入用戶名" />
                    </uni-forms-item>
                    <uni-forms-item label="微信號" required name="wxnumber">
                    	<uni-easyinput v-model="dynamicFormData.wxnumber" placeholder="请输入微信號" />
                    </uni-forms-item>
					<uni-forms-item label="邮箱" required name="email">
						<uni-easyinput v-model="dynamicFormData.email" placeholder="请输入邮箱地址" />
					</uni-forms-item>
                    <uni-forms-item label="電話號碼" required name="mobile">
                    	<uni-easyinput v-model="dynamicFormData.mobile" placeholder="请输入電話號碼" />
                    </uni-forms-item>
                    <uni-forms-item label="家庭地址" required >

                        <view class="uni-forms-item__content">
                         <input-autocomplete class="uni-easyinput" :min=1  placeholder="请输入家庭地址" @input="handleInput"   :value="testObj.sname"
                              v-model="testObj.sname" highlightColor="#FF0000" :stringList="autocompleteStringList" v-on:selectItem="selectItemS"></input-autocomplete>
                        </view>
                       
                    </uni-forms-item>
				</uni-forms>
      
				<view class="button-group">
					<button type="primary" size="mini" @click="submit('dynamicForm')">提交</button>
				</view>
			</view>
		</uni-section>
	</view>
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
                    wxnumber:  '',
					email: '',
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
            console.log('e:',e)
           let uinfo = JSON.parse(e.uinfo)
            if(uinfo !== null || uinfo !== {}) {
                if(uinfo.userName)
                this.dynamicFormData.userName = uinfo.userName
                if(uinfo.wxnumber)
                 this.dynamicFormData.wxnumber = uinfo.wxnumber
                 if(uinfo.email)
                  this.dynamicFormData.email = uinfo.email
                  if(uinfo.mobile)
                   this.dynamicFormData.mobile = uinfo.mobile
                   if(uinfo.formatted_address)
                    this.testObj.sname = uinfo.formatted_address
                  

            }
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
                   } = await uni.$http.get('http://127.0.0.1:8080/wx/users/addressItemList?kw='+this.kw)
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
              } = await uni.$http.put('http://127.0.0.1:8080/wx/users/updateUserInfo', this.dynamicFormData)  
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
    
</style>