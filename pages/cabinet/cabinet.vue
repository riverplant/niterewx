<template>
      <view class="cabinet-container">
             <view class="search-cabinet">
                   <uni-search-bar placeholder="输入櫃号查找订单" bgColor=" #FFFFFF" @input="search" cancel-button="none" :radius="100" />  
                 </view>
                 <!--订单标题区域-->
                <view class="create-cabinet-title">
                    <!--左侧得图标-->
                     <uni-icons type="shop" size="18"></uni-icons>
                    <!--右侧得文本-->
                    <text class="create-cabinet-title-text">所有櫃子列表</text>
      			            
                </view>
              <uni-swipe-action>
                   <block v-for="(item,i) in searchResults" :key='i'>
              <navigator class="panel-item" :url="'/subpkg/cabinet_form/cabinet_form?cabinet='+JSON.stringify(item)"> 
             <uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(item)">
                   <cabinet-item :cabinet="item"  ></cabinet-item>
              </uni-swipe-action-item>
              </navigator>
                  </block>
              </uni-swipe-action>
              <!--自定义结算组件-->
      <my-create-cabinet-button></my-create-cabinet-button>
      <my-create-button :title="'创建新柜子'" :navigatorUrl="'/subpkg/cabinet_form/cabinet_form'"></my-create-button>
	  <tabBar :current="3"></tabBar>
         </view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
    export default {
		onShow() {
		  const sysInfo =  uni.getSystemInfoSync()
		  this.wh = sysInfo.windowHeight - 50
		  this.getCabinetList() 
		  this.getBoxList()
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
                wh:0,
                timer: null,
                kw: '',
                searchResults: [],
                searchResultsBak:[],
        
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
        methods: {
			 ...mapMutations('m_cabinet',['updateBoxList']),
	    async getBoxList() {
				const {
				    data: boxRes
				} = await uni.$http.get('/wx/box/list')  
				 if (boxRes.status != 200) return uni.$showMsg('查询箱子列表信息失败!') 
				 this.updateBoxList(boxRes.data)
				
			},
            async getCabinetList() {
            	const {
            	    data: cabinetRes
            	} = await uni.$http.get('/wx/cabinet/list')  
            	 if (cabinetRes.status != 200) return uni.$showMsg('查询箱子列表信息失败!') 
				 this.searchResults = cabinetRes.data
				this.searchResultsBak = cabinetRes.data
            	
            },
			swipeItemClickHandler(item) {
				uni.showModal({
				    title: '提示',
				    content: '确定要删除该柜子吗',
				    success: function (res) {
				        if (res.confirm) {
				           this.removeById(item.id)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }.bind(this)
				});
			        },
					
					async removeById(id) {
						 const {
						     data: orderRes
						 } = await uni.$http.delete('/wx/cabinet/'+ id)  
						  if (orderRes.status != 200) return uni.$showMsg('删除包裹信息失败!') 
						  
						this.searchResults = this.searchResultsBak.filter(
						                           cabinet=> cabinet.id != id )
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
			         this.searchResults = this.searchResults.filter( item=> (''+item.cabinetNumber).indexOf( this.kw ) > -1  );   
			       }
			      
			  
			 }
			 	
        }
       
    }
</script>

<style lang="scss">
    .cabinet-container {
        padding-bottom: 50px;
    }
    .create-cabinet-title {
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 5px;
        border-bottom: 1px solid #EFEFEF;
        .create-cabinet-title-text{
            font-size: 14px;
            margin-left: 10px;
        }
    }
    .search-cabinet {
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

