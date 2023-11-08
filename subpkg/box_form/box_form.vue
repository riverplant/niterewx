<template>
	<view class="container">
			<view class="create-box-form-containe">
				<view class="box_form_title">
					箱号:{{dynamicBoxForm.boxNumber}} || 所属仓库:{{dynamicBoxForm.pName}}
				</view>
				<uni-forms ref="dynamicBoxForm" :modelValue="dynamicBoxForm" >
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
					<button type="primary" size="mini" @click="save('dynamicBoxForm')">保存</button>
					<button type="primary" size="mini" @click="submit('dynamicBoxForm')">封箱</button>
				</view>
			</view>
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
				this.updateOrderList()
	
			},
			
			updateOrderList() {
				let order = this.orderList.filter(order=>order.orderNumber == this.dynamicBoxForm.key || order.trackingNumber == this.dynamicBoxForm.key)[0]
				if(order != undefined) {
				if(order.pid != null && order.pid != this.dynamicBoxForm.pid) {
					return uni.showToast({
					  title: "装箱失败，去往"+this.dynamicBoxForm.pName+"箱子不能装去往"+order.pName+"的包裹",
					  duration: 2000,
					  icon: 'none'
					}) 
				}
				if( order.boxNumber != 0 && order.boxNumber != this.dynamicBoxForm.boxNumber) {
					console.log('order.boxNumber:',order.boxNumber)
					return uni.showToast({
					  title: "该包裹已经被装入箱子:"+ order.boxNumber,
					  duration: 2000,
					  icon: 'none'
					}) 
				}
				 if(order.boxNumber != 0 && order.boxNumber == this.dynamicBoxForm.boxNumber) {
					return uni.showToast({
					  title: "该包裹已经被装入箱子,不需要重复添加",
					  duration: 2000,
					  icon: 'none'
					}) 
				}
				if(this.searchResults.filter( item=> item.orderNumber == order.orderNumber ).length != 0){
					console.log('3')
					return uni.showToast({
							title: "该包裹已经被装入箱子,不需要重复添加",
							duration: 2000,
							icon: 'none'
							  }) 
						} else {
							this.searchResults.push(order)
						}
					
				}else {
					return uni.showToast({
					  title: "该包裹号码为空",
					  duration: 2000,
					  icon: 'none'
					}) 
				}
			},
             scan() {
                    uni.scanCode({
                      success: (res) => {
				     this.dynamicBoxForm.key = res,result
                         this.updateOrderList()}
                          })
                      },
			
			save(ref) {
				console.log('orderFormData:', this.orderFormData)
				this.$refs[ref].validate().then(res => {
                     this.updateBox()   
				}).catch(err => {
					console.log('err', err);
				})
			},
            
            async updateBox() {
				let weightTotal = this.searchResults.reduce((total, item)=> total += item.pWeight, 0)
				console.log('weightTotal:',weightTotal)
            /**  const {   
                  data: orderRes
              } = await uni.$http.put('/wx/orders/updateOrder', this.orderFormData)  
               if (orderRes.status != 200) return uni.$showMsg('更新包裹信息失败!') 
               
             uni.navigateBack({
                 delta: 1
             });**/
            },     
		}
	}
</script>

<style lang="scss">
    .box_form_title {
		margin-bottom: 15px;
	}
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