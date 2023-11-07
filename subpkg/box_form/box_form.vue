<template>
	<view class="container">
		<uni-section  type="line">
			<view class="create-box-form-containe">
				<uni-forms ref="dynamicBoxForm" :modelValue="dynamicBoxForm" >
					<uni-forms-item label="扫码装箱,箱号: " name="dynamicBoxForm.boxNumber">
						<uni-easyinput disabled v-model="dynamicBoxForm.boxNumber"  />
					</uni-forms-item>
					<uni-forms-item label="所属仓库: " name="dynamicBoxForm.pName">
						<uni-easyinput disabled v-model="dynamicBoxForm.pName"  />
					</uni-forms-item>
					<uni-forms-item >
						<uni-easyinput v-model="dynamicBoxForm.key" @input="handleInput" suffixIcon="search" placeholder="可输入快递单号/包裹号码" @iconClick="iconClick"/>		
					</uni-forms-item>
				</uni-forms>
                <view class="btn">
                     <button prefixIcon="search" type="default" @click="scan">扫描</button>
                   </view>	
				<uni-swipe-action>
				     <block v-for="(item,i) in searchResults" :key='i'>
				<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(item)">
				     <order-item :order="item"></order-item>
				</uni-swipe-action-item>
				    </block>
				</uni-swipe-action>
				
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
				dynamicBoxForm: {
					key:'',
				    boxNumber:  0,
				    pid: '',
					pName:''
					
				},
            searchResults:[]
			}
		},

		onLoad(e) {
            console.log('e:',e)
            if(e && e.box) {
               let box = JSON.parse(e.box)
               this.dynamicBoxForm.boxNumber = box.boxNumber
			   this.dynamicBoxForm.pid = box.pid
			   this.dynamicBoxForm.pName = box.pName

                   
   
            }else {
              this.orderFormData.orderNumber =  Math.floor(Math.random() * 100000000)
            }
          
            },
		computed: {
		    ...mapState('m_order',['orderList']) 
		},
		methods: {
			
			handleInput(res) {
			   this.dynamicBoxForm.key = res
			   
			},
			
			iconClick() {
				console.log('value:',this.dynamicBoxForm.key)
				let order = this.orderList.filter(order=>order.orderNumber == this.dynamicBoxForm.key || order.trackingNumber == this.dynamicBoxForm.key)
				console.log('order:',order)
				this.searchResults.push(order)
			},
             scan() {
                    uni.scanCode({
                      success: (res) => {
				     this.dynamicBoxForm.key = res,result
                           console.log('扫描得到key:',this.dynamicBoxForm.key);
     
                                          }
                                    })
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