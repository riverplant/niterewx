<template>
    <view class="login-container">
        <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>

        <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
        <text class="tips-text">登陆后尽享更多权益</text>
    </view>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "my-login",
        data() {
            return {

            };
        },
        methods: {
            ...mapMutations('m_user',['updateUserInfo','updateOpenid','updateSwiperList', 'updateToken']),
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
                   // 小程序的appid
                   'avatarUrl': info.avatarUrl,
                   // 小程序的secret
                   'nickName': info.nickName,
                   // wx.login()返回的登录凭证
                   'js_code': res.code,
                   // 固定值,不需要改变
                   'gender': info.gender
                }
             await wx.request({
                    // 通过此 url ，获取 openid 与 unionid
                    url: 'http://127.0.0.1:8080/wx/users/login',
                    data: query,
                    success: res => {
                        console.log('res:',res)
                        this.updateToken(res.data.data.token)
                        this.updateOpenid(res.data.data.openid)
                        //获取后台返回的token,保存到storage中
                        uni.$showMsg('登录成功!')
                    }
                });
        /**        const paramForToken = {
                   // 小程序的appid
                   'appid': '',
                   // 小程序的secret
                   'secret': '',
                   // wx.login()返回的登录凭证
                   'js_code': res.code,
                   // 固定值,不需要改变
                   'grant_type': 'client_credential'
                }
           await wx.request({
                    url: 'https://api.weixin.qq.com/cgi-bin/token',
                    data: paramForToken,
                    success: res => {
                         uni.setStorageSync('access_token', res.data.access_token)
                        uni.$showMsg('获取Token成功!')
                    }
                });
                **/
              const { data:result } =  await uni.$http.get('https://www.uinav.com/api/public/v1/home/swiperdata')
              if( result.meta.status !== 200 ) return uni.$showMsg()  
              console.log('swiperdata:',result.message)
             this.updateSwiperList(result.message) 

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
