<template>
    <view class="cabinet-container">
        <view class="search-box">
             		<view class="example-body">
             			<uni-datetime-picker type="date" :clear-icon="false" v-model="cabinetCreateParam.departureDate" @maskClick="maskClick" placeholder="選擇發貨日期" />
             		</view>  
            </view>
            <!--订单标题区域-->
           <view class="cabinet-title">
               <!--左侧得图标-->
                <uni-icons type="shop" size="18"></uni-icons>
               <!--右侧得文本-->
               <text class="order-title-text">櫃號：{{cabinetCreateParam.cabinetNumber}}</text>
           </view>
         <uni-swipe-action>
              <block v-for="(item,i) in searchResults" :key='i'>
             <uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(item)">
                  <box-item :box="item"  :show-radio="isShowPriceAndRadio" :show-msg="isShowMsg" @radio-change="radioChangeHandler"></box-item>
             </uni-swipe-action-item>
             </block>
         </uni-swipe-action>
         <!--自定义结算组件-->
         <my-cabinet-settle :show="isShow" :cabinetCreateParam="cabinetCreateParam"></my-cabinet-settle>
    </view>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
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
                searchResults:[],
                searchResultsBak:[],
                type:1,
                title:'',
                isShowPriceAndRadio:true,
                isShowMsg:true,
                isShow:true,
				cabinetCreateParam: {
					departureDate: '',
					cabinetNumber: '',
					id:            '',
					boxIds:        [],
					isDelete:       1,
					status:         1
				},
			
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
        filters: {
            tofixed(num) {
                return Number(num).toFixed(2)
            }
        },
        computed: {
             ...mapState('m_cabinet', ['boxList'])
        },
        onLoad(e) {
            if( JSON.stringify(e) === "{}" ) {
				this.cabinetCreateParam.cabinetNumber =  Math.floor(Math.random() * 1000000)	   
			}else {
				let formData = JSON.parse(e.cabinet)
				this.cabinetCreateParam.cabinetNumber = formData.cabinetNumber
            const sysInfo =  uni.getSystemInfoSync()
            this.wh = sysInfo.windowHeight - 50
			}
			this.searchResults = this.boxList
			this.searchResultsBak = this.searchResults
        },
        methods: {    
            ...mapMutations('m_cabinet',['updateBoxState']),
			
			maskClick(e){
				console.log('departData:', this.cabinetCreateParam.departureDate)
			},
            swipeItemClickHandler(item) {
                console.log(item)
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
             this.searchResults = this.searchResults.filter( item=> item.orderNumber.indexOf( this.kw ) > -1 );   
           }
          
     },
     gotoDetail(item) {
         uni.navigateTo({
             url: '/subpkg/orders_detail/orders_detail?item=' + JSON.stringify(item)
         })
     },
     radioChangeHandler(e) {
         this.updateBoxState(e)
     }
     
        }
    }
</script>

<style lang="scss">
	.example-body {
			background-color: #fff;
			padding: 10px;
		}
    .cabinet-container {
        padding-bottom: 50px;
    }
    .cabinet-title {
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 5px;
        border-bottom: 1px solid #EFEFEF;
        .order-title-text{
            font-size: 14px;
            margin-left: 10px;
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
