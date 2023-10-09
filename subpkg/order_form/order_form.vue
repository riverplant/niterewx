<template>
	<view class="container">
		<uni-section  type="line">
			<view class="create-order-form-containe">
                <view class="btn">
                     <button prefixIcon="search" type="default" @click="scan">扫描</button>
                            </view>
				<!-- 动态表单校验 -->
				<uni-forms ref="orderFormData" :rules="dynamicRules" :modelValue="orderFormData" label-position="top">
                    	<uni-easyinput disabled v-model="orderFormData.id"  v-if="isHidden === true" />
                    <uni-forms-item label="訂單號" required name="orderNumber">
                    	<uni-easyinput disabled v-model="orderFormData.orderNumber"  />
                    </uni-forms-item>
                    <uni-forms-item label="快遞單號" required name="trackingNumber">
                    	<uni-easyinput v-model="orderFormData.trackingNumber" placeholder="请输入快遞單號" />
                    </uni-forms-item>
                  
					<uni-forms-item label="顧客代碼" required name="code">
						<uni-easyinput v-model="orderFormData.code" placeholder="请输入顧客代碼" />
					</uni-forms-item>
                    <uni-forms-item label="實測外包裝長 (cm)" required name="pLong">
                    	<uni-easyinput v-model="orderFormData.pLong" placeholder="最多兩位小數" />
                    </uni-forms-item>
                    <uni-forms-item label="實測外包裝寬 (cm)" required name="pWidth">
                    	<uni-easyinput v-model="orderFormData.pWidth" placeholder="最多兩位小數" />
                    </uni-forms-item>
                    <uni-forms-item label="實測外包裝高 (cm)" required name="pHeight">
                    	<uni-easyinput v-model="orderFormData.pHeight" placeholder="最多兩位小數" />
                    </uni-forms-item>
                    <uni-forms-item label="實測包裹重量 (kg)" required name="pWeight">
                    	<uni-easyinput v-model="orderFormData.pWeight" placeholder="最多兩位小數" />
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
                    id: '',
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
            console.log('catTree:', this.catTree.data)
            this.catList = this.catTree.data
            console.log('e:',e)
            if(e && e.oinfo) {
               let uinfo = JSON.parse(e.oinfo)
                if(uinfo !== null || uinfo !== {}) {
                    if(uinfo.id)
                    this.orderFormData.id = uinfo.id
                    if(uinfo.orderNumber)
                     this.orderFormData.orderNumber = uinfo.orderNumber
                     if(uinfo.trackingNumber)
                      this.orderFormData.trackingNumber = uinfo.trackingNumber
                      if(uinfo.code)
                       this.orderFormData.code = uinfo.code
                       if(uinfo.pLong)
                        this.orderFormData.pLong = uinfo.pLong
                        if(uinfo.pWidth)
                         this.orderFormData.pWidth = uinfo.pWidth
                         if(uinfo.pWeight)
                          this.orderFormData.pWeight = uinfo.pWeight
                          if(uinfo.msg)
                           this.orderFormData.msg = uinfo.msg
                           if(uinfo.catId)
                            this.orderFormData.pLong = uinfo.pLong
                             this.radioValue = uinfo.orderStatus+''
                      
               
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
                       this.orderFormData.userName = res.result
                                          }
                                    })
                              },
           
            radioChange: function (e) {
                    console.log(e.detail.value)
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
				this.$refs[ref].validate().then(res => {
                  console.log('orderFormData:', this.orderFormData)
                  if(this.orderFormData.id === '') {
                     this.createOrder()  
                  }else {
                     this.updateOrder()   
                  } 
				}).catch(err => {
					console.log('err', err);
				})
			},
            
            async createOrder() {
               const {
                   data: orderRes
               } = await uni.$http.post('http://127.0.0.1:8080/wx/orders/createOrder', this.orderFormData)  
                if (orderRes.status != 200) return uni.$showMsg('創建包裹信息失败!') 
                console.log('orderRes', orderRes)
                let order = {
                    "id": orderRes.data.id,
                    "catName":  orderRes.data.catName,
                    "trackingNumber": orderRes.data.trackingNumber,
                    "price": orderRes.data.price,
                    "pLong": orderRes.data.pLong,
                    "pWidth": orderRes.data.pWidth,
                    "pHeight": orderRes.data.pHeight,
                    "pWeight": orderRes.data.pWeight,
                    "pWeightByVolume": orderRes.data.pWeightByVolume,
                    "state": orderRes.data.state,
                    "orderStatus": orderRes.data.orderStatus
                }
                console.log('order:', order)
                if(orderRes.data.orderStatus === 1)
                this.addToOrdersNonPayer(order)
                else
                this.addToOrdersNonValide(order)
               
               uni.navigateBack({
                   delta: 1
               });
            },
            async updateOrder() {
              const {   
                  data: orderRes
              } = await uni.$http.put('http://127.0.0.1:8080/wx/orders/updateOrder', this.orderFormData)  
               if (orderRes.status != 200) return uni.$showMsg('更新包裹信息失败!') 
               console.log('orderRes', orderRes)
               let order = {
                   "id": orderRes.data.id,
                   "catName":  orderRes.data.catName,
                   "trackingNumber": orderRes.data.trackingNumber,
                   "price": orderRes.data.price,
                   "pLong": orderRes.data.pLong,
                   "pWidth": orderRes.data.pWidth,
                   "pHeight": orderRes.data.pHeight,
                   "pWeight": orderRes.data.pWeight,
                   "pWeightByVolume": orderRes.data.pWeightByVolume,
                   "state": orderRes.data.state,
                   "orderStatus": orderRes.data.orderStatus
               }
               console.log('order:', order)
               if(orderRes.data.orderStatus === 1)
               this.updateOrdersNonPayer(order)
               else
               this.updateOrdersNonValide(order)
               
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
            ...mapState('m_order',['catTree']) 
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