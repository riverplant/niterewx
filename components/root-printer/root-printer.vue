<template>
	<view class="root-printer-container">
	     	<uni-section  type="line">
	     		<view class="root-printer-form-containe">
	     			<!-- 动态表单校验 -->
	     			<uni-forms ref="orderFormData" :rules="dynamicRules" :modelValue="orderFormData" label-position="top">
	                     <uni-forms-item label="客户编码"  name="code">
	                     	<uni-easyinput v-model="dynamicFormData.code" placeholder="输入客户编码" prefixIcon="search" />
	                     </uni-forms-item>
	                     <uni-forms-item label="出海日期" required name="departureDate">
	                         <uni-data-select
	                               v-model="departDate"
	                               :localdata="departureDateList"
	                               @change="change"
	                             ></uni-data-select>
	                     
	                     </uni-forms-item>
	                     <uni-forms-item label="收货倉庫" required name="pid">
	                     	<uni-data-picker placeholder="请选择收货倉庫" popup-title="请选择所在地区" :localdata="pickPointList"
	                     	    @change="onchange" >
	                     	</uni-data-picker>
	                     </uni-forms-item>
	                     
	     			</uni-forms>
	       
	     			<view class="button-group">
	     				<button type="primary" size="mini" @click="submit('dynamicFormData')">打印</button>
						<button type="primary" size="mini" @click="update()">更新信息</button>
	     			</view>
	     		</view>
	     	</uni-section>
	  </view>
</template>

<script>
	import {
	   mapMutations,
	   mapState
	} from 'vuex'
	var tsc = require('@/subpkg/print/js/tsc.js')
	import util from '@/subpkg/print/js/util.js'
	export default {
		name:"root-printer",
		data() {
			return {
			dynamicFormData: {
			    code:  '',
			    pid: '',
			    departureDate: ''	
			},
			departDate:'',
			result:[],
			canvasWidth: 180,
			canvasHeight: 180,
			imageSrc: '../../static/payment-wechat.png',
			}
		},
		dynamicRules: {
		    departureDate: {
		        rules: [{
		            required: true,
		            errorMessage: '请选择发货时间'
		        }]
		    },
			pid: {
			    rules: [{
			        required: true,
			        errorMessage: '请选择发货仓库'
			    }]
			}
		},
		
		computed: {
		    ...mapState('m_user', ['userinfo', 'pickPointList','departureDateList']), 
			 ...mapState('m_gprinter',['deviceId','serviceId', 'characteristicId']) 
		},
		methods: { 
			...mapMutations('m_user', ['updatePickPointList','updateDepartureDateList']),
			
		        search(res) {
		            clearTimeout(this.timer)
		            this.timer = setTimeout(() => {
		                this.kw = res,
		               this.getSearchResults() 
		            }, 500)
		         },  
				 change(e) {
				          console.log("e:", e);
						  this.departDate = e
						  let arr = this.departureDateList
						  for (let k = 0; k < arr.length; k += 1) 
						  {
							  if( arr[k].value === e )
							  {
								  console.log('arr[k]:',arr[k])
								 this.dynamicFormData.departureDate = arr[k].text 
							  }  
						  }
				         },
				update() 
				 {
					 this.initpickpoinsTree()
					 this.initDepartureDateList()
				 },
				 
				 async initpickpoinsTree() {
				 	    const {data: res} = await uni.$http.get('/wx/users/pickPointList')
				 	    if (res.status != 200) return uni.$showMsg('查詢提貨點列表失败!')
				 	     this.updatePickPointList(res.data)
				 },
				 
				 async initDepartureDateList(){
				 	const {data: res} = await uni.$http.get('/wx/cabinet/departureDateList')
				 	if (res.status != 200) return uni.$showMsg('查詢出海日期列表失败!')
					console.log('departureDateList:',res.data)
					this.range = res.data;
					console.log('range:',this.range)
				 	 this.updateDepartureDateList(res.data)
				 },
				 submit(ref) {
				 	if(this.dynamicFormData.pid == '') {
				 		uni.showToast({
				 		  title: "请从仓库列表中选择仓库",
				 		  duration: 2000,
				 		  icon: 'none'
				 		}) 
				 	} else if(this.dynamicFormData.departureDate == ''){
				 		uni.showToast({
				 		  title: "请选择发货时间",
				 		  duration: 2000,
				 		  icon: 'none'
				 		}) 
				 	}else {
						this.getRootPrinterResult( this.dynamicFormData )
					}
				 	
				 },
				 
				 async getRootPrinterResult()
				 {
					    let that = this;
                        const {data: res} = await uni.$http.get('/wx/cabinet/getRootPrinterResult', this.dynamicFormData)
				 		if (res.status != 200) return uni.$showMsg('查詢打印提货凭证失败!')
				 		this.result = res.data
						let width;
						let height;
					    uni.getImageInfo({
							src: that.imageSrc,
							success(res) {
								width = res.width
								height = res.height
								that.canvasWidth = res.width;
								that.canvasHeight = res.height;
							 }
						  })
						const ctx = uni.createCanvasContext("edit_area_canvas", this);
									// if (app.globalData.platform == "android") {
									//   ctx.translate(width, height)
									//   ctx.rotate(180 * Math.PI / 180)
									// }
						ctx.drawImage(this.imageSrc, 0, 0, width, height);
						ctx.draw();
				 					 
				 		if( this.deviceId )
				 		{	 	
				 		this.onConn()
				 		}
				 		else 
				 		{
				 		this.gotoPrinterPage()
				 		}
				 },
				 
				 onchange(e) 
				 {
				   const value = e.detail.value
				 	this.dynamicFormData.pid = value[value.length - 1].value
				 },
				 
            onConn() {
				console.log(`连接蓝牙:` + this.deviceId );
				let isDone = true
				var that = this
				uni.createBLEConnection({
					deviceId: this.deviceId,
					complete(res) {
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
				let url = '/subpkg/print/print?box='+JSON.stringify( this.result )
				uni.navigateTo({
				  url: url
				});
			},
			
			senBleLabel( deviceId, serviceId, uuid ) {
				    let that = this;
					let canvasWidth = that.canvasWidth
				    let canvasHeight = that.canvasHeight
					for(let j=0; j< that.result.length; j++) {
						var command = tsc.jpPrinter.createNew()
						command.setSize(100, 150)
						command.setGap(2)
						command.setCls()
						command.setText(200, 10, "TSS24.BF2", 3, 3, "逆海淘")
						command.setText(200, 100, "TSS24.BF2", 3, 3, "提货凭证")
						command.setText(100, 300, "TSS24.BF2", 2, 2, "出海日期: ")
						command.setText(350, 300, "4", 1, 1,  that.result[j].departureDate)
						command.setText(100, 400, "TSS24.BF2", 2, 2, "提货码: " )
						command.setText(320, 400, "4", 1, 1, that.result[j].code)
						command.setText(100, 500, "TSS24.BF2", 2, 2, "提货点: ")
						command.setText(320, 500, "TSS24.BF2", 2, 2, this.result[j].pName)
						command.setText(100, 600, "TSS24.BF2", 2, 2, "共" )
						command.setText(150, 600, "4", 2, 2, that.result[j].orderCount  )
						command.setText(180, 600, "TSS24.BF2", 2, 2, "个包裹在" )
						command.setText(370, 600, "4", 2, 2, that.result[j].boxCount )
						command.setText(400, 600, "TSS24.BF2", 2, 2, "个箱子里" )
						
						for (let i = 0, index = 700; i < that.result[j].mRootPrinterResultItems.length; i ++) {
							command.setText(100, index + i * 50, "2", 1, 1, that.result[j].mRootPrinterResultItems[i].boxNumero + ":")
							command.setText(200, index + i * 50, "2", 1, 1, that.result[j].mRootPrinterResultItems[i].orderCount + "/" + that.result[j].mRootPrinterResultItems[i].orderCountTotal)
							command.setText(250, index + i * 50, "TSS24.BF2", 1, 1, "包裹")
						}
						
						uni.canvasGetImageData({
						canvasId: 'edit_area_canvas',
						x: 0,
						y: 0,
						width: canvasWidth,
						height: canvasHeight,
						success: function(res) 
						{
				        console.log('res:'+ res)
						command.setBitmap(60, 0, 1, res)
						},
						complete: function() {
							command.setPagePrint()
							that.senBlData(deviceId, serviceId, uuid,command.getData())	
										  }
						})
						
					}
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
			}
	
				 

		    }
	}
</script>

<style lang="scss">
 .root-printer-container {
       	text-align: center;
       	height: 100%;
    }
  .root-printer-form-containe {
  	padding: 15px;
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
  
</style>