<template>
	<view>
		<uni-section  type="line">
			<view class="warehouse-form-containe">
				<!-- 动态表单校验 -->
				<uni-forms ref="dynamicForm" :rules="dynamicRules" :modelValue="dynamicFormData" label-position="top">
						<uni-forms-item label="收貨碼" required name="code">
							<uni-easyinput disabled v-model="dynamicFormData.code"  />
						</uni-forms-item>
		            <uni-forms-item label="收穫倉庫" required>
		            	<uni-data-picker placeholder="请选择收穫倉庫" popup-title="请选择所在地区" :localdata="pickPointList"
		            	    @change="onchange" >
		            	</uni-data-picker>
		            </uni-forms-item>

				</uni-forms>
		      
				<view class="button-group">
					<button type="primary" size="mini" @click="submit(dynamicForm)">提交</button>
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
	           dataTree:[],
	           node:'',
			   dynamicFormData: {
			       code:  '',
			       pid: '',
			       openId: ''
			   	
			   },
	        }
	    },
	    computed: {
	        ...mapState('m_user', ['userinfo', 'pickPointList', 'pickPoint', 'code', 'openid']), 
	    },
		onLoad(e) {
			if(this.code != '' ) {
				     this.dynamicFormData.code = this.code
			}
		    },
	    methods: {
	        ...mapMutations('m_user',['updatePickPointList', 'updatePickPoint', 'updateCode', 'updateUserInfo']),
	        onchange(e) {
	            const value = e.detail.value
	            this.node = value[value.length - 1].value
	        },
	        submit(ref) {
				if(this.code === '') {
					this.createWarehouse()
				}else {
					 this.updateWarehouse()
				}
			},
	        async createWarehouse() { 
	            this.dynamicFormData.openid = this.openid
	            this.dynamicFormData.pid =  this.node
	            const { data:result } =   await uni.$http.post('http://127.0.0.1:8080/wx/users/createWarehouse', this.dynamicFormData );
	              if( result.status !== 200 ) return uni.$showMsg()  
	                this.updateCode(result.data.code)
	                this.updatePickPoint(result.data.ppName)
					this.updateUserInfo(result.data)
	                uni.navigateBack({
	                    delta: 1
	                });
	        },
	        
	        async updateWarehouse() {
	                this.dynamicFormData.openid = this.openid
	                this.dynamicFormData.pid =  this.node
					this.dynamicFormData.code = this.code
	            const { data:result } =   await uni.$http.put('http://127.0.0.1:8080/wx/users/updateWarehouse', this.dynamicFormData );
	              if( result.status !== 200 ) return uni.$showMsg()  
	                uni.navigateBack({
	                    delta: 1
	                });
	                
	        },
	         
	       
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