<template>
	<view class="container">
			<view class="create-box-form-containe">
				<view class="box_form_title">
					箱号:{{dynamicBoxForm.boxNumber}} || 所属仓库:{{dynamicBoxForm.pName}}
				</view>
				<uni-forms ref="dynamicBoxForm" :modelValue="dynamicBoxForm" >
					<block v-if="isShow">
					<uni-forms-item >
						<uni-easyinput v-model="dynamicBoxForm.id" />		
					</uni-forms-item>	
					</block>
					
					<uni-forms-item >
						<uni-easyinput v-model="key" @input="handleInput" suffixIcon="search" placeholder="可输入快递单号/包裹号码" @iconClick="iconClick" @focus="clear"/>		
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
				key:'',
				dynamicBoxForm: {
					id:'',
				    boxNumber:  0,
				    pid: '',
					pName:'',
					boxStatus: 1,
					boxType: 1,
					code:'',
					orderIds:[],
					isShow:false
					
				},
				devices: [],
				deviceId: '',
				serverList: [],
				serviceId: '',
				characteristics: [],
				characteristicId: '',
            searchResults:[]
			}
		},

		onLoad(e) {
            console.log('e:',e)
            if(e && e.box) {
               let box = JSON.parse(e.box)
			   console.log('box:',box)
			   this.dynamicBoxForm.id = box.id
               this.dynamicBoxForm.boxNumber = box.boxNumber
			   this.dynamicBoxForm.pid = box.pid
			   this.dynamicBoxForm.pName = box.pName
               this.dynamicBoxForm.boxStatus = box.boxStatus
               this.dynamicBoxForm.boxType = box.boxType
			   if(box.orderInfos.length > 0) {
			   this.dynamicBoxForm.orderIds = box.orderInfos.map(orderInfos=>orderInfos.id)	
			   }else {
				  this.dynamicBoxForm.orderIds = box.orderIds  
			   }
			  
			   if(this.dynamicBoxForm.orderIds.length > 0) {
				   this.searchResults = this.orderList.filter(order=> this.dynamicBoxForm.orderIds.includes(order.id))
			   }
            }
          
            },
		computed: {
		    ...mapState('m_order',['orderList']) 
		},
		 mounted () {
		      // 初始化蓝牙模块
		  this.openBluetoothAdapter()
		      },
		methods: {
			 openBluetoothAdapter () {
			                  var _this = this
			                  uni.openBluetoothAdapter({
			                        complete (e) {
			                              console.log(e);
			                              if (!e.errCode) {
			                                    console.log('初始化完成')
			                              } else if (e.errCode == 10001) {
			                                    uni.showToast({
			                                          icon: 'none',
			                                          title: '请打开手机蓝牙'
			                                    })
			                              } else {
			                                    uni.showToast({
			                                          icon: 'none',
			                                          title: e.errMsg
			                                    })
			                              }
			                        }
			                  })
			            },
			clear() {
				this.key = ''
			},
			handleInput(res) {
			   this.key = res   
			},
			
			iconClick() {
				this.updateOrderList()
	
			},
			
			validePid(order) {
				if(order.pid != null && order.pid != this.dynamicBoxForm.pid) {
					return uni.showToast({
					  title: "装箱失败，去往"+this.dynamicBoxForm.pName+"箱子不能装去往"+order.pName+"的包裹",
					  duration: 2000,
					  icon: 'none'
					}) 
				}
			},
			
			valideBoxNumber(order) {
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
			},
			updateOrderList() {
				let order = this.orderList.filter(order=>order.orderNumber == this.key || order.trackingNumber == this.key)[0]
				if(order != undefined) {
					this.validePid(order)
					this.valideBoxNumber(order)

				if(this.searchResults.filter( item=> item.orderNumber == order.orderNumber ).length != 0){
					return uni.showToast({
							title: "该包裹已经被装入箱子,不需要重复添加",
							duration: 2000,
							icon: 'none'
							  }) 
						} else {
							this.validaeBoxType(order)
						}
					
				}else {
					return uni.showToast({
					  title: "该包裹号码为空",
					  duration: 2000,
					  icon: 'none'
					}) 
				}
			},
			
			validaeBoxType(order) {
				if( this.searchResults.length > 0 
				&& this.searchResults.filter(item=> item.code).length == 0) 
				{
					uni.showModal({
					    title: '提示',
					    content: '該包裹的提貨碼不同，你確定要加入嗎？箱子的類型會變成合裝箱',
					    success: function (res) {
					        if (res.confirm) {
					           this.searchResults.push(order)
					           this.dynamicBoxForm.orderIds.push(order.id)
							   this.dynamicBoxForm.boxType = 2
							   
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }.bind(this)
					});
				}else {
					this.searchResults.push(order)
					this.dynamicBoxForm.orderIds.push(order.id)
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
				console.log('this.dynamicBoxForm:',this.dynamicBoxForm)
				
				this.$refs[ref].validate().then(res => {
					if(this.dynamicBoxForm.id == '') {
						this.createBox()
					}else {
					 this.updateBox()   	
					}   
				}).catch(err => {
					 uni.$showMsg(err) 
				})
				uni.navigateBack({
				    delta: 1
				});
			},
			
            async createBox() {
             const {   
                  data: boxRes
              } = await uni.$http.put('/wx/box/create', this.dynamicBoxForm)  
               if (boxRes.status != 200) return uni.$showMsg('更新箱子信息失败!') 
               uni.$showMsg('更新箱子信息完成!') 
            }, 
				
            async updateBox() {
             const {   
                  data: boxRes
              } = await uni.$http.put('/wx/box/update', this.dynamicBoxForm)  
               if (boxRes.status != 200) return uni.$showMsg('更新箱子信息失败!') 
               uni.$showMsg('更新箱子信息完成!') 
            },  
			   
			submit(ref) {
				console.log('submit.................')
				this.$refs[ref].validate().then(res => {
					if(this.dynamicBoxForm.id == '') {
						this.createBox()
					}else {
					 this.updateBox()   	
					}   
					this.updateBoxStatus()
				}).catch(err => {
					 uni.$showMsg(err) 
				})
			},
			
			async updateBoxStatus(){
				console.log('updateBoxStatus.................')
			}
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