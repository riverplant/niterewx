<template>
	<view>
		<uni-section  type="line">
			<view class="warehouse-form-containe">
				<!-- 动态表单校验 -->
				<uni-forms ref="dynamicBoxForm" :modelValue="dynamicBoxForm" label-position="top">
						<uni-forms-item label="箱子编码" required name="boxNumber">
							<uni-easyinput disabled v-model="dynamicBoxForm.boxNumber"  />
						</uni-forms-item>
		            <uni-forms-item label="收货仓库" required>
		            	<uni-data-picker placeholder="请选择收获仓库" popup-title="请选择所在地区" :localdata="pickPointList" v-model="location"
		            	    @change="onchange" >
		            	</uni-data-picker>
		            </uni-forms-item>

				</uni-forms>
		      
				<view class="button-group">
					<button type="primary" size="mini" @click="submit(dynamicBoxForm)">下一步</button>
					<button type="primary" size="mini" @click="save(dynamicBoxForm)">保存</button>
					<button type="primary" size="mini" @click="cancel(dynamicBoxForm)">取消</button>
				</view>
			</view>
		</uni-section>
		
		
	</view>
</template>

<script>
	import {
	    mapState, mapMutations
	} from 'vuex'
	export default {
	    data() {
	        return {
			   location:'',
	           dataTree:[],
	           node:'',
			   dynamicBoxForm: {
				   id:'',
			       boxNumber:  0,
			       pid: '',
				   pName:'',
				   boxStatus: 1,
				   boxType: 1,
				   orderIds:[]
			   },
	        }
	    },
		
	    computed: {
	        ...mapState('m_user', ['userinfo', 'pickPointList', 'pickPoint', 'openid']), 
			...mapState('m_order', ['boxList'])
	    },
		onLoad(e) {
			console.log('e:',e)
			if( JSON.stringify(e) === "{}" ) {
				this.dynamicBoxForm.boxNumber =  Math.floor(Math.random() * 1000000)	     
			}else {
				let formData = JSON.parse(e.box)
				this.dynamicBoxForm.id = formData.id
				this.dynamicBoxForm.boxNumber = formData.boxNumber
				this.location = formData.pid
				this.dynamicBoxForm.id = formData.id
				this.dynamicBoxForm.pid = formData.pid
				this.dynamicBoxForm.pName = formData.pName
				this.dynamicBoxForm.pName = formData.pName
				this.dynamicBoxForm.boxStatus = formData.boxStatus
				this.dynamicBoxForm.boxType = formData.boxType
				if(formData.orderInfos.length > 0) {
				this.dynamicBoxForm.orderIds = formData.orderInfos.map(orderInfos=>orderInfos.id)	
				}
				
			}
		    },
	    methods: {
	        ...mapMutations('m_order',['updateBoxList']),
	        onchange(e) {
	            const value = e.detail.value
	            this.node = value[value.length - 1].value
				this.dynamicBoxForm.pName = value[value.length - 1].text
	        },
	        submit(ref) {
				if(this.dynamicBoxForm.pid == '') {
					uni.showToast({
					  title: "请从仓库列表中选择仓库",
					  duration: 2000,
					  icon: 'none'
					}) 
				} else  {
					let url = '/subpkg/box_form/box_form?box='+JSON.stringify(this.dynamicBoxForm)
					uni.navigateTo({
					  url: url
					});
				}
				
			},
			cancel(ref) {
				uni.showModal({
				    title: '提示',
				    content: '确定要取消吗',
				    success: function (res) {
				        if (res.confirm) {
				           this.cancalForm()
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }.bind(this)
				});	
			},
			cancalForm() {
				uni.navigateBack({
				    delta: 1
				}); 
			},
			
			save(ref) {
				if(this.node == '') {
					uni.showToast({
					  title: "请从仓库列表中选择仓库",
					  duration: 2000,
					  icon: 'none'
					}) 
				} else  {
				  this.createBox()
				}
				
			},
			//客户选择了娥仓库后直接点击保存
	        async createBox() {
				if(this.node != '' && this.node != this.dynamicBoxForm.pid) {
				this.dynamicBoxForm.pid =  this.node
				if(this.dynamicBoxForm.id == '') {
					const { data:result } =   await uni.$http.post('/wx/box/create', this.dynamicBoxForm );
					  if( result.status !== 200 ) return uni.$showMsg()  
					  this.getBoxList()
					   uni.showToast({
					     title: "完成创建箱子"+this.dynamicBoxForm.boxNumber+",请点击下一步完成包裹入箱",
					     duration: 2000,
					     icon: 'none'
					   }) 
				}else {
					const { data:result } =   await uni.$http.put('/wx/box/update', this.dynamicBoxForm );
					  if( result.status !== 200 ) return uni.$showMsg()  
					  this.getBoxList()
					   uni.showToast({
					     title: "完成更新箱子"+this.dynamicBoxForm.boxNumber,
					     duration: 2000,
					     icon: 'none'
					   }) 
				}
				uni.navigateBack({
				    delta: 1
				}); 	
				
				}    
	           
	        },
			
			async getBoxList() {
				const {
				    data: boxRes
				} = await uni.$http.get('/wx/box/list')  
				 if (boxRes.status != 200) return uni.$showMsg('查询箱子列表信息失败!') 
				 this.updateBoxList(boxRes.data)
				
			}
	       
	    },   
	}
</script>

<style lang="scss">

	.warehouse-form-containe {
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