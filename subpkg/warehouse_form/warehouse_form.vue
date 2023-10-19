<template>
	<view>
		<uni-section  type="line">
			<view class="address-form-containe">
				<!-- 动态表单校验 -->
				<uni-forms ref="dynamicForm" :rules="dynamicRules" :modelValue="dynamicFormData" label-position="top">
		            <uni-forms-item label="收穫倉庫" required>
		            	<uni-data-picker placeholder="请选择收穫倉庫" popup-title="请选择所在地区" :localdata="pickPointList"
		            	    @change="onchange" >
		            	</uni-data-picker>
		            </uni-forms-item>

				</uni-forms>
		      
				<view class="button-group">
					<button type="primary" size="mini" @click="submit()">提交</button>
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
	           node:''
	        }
	    },
	    computed: {
	        ...mapState('m_user', ['userinfo', 'pickPointList', 'pickPoint', 'code', 'openid']), 
	    },
	    methods: {
	        ...mapMutations('m_user',['updatePickPointList', 'updatePickPoint', 'updateCode']),
	        onchange(e) {
	            const value = e.detail.value
	            this.node = value[value.length - 1].value
	        },
	        submit() {
				if(this.pickPoint === '') {
					this.createWarehouse()
				}else {
					 this.updateWarehouse()
				}
			},
	        async createWarehouse() { 
	            const param = {
	                openid: this.openid,
	                pid:  this.node
	            }
	            const { data:result } =   await uni.$http.put('http://127.0.0.1:8080/wx/users/createWarehouse', param );
	              if( result.status !== 200 ) return uni.$showMsg()  
	                this.updateCode(result.data.code)
	                this.updatePickPoint(result.data.ppName)
	                uni.navigateBack({
	                    delta: 1
	                });
	        },
	        
	        async updateWarehouse() {
	            const param = {
	                openid: this.openid,
	                pid:  this.node
	            }
	            const { data:result } =   await uni.$http.put('http://127.0.0.1:8080/wx/users/updateWarehouse', param );
	              if( result.status !== 200 ) return uni.$showMsg()  
	                uni.navigateBack({
	                    delta: 1
	                });
	                
	        },
	         
	       
	    },   
	}
</script>

<style lang="scss">

</style>
