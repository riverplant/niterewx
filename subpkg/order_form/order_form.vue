<template>
	<view class="container">
		<uni-section  type="line">
			<view class="create-order-form-containe">
				<!-- 动态表单校验 -->
				<uni-forms ref="orderFormData" :rules="dynamicRules" :modelValue="orderFormData" label-position="top">
                    	<uni-easyinput disabled v-model="orderFormData.orderId"  v-if="isHidden === true" />
                    	<uni-easyinput disabled v-model="orderFormData.orderNumber"   v-if="isHidden === true" />

                    <uni-forms-item label="快递单号" required name="trackingNumber">
                    	<uni-easyinput v-model="orderFormData.trackingNumber" placeholder="掃描或者输入快递单号" prefixIcon="search" @iconClick="scan"/>
                    </uni-forms-item>
                  
					<uni-forms-item label="顾客代码" required name="code">
						<uni-easyinput v-model="orderFormData.code" placeholder="请输入顾客代码" />
					</uni-forms-item>
                    <uni-forms-item label="实测外包装长 (cm)" required name="pLong">
                    	<uni-easyinput v-model="orderFormData.pLong" placeholder="最多两位小数" />
                    </uni-forms-item>
                    <uni-forms-item label="实测外包装宽 (cm)" required name="pWidth">
                    	<uni-easyinput v-model="orderFormData.pWidth" placeholder="最多两位小数" />
                    </uni-forms-item>
                    <uni-forms-item label="实测外包装高 (cm)" required name="pHeight">
                    	<uni-easyinput v-model="orderFormData.pHeight" placeholder="最多两位小数" />
                    </uni-forms-item>
                    <uni-forms-item label="实测包裹重量 (kg)" required name="pWeight">
                    	<uni-easyinput v-model="orderFormData.pWeight" placeholder="最多两位小数" />
                    </uni-forms-item>
                    <uni-forms-item label="选择物品分类" required name="catId">
                    	<uni-data-picker placeholder="请选择物品分类" popup-title="请选择物品分类" :localdata="catList"
                    	    @change="onchange" >
                    	</uni-data-picker>
                    </uni-forms-item>
                    <uni-forms-item label="是否通过验货" required name="pass">
                        <radio-group @change="radioChange">
                    	<label class="radio"><radio value="1" :checked="radioValue==1" />通过</label>
                    					<label class="radio"><radio value="2" :checked="radioValue==2" />未通过</label>
                        </radio-group>
                    </uni-forms-item>
                    
                    <uni-forms-item label="验货未通过原因 "  name="msg" v-if="isShow" >
                    	<uni-easyinput v-model="orderFormData.msg"  />
                    </uni-forms-item>
				</uni-forms>
      
				<view class="button-group">
					<button type="primary" size="mini" @click="submit('orderFormData')">提交</button>
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
                isHidden: false,
                kw: '',
                isShow : false,
                radioValue: '1',
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
                    orderStatus: 1
					
                    
					
				},
            catList:[],
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
					this.orderFormData.orderStatus = uinfo.orderStatus
					this.isShow = uinfo.orderStatus == 2
					if(this.isShow)
					   this.orderFormData.msg = uinfo.msg
                      
               
                } 
            }else {
              this.orderFormData.orderNumber =  Math.floor(Math.random() * 100000000)
            }
          
            },
		
		methods: {
            ...mapMutations('m_order',['addToOrdersNonValide','addToOrdersNonPayer','updateOrdersNonPayer','updateOrdersNonValide']),
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
                       this.orderFormData.trackingNumber = res.result
                                          }
                                    })
                              },
           
            radioChange: function (e) {
                    this.orderFormData.orderStatus = e.detail.value === '2' ? 2 : 1
                    this.isShow = e.detail.value === '2' ? true : false
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
				uni.showModal({
				    title: '提示',
				    content: '確定填入的用戶提貨碼為:'+this.orderFormData.code+'?',
				    success: function (res) {
				        if (res.confirm) {
				           this.$refs[ref].validate().then(res => {
				            
				             if(this.orderFormData.orderId === '') {
				                this.createOrder()  
				             }else {
				                this.updateOrder()   
				             } 
				           }).catch(err => {
				           	console.log('err', err);
				           })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }.bind(this)
				});
				
			},
            
            async createOrder() {
               const {
                   data: orderRes
               } = await uni.$http.post('/wx/orders/createOrder', this.orderFormData)  
                if (orderRes.status != 200) return uni.$showMsg('創建包裹信息失败!') 
 
               uni.navigateBack({
                   delta: 1
               }); 
            },
            async updateOrder() {
				console.log('orderFormData:', this.orderFormData)
              const {   
                  data: orderRes
              } = await uni.$http.put('/wx/orders/updateOrder', this.orderFormData)  
               if (orderRes.status != 200) return uni.$showMsg('更新包裹信息失败!') 
               
             uni.navigateBack({
                 delta: 1
             });
            },
            onchange(e) {
                const value = e.detail.value
                this.orderFormData.catId = value[value.length - 1].value
            },
            
		},
        computed: {
            ...mapState('m_order',['catTree']) ,
			...mapState('m_user', ['userinfo'])
        }
	}
</script>

<style lang="scss">

	.create-order-form-containe {
		padding: 15px;
		padding-top: 0px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		width: 100%;
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
		width: 100%;
		height: 35px;
	}
    
    .content {
    	text-align: center;
    	height: 100%;
    }
    
</style>