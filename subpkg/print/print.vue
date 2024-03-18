<template>
	<view>
		<button @click="searchBle">搜索蓝牙</button>
		<view style="margin-top: 30upx;" :key="index" v-for="(item,index) in devices">
			<button style="width: 400upx; color: #0081FF;" @click="onConn(item)">{{item.name}}</button>
		</view>
		<button style="margin-top: 100upx;" @click="senBleLabel()">开始
		打印</button>
	</view>


</template>

<script>
	var tsc = require('@/subpkg/print/js/tsc.js')
	import util from '@/subpkg/print/js/util.js'
	import { mapState } from 'vuex'
	//util.formatTime(new Date())
	export default {
		data() {
			return {
				devices: [],
				currDev: null,
				connId: '',
				piaojuText:'',
				orderVo:{},
				uInfo:{},
				result:[]
			}
		},
		onLoad(e) {
			console.log('userInfo:',this.userinfo)
			this.uInfo = this.userinfo
			console.log('e:',e)
		    if(e && e.box) {
				if(this.userinfo.userRoles == 5) 
				{
					this.result = JSON.parse(e.box)
					console.log(' this.result:', this.result)	
					
				}else 
				{
				this.orderVo = JSON.parse(e.box)
				console.log(' this.orderVo:', this.orderVo)	
				}
		      
		    }
		    },
		computed: {
				 ...mapState('m_user',['userinfo'])
			},
		methods: {
			destroyed: function() {
				console.log("destroyed----------")
				if (this.connId != '') {
					uni.closeBLEConnection({
						deviceId: this.connId,
						success(res) {
							console.log(res)
						}
					})
				}

			},
			searchBle() {
				var that = this
				uni.showLoading({
					title: '蓝牙搜索中'
				})
				uni.openBluetoothAdapter({
					success(res) {
						that.onDevice()
						uni.getBluetoothAdapterState({
							success: function(res) {
								console.log(res)
								if (res.available) {
									if (res.discovering) {
										that.stopFindBule()
									}
									//搜索蓝牙
									//开始搜寻附近的蓝牙外围设备
									console.log("开始搜寻附近的蓝牙外围设备")
									uni.startBluetoothDevicesDiscovery({
										success(res) {
											console.log(res)
										}
									})

								} else {
									uni.hideLoading();
									uni.showToast(`本机蓝牙不可用`);
								}
							},
						})
					}
				})
			},
			onDevice(){
				console.log("监听寻找到新设备的事件---------------")
				var that = this
				//监听寻找到新设备的事件
				uni.onBluetoothDeviceFound(function(devices) {
							console.log('--------------new-----------------------'+JSON.stringify(devices))
							var re = JSON.parse(JSON.stringify(devices))
							console.log(re.devices[0].name + "  " + re.devices[0].deviceId)
								let name = re.devices[0].name
								if (name != "未知设备") {
									let deviceId = re.devices[0].deviceId
									that.devices.push({
										name: name,
										deviceId: deviceId,
										services: []
									})
								}
		
				})
			},
			
			stopFindBule() {
				uni.showToast(`停止搜寻附近的蓝牙外围设备---------------`);
				uni.stopBluetoothDevicesDiscovery({
					success(res) {
						console.log(res)
					}
				})
			},
			onConn(item) {
				var that = this
				uni.showToast(`连接蓝牙:` + item.deviceId );
				let deviceId = item.deviceId
				uni.createBLEConnection({
					deviceId: deviceId,
					complete(res) {
						if (res.errMsg == "createBLEConnection:ok") {
							uni.hideLoading();
							console.log("连接蓝牙-[" + item.name + "]--成功")
							that.connId = deviceId;
							that.currDev = item
							setTimeout(function() {
								that.getBLEServices(deviceId)
							}, 2000)
						} else {
							console.log(res)
						}
						//连接成功 关闭搜索
						that.stopFindBule()

					},
				})
			},

			getBLEServices(_deviceId) {
				var that = this;
				let deviceId = _deviceId
				console.log("获取蓝牙设备所有服务(service)。---------------")

				uni.getBLEDeviceServices({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: deviceId,
					complete(res) {
						let serviceId = ""

						for (var s = 0; s < res.services.length; s++) {
							console.log(res.services[s].uuid)
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
										if (re.characteristics[c].properties.write == true) {
											let uuid = re.characteristics[c].uuid
											console.log(' deviceId = [' + deviceId + ']  serviceId = [' + serviceId + '] characteristics=[' +
												uuid)

											for (var index in that.devices) {
												if (that.devices[index].deviceId == deviceId) {
													that.devices[index].services.push({
														serviceId: serviceId,
														characteristicId: uuid
													})
													break
												}

											}
											console.log(JSON.stringify(that.devices))

										}
									}
								}
							})

						}
					},
					fail(res) {
						console.log(res)
						uni.hideLoading();
						uni.showToast(`获取设备服务失败` + JSON.stringify(res));
					},
				})

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
			},
			senBleLabel() {
				//标签模式
				let deviceId = this.currDev.deviceId;
				let serviceId = this.currDev.services[0].serviceId;
				let characteristicId = this.currDev.services[0].characteristicId;
				
				uni.setStorageSync('deviceId', deviceId)
				uni.setStorageSync('serviceId', serviceId)
				uni.setStorageSync('characteristicId', characteristicId)
				
				console.log('this.uInfo:',this.uInfo)
				console.log('this.orderVo:',this.orderVo)
				if( this.uInfo.userRoles == 2 ) 
				{
				var command = tsc.jpPrinter.createNew()
				// console.log(command)
				command.setSize(100, 150)
				command.setGap(2)
				command.setCls()
				command.setText(100, 10, "4", 1, 1, this.orderVo.pName)
				command.setQR(110, 50, "L", 10, "A", this.orderVo.id)
				command.setText(100, 400, "TSS24.BF2", 1, 1, "箱号: ")
				command.setText(200, 400, "4", 1, 1,  this.orderVo.boxNumber)
				command.setText(100, 450, "TSS24.BF2", 1, 1, "包裹数: " )
				command.setText(200, 450, "4", 1, 1,  this.orderVo.orderIds.length)
				command.setText(100, 500, "TSS24.BF2", 1, 1, "提货码: ")
				for (let i = 0; i < this.orderVo.codes.length; i ++) {
					command.setText(100, 500 + 50, "4", 1, 1, this.orderVo.codes[i])
				}
				command.setPagePrint()
				this.senBlData(deviceId, serviceId, characteristicId,command.getData())	
				} 
				else if( this.uInfo.userRoles == 5 ) 
				{
					for(let j=0; j<this.result.length; j++) {
						var command = tsc.jpPrinter.createNew()
						// console.log(command)
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
						command.setPagePrint()
						this.senBlData(deviceId, serviceId, characteristicId,command.getData())	
					}
					
					
				}
				
			}
		}
	}
</script>

<style>

</style>