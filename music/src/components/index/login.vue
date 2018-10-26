<template>
    <div class="login">
        <h1>用户登录</h1>
        <div class="red">{{message}}</div>
        <input type="text" name="" v-model="username" placeholder="用户名">
        <input type="password" name="" v-model="password" placeholder="密码">
        <div class="log-num">
            <input type="text" name="" v-model="testnum" placeholder="请输入验证码">
        </div>
        <div class="log-test" v-if="!testshow" @click="sendtest">
            发送验证码
        </div>
        <div class="log-tests" v-if="testshow">
            {{times}}s后重新发送
        </div>
        <p class="logins" @click="login">登录</p>
        <div class="a">
            <router-link to="/regist">还没有账号，现在去注册</router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: "login",
    data () {
        return {
            username: '',
            password: '',
            message: '',
            testshow: false,
            times: 60,
            testnum: '',
            resnum: ''
        }
    },
    
    methods: {
        login () {
            console.log(this.testnum,this.resnum)
            axios.post('/apis/login',{
                userName:this.username,
                password:this.password
            }).then(res => {
                if(res.data.Code == 1){
                    this.message = res.data.Msg
                }else if(res.data.Code == 2){
                    this.message = res.data.Msg
                }else{
                    if(this.testnum == this.resnum){
                        this.message = res.data.Msg
                        window.localStorage.setItem('user',this.username)
                        setTimeout(()=>{
                            this.$router.push('/home')
                        },2000)

                    }else{
                        this.message = '验证码错误'
                    }
                    
                }
            })
        },
        sendtest () {
            let regphone = /^[1][3,4,5,7,8][0-9]{9}$/;
            if(this.username == ''){
                this.message = "用户名不能为空"
            }else if(regphone.test(this.username)){
                axios.post('/apis/test',{
                    phone:this.phone
                }).then((res) => {
                    console.log(res.data)
                    this.resnum = res.data
                    this.testshow = true;
                    let timer = setInterval(() => { 
                        this.times --
                        if(this.times == 0){  
                            this.testshow = false
                            this.times = 60
                        }
                    },1000)
                })
            }else{
                this.message = "用户名错误"
            }
        }
    }
}
</script>
<style>
    *{
        padding: 0;margin: 0;
    }
    .login{
        width: 100vw;
        height: 100vh;
        background: #fff;
    }
    .login h1{
        font-size:24px;
        text-align:center;
        line-height:100px;
    }
    .login .red{
        font-size:14px;
        color:red;
        margin-left:5vw;
        margin-top:20px;
        margin-bottom:-25px;
    }
    .login input{
        width: 90vw;
        height:45px;
        background-color: #f0f0f0;
        outline:none;
        border:none;
        margin-left:5vw;
        margin-bottom:0px;
        font-size:14px;
        border-radius:4px;
        text-indent:1em;
        margin-top:30px;
    }
    .login .logins{
        width: 90vw;
        height:50px;
        text-align:center;
        line-height:50px;
        font-size:18px;
        background-color:rgb(45, 130, 228);
        margin:0px auto;
        color:white;
        margin-top:150px;
    }
    .login .a {
       margin-top:30px;
        text-align:center;
        font-size:18px;
    }
    .login .a a{
         color:rgb(45, 130, 228);
    }
    .login .log-test{
        width:140px;
        height:45px;
        background: #f0f0f0;
        text-align:center;
        line-height:45px;
        color:black;
        font-size:14px;
        float:right;
        margin-top:30px;
        margin-right:5vw;
    }
    .login .log-tests{
        width:140px;
        height:45px;
        background: #585656;
        text-align:center;
        line-height:45px;
        color:white;
        font-size:14px;
         float:right;
        margin-top:30px;
        margin-right:5vw;
    }
    .login .log-num{
        float:left;
    }
    .login .log-num input{
        width: 50vw;
    }
</style>

