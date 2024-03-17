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
			};
			printerItem:{
				     boxId: '';
					 orderCountTotal: 0;
					 orderCount: 0;
			}
			rootPrinterResult: {
				departureDate: '';
			             code: '';
					    pName: '';
				     boxCount:  0;
				   orderCount:  0;
				   mRootPrinterResultItems: [];
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
						console.log('dynamicFormData:', this.dynamicFormData)
						console.log('准备打印........')
						this.getRootPrinterResult( this.dynamicFormData )
						
						if( this.deviceId )
						{
							console.log('this.deviceId:',this.deviceId)
							
							//this.onConn()
						}
						else 
						{
							//this.gotoPrinterPage()
						}
					}
				 	
				 },
				 
				 async getRootPrinterResult() {
					 const {data: res} = await uni.$http.get('/wx/cabinet/getRootPrinterResult', this.dynamicFormData)
					 if (res.status != 200) return uni.$showMsg('查詢打印提货凭证失败!')
					 console.log('result:',res.data)
				 },
				 
				 onchange(e) {
					     const value = e.detail.value
					     this.dynamicFormData.pid = value[value.length - 1].value
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