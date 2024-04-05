<template>
      <view class="box-container">
             <view class="search-box">
                   <uni-search-bar placeholder="输入箱号查找订单" bgColor=" #FFFFFF" @input="search" cancel-button="none" :radius="100" />  
                 </view>
                 <!--订单标题区域-->
                <view class="create-box-title">
                    <!--左侧得图标-->
                     <uni-icons type="shop" size="18"></uni-icons>
                    <!--右侧得文本-->
					  <text class="create-box-title-text">选择收货仓库:</text>
                         <uni-data-select class="create-box-select"
                           v-model="pid"
                           :localdata="ppList"
                           @change="change"
                         ></uni-data-select>
		
      			            
                </view>
              <uni-swipe-action>
                   <block v-for="(item,i) in searchResults" :key='i'>
			  <navigator class="panel-item" :url="'/subpkg/box_form/box_form?box='+JSON.stringify(item)" >
			  <uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(item)">
			        <box-item :box="item"  ></box-item>
			   </uni-swipe-action-item>
			   </navigator>
                  </block>
              </uni-swipe-action>
              <!--自定义结算组件-->
      <my-create-box-button :title="'新起一箱'" :pid="pid" :pname="pname"></my-create-box-button> 
	  <tabBar :current="2"></tabBar>
         </view>
</template>

<script>
	import {mapState, mapMutations, mapGetters} from 'vuex'
    export default {
		onShow() {
		  const sysInfo =  uni.getSystemInfoSync()
		  this.wh = sysInfo.windowHeight - 50
		  this.getBoxList()
		  this.initAllOrderList()
		  this.pList = this.ppList
		},
        data() {
            return {
                //右侧滑动删除时显示得文本
                options:[{
                    text:'删除',
                    style: {
                        backgroundColor: '#C00000'
                    }
                }],
				pList:[],
                wh:0,
                timer: null,
                kw: '',
                searchResults: [],
                searchResultsBak:[],
				searchAllResultsBak:[],
				pid:'',
				pname:'',
        
                queryObj:{
                    code:'',
                    id:'',
                    pageNum:1,
                    pageSize:10,
                    orderStatus:1,
                    payStatus:10   
                },
                total:0,
                isloading:true,
               
                
        
            };
        },
		computed: {
		    ...mapState('m_user', ['pickPointList']),
			...mapGetters('m_user', ['ppList']),
		},
        methods: {
			...mapMutations('m_cabinet',['updateBoxList']),
			...mapMutations('m_order', ['updateOrderList']),
			
			change(e) {
				this.isloading = true
				this.pid = e
				if(this.pid === '') 
				{
				  this.pname = ''
				  this.searchResults = this.searchAllResultsBak  
				  this.searchResultsBak =  this.searchAllResultsBak
				}
				else 
				{
				   this.getPname()
				   this.searchResults = this.searchAllResultsBak.filter( item=> (item.pid).indexOf( this.pid ) > -1 )  
				   this.searchResultsBak =  this.searchResults
				}
				
			},
			
			getPname() {
				for (let i = 0; i < this.ppList.length; i++) {
						if(this.ppList[i].value === this.pid) 
						{
						 this.pname =  	this.ppList[i].text
						}
					}
			},
		
            async getBoxList() {
            	const {
            	    data: boxRes
            	} = await uni.$http.get('/wx/box/list')  
            	 if (boxRes.status != 200) return uni.$showMsg('查询箱子列表信息失败!') 
				 this.searchAllResultsBak = boxRes.data
				 if(this.pid != '') 
				 {
					this.searchResults = this.searchAllResultsBak.filter( item=> (item.pid).indexOf( this.pid ) > -1 )
					this.searchResultsBak =  this.searchResults 
				 }
				 else 
				 {
					this.searchResults = boxRes.data
					this.searchResultsBak = boxRes.data 
				 }
				this.updateBoxList(boxRes.data)
            	
            },
			
			async initAllOrderList() {
			  const {data: res} = await uni.$http.get('/wx/orders/getAllorderList')
			  if (res.status != 200) return uni.$showMsg('查詢未裝箱訂單列表失败!')
			  this.items = res.data
			   this.updateOrderList(res.data)  
			},
			
			swipeItemClickHandler(item) {
				console.log('swipeItemClickHandler')
				uni.showModal({
				    title: '提示',
				    content: '确定要删除该箱子吗',
				    success: function (res) {
				        if (res.confirm) {
				           this.removeBoxById(item.id)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }.bind(this)
				});
			        },

					async removeBoxById(id) {
						 const {
						     data: orderRes
						 } = await uni.$http.delete('/wx/box/'+ id)  
						  if (orderRes.status != 200) return uni.$showMsg('删除包裹信息失败!') 
						  
						this.searchResults = this.searchResultsBak.filter(
						                           box=> box.id != id )
						this.searchResultsBak = this.searchResults
					 },
					
			        search(res) {
			            clearTimeout(this.timer)
			            this.timer = setTimeout(() => {
			                this.kw = res,
			               this.getSearchResults() 
			            }, 500)
			         },  
			   
			    getSearchResults() {  
			    this.isloading = true
			       if(this.kw === '') {
			         this.searchResults = this.searchResultsBak  
			       }else {
			         this.searchResults = this.searchResults.filter( item=> (''+item.boxNumber).indexOf( this.kw ) > -1  );   
			       }
			      
			  
			 }
			 	
        }
       
    }
</script>

<style lang="scss">
    .box-container {
        padding-bottom: 50px;
    }
    .create-box-title {
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 5px;
        border-bottom: 5px solid #EFEFEF;
        .create-box-title-text{
            font-size: 14px;
            margin-left: 10px;
        }
		.create-box-select {
			display: flex;
			width: 230px;
			align-items: center;
			padding-left: 15px;
		}
    }
    .search-box {
        position: sticky;
        top: 0;
        z-index: 999;
        background-color: #C00000; 
    }

.sugg-list {
    padding: 0 5px;
    .sugg-item {
        font-size: 12px;
        padding: 13px 0;
        border-bottom: 1px solid #efefef;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        
        .goods-name {
            // 文字不容许换行
            white-space: nowrap;
            overflow: hidden;
            // 文字溢出使用...
            text-overflow: ellipsis;
            margin-right: 3px;
        }
    }
}
</style>

