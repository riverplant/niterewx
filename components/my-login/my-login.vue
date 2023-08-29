<template>
    <view class="login-container">
       <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
        <button type="primary" class="btn-login" v-on:tap="wechatLogin">一键登录</button>
      <!-- <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button> -->
       <text class="tips-text">登陆后尽享更多权益</text>
    </view>
</template>

<script>
    export default {
        name:"my-login",
        data() {
            return {
                
            };
        },
        methods:{
            
            wechatLogin() {
                uni.checkSession({
                    provider:'weixin',
                    success:function(loginRes) {
                        console.log('ok',loginRes)
                    },
                    fail:function(loginRes) {
                        console.log('fail',loginRes)
                    }
                });
                
                let jsCode=''
                uni.login({
                   provider:'weixin', 
                   success:function(loginRes) {
                       jsCode = loginRes.code
                       console.log('login ok',{jscode:loginRes.code,jscodeInfo:loginRes})
                   },
                   fail:function(loginRes) {
                       console.log('fail',loginRes)
                   }
                });
                uni.getUserProfile({
                    desc:'获取您的昵称、头像、地区和性别',
                    success:res=> {
                        
                        console.log('获取您的昵称、头像',res)
                    },
                    fail:res=> {
                        console.log('fail',res)
                        uni.showToast({
                            title:'您拒绝了请求，不能使用小程序,',
                            icon:'error',
                            duration:2000
                        });
                        return;
                    }
                })
            },
            //用户授权之后，获取用户的基础信息
            getUserInfo(e) {
                if(e.detail.errMsg == 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权!')
                console.log(e.detail.userInfo)
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
    
    &::after{
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
    .btn-login{
       width: 90%;
       border-radius: 100px;
       margin: 15px 0;
       background-color: #C00000;
    }
    .tips-text{
       font-size: 12px;
       color: gray; 
    }
}
</style>