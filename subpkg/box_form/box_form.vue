<template>
	<view class="container">
		<uni-section  type="line">
			<view class="create-box-form-containe">
                <view class="btn">
                     <button prefixIcon="search" type="default" @click="scan">扫描</button>
                            </view>
				<view class="button-group">
					<button type="primary" size="mini" @click="save('orderFormData')">保存</button>
					<button type="primary" size="mini" @click="submit('orderFormData')">封箱</button>
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
                    orderStatus: 1,
					openId:''
                    
					
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
                       this.orderFormData.userName = res.result
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
			    this.orderFormData.openId = this.userinfo.openId
				console.log('orderFormData:', this.orderFormData)
				this.$refs[ref].validate().then(res => {
                 
                  if(this.orderFormData.orderId === '') {
                     this.createOrder()  
                  }else {
                     this.updateOrder()   
                  } 
				}).catch(err => {
					console.log('err', err);
				})
			},
            
            async createOrder() {
				console.log('orderFormData:', this.orderFormData)
               const {
                   data: orderRes
               } = await uni.$http.post('/wx/orders/createOrder', this.orderFormData)  
                if (orderRes.status != 200) return uni.$showMsg('創建包裹信息失败!') 
 
               uni.navigateBack({
                   delta: 1
               }); 
            },
            async updateOrder() {
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

	.create-box-form-containe {
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