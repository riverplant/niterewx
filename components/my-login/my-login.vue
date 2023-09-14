<template>
    <view class="login-container">
        <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>

        <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
        <text class="tips-text">申请获取以下权限</text>
        <text class="tips-text">获得你的公开信息(昵称、头像、地区等)</text>
  </view>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "my-login",
        data() {
            return {
        ordersNonValide: [],
        ordersNonPayer: [],
        ordersNonLivrer: [],
        ordersRembourse: [],
            };
        },
        methods: {
            ...mapMutations('m_user',['updateUserInfo','updateOpenid','updateSwiperList', 'updateToken']),
           ...mapMutations('m_order',['setOrdersNonValide','setOrdersNonPayer','setOrdersNonLivrer','setOrdersRembouse']),
            //用户授权之后，获取用户的基础信息
            getUserInfo(e) {
                if (e.detail.errMsg == 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权!')
                this.updateUserInfo(JSON.stringify(e.detail.userInfo))
                console.log('userInfo:',e.detail.userInfo)
                this.getToken(e.detail.userInfo)
            },
            async getToken(info) {
                const [err, res] = await uni.login().catch(err => err)
                if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登陆失败')

                const query = {
                   'avatarUrl': info.avatarUrl,
                   'nickName': info.nickName,
                   'js_code': res.code,
                   'gender': info.gender
                }
            const { data:result } =   await uni.$http.get('http://127.0.0.1:8080/wx/users/login', query );
              if( result.status !== 200 ) return uni.$showMsg()     
              this.updateToken(result.data.token)
              this.updateOpenid(result.data.openid)
              this.initSwiperDate()
            //获取后台返回的token,保存到storage中
            uni.$showMsg('登录成功!')
            },
            
          async  initSwiperDate() {
               const { data:result } =  await uni.$http.get('https://www.uinav.com/api/public/v1/home/swiperdata')
                if( result.meta.status !== 200 ) return uni.$showMsg()  
                console.log('swiperdata:',result.message)
               this.updateSwiperList(result.message)  
               this.initOrders()
            },
            async  initOrders() {
                const {data:res} = await  uni.$http.get('http://127.0.0.1:8080/wx/orders/getAllOrderList')  
               console.log('res.status:',res.status)
                if( res.status !== 200 ) return uni.$showMsg()
                console.log('initOrders:',res.data)
              
              this.initOrderList(res)  
            
              },
              
             initOrderList(res) {
                 for (let i = 0; i < res.data.length; i++) {
                 	if (res.data[i].orderStatus === 2) {
                 		this.ordersNonValide.push(res.data[i])
                 	}else if(res.data[i].payStatus === 10) {
                         this.ordersNonPayer.push(res.data[i])
                     }else if(res.data[i].payStatus === 20 ) {
                         this.ordersNonLivrer.push(res.data[i])
                     }else {
                         this.ordersRembourse.push(res.data[i])
                     }
                 }
                 this.setOrdersNonValide(this.ordersNonValide)
                 this.setOrdersNonPayer(this.ordersNonPayer)
                 this.setOrdersNonLivrer(this.ordersNonLivrer)
                 this.setOrdersRembouse(this.ordersRembourse)
             }
            
            
        }
    }
</script>

<style lang="scss">
    .login-container {
        height: 550px;
        background-color: #F8F8F8;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;

        &::after {
            content: '';
            display: block;
            width: 100%;
            height: 40px;
            background-color: white;
            position: absolute;
            bottom: 0;
            left: 0;
            border-radius: 100%;
            transform: translateY(50%);
        }

        .btn-login {
            width: 90%;
            border-radius: 100px;
            margin: 15px 0;
            background-color: #C00000;
        }

        .tips-text {
            font-size: 12px;
            color: gray;
        }
    }
</style>
