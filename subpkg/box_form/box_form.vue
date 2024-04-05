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
					<button type="primary" size="mini" @click="submit('dynamicBoxForm')" v-if="dynamicBoxForm.boxStatus == 1">封箱</button>
					<button type="primary" size="mini" @click="print('dynamicBoxForm')" v-else>打标</button>
				</view>
			</view>
	</view>
</template>

<script>
	var tsc = require('@/subpkg/print/js/tsc.js')
    import { mapState,mapMutations, mapGetters } from 'vuex'
	import Bluetooth from '@/subpkg/print/js/bluetooth.js'
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
					codes:[],
					orderIds:[],
					isShow:false,
					key:''
				},
				bluetooth: new Bluetooth(),
				options:[{
				    text:'删除',
				    style: {
				        backgroundColor: '#C00000'
				    }
				}],
				close:false,
                searchResults:[],

			}
		},
//页面卸载是关闭蓝牙链接
		onUnload() {
			this.bluetooth.closeBLEConnection();
		    this.bluetooth.closeBluetoothAdapter();
				},
		onLoad(e) {
            if(e && e.box) {
               let box = JSON.parse(e.box)	
				 console.log('box:',box)
			   this.dynamicBoxForm.id = box.id
			   if(box.boxNumber === 0) 
			   {
				   this.createBoxNumber()
			   }
			   else 
			   {
				  this.dynamicBoxForm.boxNumber = box.boxNumber  
			   }
			   this.dynamicBoxForm.pid = box.pid
				this.dynamicBoxForm.pName = box.pName   
			   
               this.dynamicBoxForm.boxStatus = box.boxStatus
               this.dynamicBoxForm.boxType = box.boxType
			    this.dynamicBoxForm.codes = box.codes
			   if( box.orderInfos && box.orderInfos.length > 0) {
			   this.dynamicBoxForm.orderIds = box.orderInfos.map(orderInfos=>orderInfos.id)	
			   }else {
				  this.dynamicBoxForm.orderIds = []  
			   }
			   if(this.dynamicBoxForm.orderIds.length > 0) {
				   this.searchResults = this.orderList.filter(order=> this.dynamicBoxForm.orderIds.includes(order.id))
				   console.log('this.searchResults:',this.searchResults)
			   }
            }
            this.bluetooth.openBluetoothAdapter();
            },
		computed: {
			 ...mapState('m_order',['orderList']) ,
		    ...mapState('m_gprinter',['deviceId','serviceId', 'characteristicId']) 
		},
		methods: {
			
			async createBoxNumber() {
				   const {
				       data: orderRes
				   } = await uni.$http.get('/wx/box/createBoxNumber')  
				    if (orderRes.status != 200) return uni.$showMsg('创建箱子号码失败!') 
					
			     this.dynamicBoxForm.boxNumber = orderRes.data
			},
			destroyed: function() {
				if (this.connId != '') {
					uni.closeBLEConnection({
						deviceId: this.connId,
						success(res) {
							console.log(res)
						}
					})
				}
			
			},
			swipeItemClickHandler(item) {
			    this.presremoveItemById(item.id)
			},
			presremoveItemById(id) {
				uni.showModal({
				    title: '提示',
				    content: '确定要从箱子里移除除包裹吗',
				    success: function (res) {
				        if (res.confirm) {
				           this.removeItemById(id)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }.bind(this)
				});
			
			},
			async removeItemById(id) {
				this.searchResults = this.searchResults.filter( box=> box.id  != id )
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
					return uni.showToast({
					  title: "该包裹已经被装入箱子:"+ order.boxNumber,
					  duration: 2000,
					  icon: 'none'
					}) 
				}
			},
			updateOrderList() {
				let order = this.orderList.filter( order=>order.orderNumber == this.key || order.trackingNumber == this.key)[0]
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
					/**uni.showModal({
					    title: '提示',
					    content: '該包裹的提貨碼不同，你確定要加入嗎？箱子的類型會變成合裝箱',
					    success: function (res) {
					        if (res.confirm) {
					           this.searchResults.push(order)
							   this.dynamicBoxForm.boxType = 2
							   
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }.bind(this)
					});**/
					
					return uni.showToast({
							title: "該包裹的提貨碼不同,不能混装",
							duration: 2000,
							icon: 'none'
							  }) 
				} 		
				else 
				{
					this.searchResults.push(order)
					this.dynamicBoxForm.orderIds.push(order.id)
				}
			},
             scan() {
                    uni.scanCode({
                      success: (res) => {
				     this.dynamicBoxForm.key = res.result
					 this.key = res.result
                         this.updateOrderList()}
                          })
                      },
			
			save(ref) {
				this.$refs[ref].validate().then(res => {
					if(this.dynamicBoxForm.id == '') {
						this.createBox()
					}else {
					 this.updateBox()   	
					}   
				}).catch(err => {
					 uni.$showMsg(err) 
				})
			},
			
            async createBox() {
				this.dynamicBoxForm.orderIds = this.searchResults.map(item=>item.id)
             const {   
                  data: boxRes
              } = await uni.$http.post('/wx/box/create', this.dynamicBoxForm)  
               if (boxRes.status != 200) return uni.$showMsg('更新箱子信息失败!') 
               uni.$showMsg('更新箱子信息完成!') 
			   if(this.close == true) {
				  this.closeBox()
			   }
			   uni.navigateBack({
			       delta: 2
			   }); 
            }, 
				
            async updateBox() {
				this.dynamicBoxForm.orderIds = this.searchResults.map(item=>item.id)
             const {   
                  data: boxRes
              } = await uni.$http.put('/wx/box/update', this.dynamicBoxForm)  
               if (boxRes.status != 200) return uni.$showMsg('更新箱子信息失败!') 
               uni.$showMsg('更新箱子信息完成!') 
			   		if(this.dynamicBoxForm.boxStatus === 2)
			   		     this.openBox()
			   		else if(this.close == true)
			   		  this.closeBox()		  
			   uni.navigateBack({
			       delta: 2
			   }); 
            },  
			   
			submit(ref) {
				console.log('dynamicBoxForm:',this.dynamicBoxForm)
				if(this.dynamicBoxForm.orderIds.length === 0) {
					return uni.$showMsg('请至少在箱子中放入一个包裹!') 
				}
				this.$refs[ref].validate().then(res => {
					this.close = true
					if(this.dynamicBoxForm.id == '') {
						this.createBox()
					}else {
					 this.updateBox()   	
					}   
				}).catch(err => {
					 uni.$showMsg(err) 
				})
			},
			
			async closeBox(){
				const {
				     data: boxRes
				 } = await uni.$http.put('/wx/box/close/'+this.dynamicBoxForm.id)  
				  if (boxRes.status != 200) return uni.$showMsg('关箱失败!') 
				  uni.$showMsg('关箱完成!') 
				  this.close = false
				  this.dynamicBoxForm.boxStatus = 2
			},
			
			async openBox(){
				const {
				     data: boxRes
				 } = await uni.$http.put('/wx/box/open/'+this.dynamicBoxForm.id)  
				  if (boxRes.status != 200) return uni.$showMsg('开箱失败!') 
				  uni.$showMsg('开箱完成!') 
				  this.dynamicBoxForm.boxStatus = 1
			},
			
			print() {
				if( this.deviceId ) 
				{
					console.log('this.deviceId:',this.deviceId)
					this.onConn()
				}
				else 
				{
					this.gotoPrinterPage()
				}
				
			},
			
			onConn() {
				console.log(`连接蓝牙:` + this.deviceId );
				let isDone = true
				var that = this
				uni.createBLEConnection({
					deviceId: this.deviceId,
					complete(res) {
						console.log('msg:',res.errMsg)
						if (res.errMsg == "createBLEConnection:ok") {
							uni.hideLoading();
							setTimeout(function() {
								that.getBLEServices()
							}, 2000)
						} else {
							console.log("onConn echec")
							isDone = false
						}
					},
				})
				
				if(isDone == false)
				   this.gotoPrinterPage()
			},
			
			getBLEServices() {
				let isDone = true
				var that = this
				let deviceId = this.deviceId
			
				uni.getBLEDeviceServices({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: deviceId,
					complete(res) {
			
						for (var s = 0; s < res.services.length; s++) {
							if( res.services[s].uuid === that.serviceId ) 
							{
								let serviceId = res.services[s].uuid
								uni.getBLEDeviceCharacteristics({
									// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
									deviceId: deviceId,
									// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
									serviceId: serviceId,
									success(res) {
										var re = JSON.parse(JSON.stringify(res))
											
										console.log('deviceId = [' + deviceId + ']  serviceId = [' + serviceId + ']')
										for (var c = 0; c < re.characteristics.length; c++) {
											if (re.characteristics[c].properties.write == true && re.characteristics[c].uuid == that.characteristicId) {
												let uuid = re.characteristics[c].uuid
												console.log(' deviceId = [' + deviceId + ']  serviceId = [' + serviceId + '] characteristics=[' +
													uuid)
                                                that.senBleLabel( deviceId, serviceId, uuid)
												break
								               
											}
										}
									}
								})
								break
							}

			
						}
                      
					},
					fail(res) {
						console.log(res)
						isDone = false
						uni.showToast(`获取设备服务失败` + JSON.stringify(res));
					},
				})
				if( isDone == false )
				this.gotoPrinterPage()
			
			},
					
			gotoPrinterPage() {
				let url = '/subpkg/print/print?box='+JSON.stringify(this.dynamicBoxForm)
				uni.navigateTo({
				  url: url
				});
			},
			
			senBleLabel( deviceId, serviceId, uuid ) {
				console.log('dynamicBoxForm:', this.dynamicBoxForm)
				//标签模式
				var command = tsc.jpPrinter.createNew()
				// console.log(command)
			    command.setSize(100, 150)
                command.setGap(2)
                command.setCls()
				command.setText(100, 10, "4", 1, 1, this.dynamicBoxForm.pName)
				command.setQR(110, 50, "L", 10, "A", this.dynamicBoxForm.id)
				command.setText(100, 400, "TSS24.BF2", 1, 1, "箱号: ")
				command.setText(200, 400, "4", 1, 1,  this.dynamicBoxForm.boxNumber)
				command.setText(100, 450, "TSS24.BF2", 1, 1, "包裹数: " )
				command.setText(200, 450, "4", 1, 1, "包裹数: " + this.dynamicBoxForm.orderIds.length)
				command.setText(100, 500, "TSS24.BF2", 1, 1, "提货码: ")
				for (let i = 0; i < this.dynamicBoxForm.codes.length; i ++) {
					command.setText(100, 500 + 50, "4", 1, 1, this.dynamicBoxForm.codes[i])
				}
				command.setPagePrint()
				this.senBlData( deviceId, serviceId, uuid, command.getData() )
			},
			
			senBlData(deviceId, serviceId, characteristicId,uint8Array) {
				console.log('************deviceId = [' + deviceId + ']  serviceId = [' + serviceId + '] characteristics=[' +characteristicId+ "]")
				var uint8Buf = Array.from(uint8Array);
				function split_array(datas,size){
					var result = {};
					var j = 0
					for (var i = 0; i < datas.length; i += size) {
						result[j] = datas.slice(i, i + size)
						j++
					}
					console.log(result)
					return result
				}
				var sendloop = split_array(uint8Buf, 20);
				function realWriteData(sendloop, i) {
					var data = sendloop[i]
					if(typeof(data) == "undefined"){
						return
					}
					console.log("第【" + i + "】次写数据"+data)
					var buffer = new ArrayBuffer(data.length)
					var dataView = new DataView(buffer)
					for (var j = 0; j < data.length; j++) {
						dataView.setUint8(j, data[j]);
					}
					uni.writeBLECharacteristicValue({
						deviceId,
						serviceId,
						characteristicId,
						value: buffer,
						success(res) {
							realWriteData(sendloop, i + 1);
						}
					})
				}
			   var i = 0;
				realWriteData(sendloop, i);
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