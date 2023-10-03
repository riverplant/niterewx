<template>
	<view class="container">
		<uni-section  type="line">
			<view class="create-order-form-containe">
                <view class="btn">
                     <button prefixIcon="search" type="default" @click="scan">扫描</button>
                            </view>
				<!-- 动态表单校验 -->
				<uni-forms ref="orderFormData" :rules="dynamicRules" :modelValue="orderFormData" label-position="top">
                    <uni-forms-item label="訂單號" required name="orderNumber">
                    	<uni-easyinput disabled v-model="orderFormData.orderNumber"  />
                    </uni-forms-item>
                    <uni-forms-item label="快遞單號" required name="trackingNumber">
                    	<uni-easyinput v-model="orderFormData.trackingNumber" placeholder="请输入快遞單號" />
                    </uni-forms-item>
                  
					<uni-forms-item label="顧客代碼" required name="code">
						<uni-easyinput v-model="orderFormData.code" placeholder="请输入顧客代碼" />
					</uni-forms-item>
                    <uni-forms-item label="實測外包裝長 (cm)" required name="long">
                    	<uni-easyinput v-model="orderFormData.long" placeholder="最多兩位小數" />
                    </uni-forms-item>
                    <uni-forms-item label="實測外包裝寬 (cm)" required name="width">
                    	<uni-easyinput v-model="orderFormData.width" placeholder="最多兩位小數" />
                    </uni-forms-item>
                    <uni-forms-item label="實測外包重量 (cm)" required name="height">
                    	<uni-easyinput v-model="orderFormData.width" placeholder="最多兩位小數" />
                    </uni-forms-item>
                    <uni-forms-item label="選擇物品分類" required name="category">
                    	<uni-data-picker placeholder="请选择選擇物品分類" popup-title="请选择選擇物品分類" :localdata="pickPointList"
                    	    @change="onchange" >
                    	</uni-data-picker>
                    </uni-forms-item>
                    <uni-forms-item label="是否驗貨通過" required name="pass">
                        <radio-group @change="radioChange">
                    	<label class="radio"><radio value="r1" checked="true" />选中</label>
                    					<label class="radio"><radio value="r2" />未选中</label>
                        </radio-group>
                    </uni-forms-item>
                    
                    <uni-forms-item label="驗貨未通過原因 "  name="msg" v-if="isShow" >
                    	<uni-easyinput v-model="orderFormData.msg"  />
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
    import { mapState,mapMutations, mapGetters } from 'vuex'
	export default {
		data() {
			return {
                timer: null,
                kw: '',
                isShow : false,
				orderFormData: {
                    trackingNumber:  '',
					orderNumber: '',
                    code:  '',
                    long:  '',
                    width:  '',
                    height: '',
                    category: '',
                    pass:'',
                    msg:''
                    
					
				},

                testObj: {
                	sname: '',
                	dname: '动态'
                },
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
            if(e && e.uinfo) {
               let uinfo = JSON.parse(e.uinfo)
                if(uinfo !== null || uinfo !== {}) {
                    if(uinfo.userName)
                    this.orderFormData.userName = uinfo.userName
                    if(uinfo.orderNumber)
                     this.orderFormData.orderNumber = uinfo.orderNumber
                     if(uinfo.email)
                      this.orderFormData.email = uinfo.email
                      if(uinfo.mobile)
                       this.orderFormData.mobile = uinfo.mobile
                       if(uinfo.formatted_create-order)
                        this.testObj.sname = uinfo.formatted_create-order
                      
               
                } 
            }else {
              this.orderFormData.orderNumber =  Math.floor(Math.random() * 100000000)
            }
          
            },
		
		methods: {
            ...mapMutations('m_user',['updatecreate-order', 'updateUserInfo']),
            //响应选择事件，接收选中的数据
            selectItemD(data) {
            	console.log('收到数据了:', data);
            },
            
              scan() {
                    uni.scanCode({
                      success: (res) => {
                           console.log(res);
                       uni.showToast({
                         title: "讀取二維碼成功"
                       })
                       this.orderFormData.userName = res.result
                                          }
                                    })
                              },
           
            radioChange: function (e) {
                    console.log(e.detail.value)
                    this.isShow = e.detail.value === 'r2' ? true : false
            	},
            handleInput(res) {
              clearTimeout(this.timer)
              this.timer = setTimeout(() => {
                  this.kw = res,
                 this.getAutocompleteStringList() 
              }, 500)
            },
			onClickItem(e) {
				console.log("create-order:",e);
				
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
              } = await uni.$http.put('http://127.0.0.1:8080/wx/users/updateUserInfo', this.dynamicFormData)  
               if (userInfoRes.status != 200) return uni.$showMsg('更新用戶信息失败!')
               this.updatecreate-order(this.dynamicFormData.formatted_create-order)
               this.updateUserInfo(userInfoRes.data)
               
             uni.navigateBack({
                 delta: 1
             });
            }
            
		},
        computed: {
            ...mapState('m_user',['create-order','openid', 'userinfo']) 
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
    
</style>