<template>
    <div class="regist">
        <h1>用户注册</h1>
        <div class="re-red">{{messages}}</div>
        <input type="text" name="" placeholder="用户名" v-model="username">
        <input type="password" name="" placeholder="密码" v-model="password">
        <input type="password" name="" placeholder="确认密码" v-model="rpassword">

        <div class="re-sex">
            <span>性别</span>
            
            <label for=""><input type="radio" value="男" name="reg" v-model="reg">男
            <input type="radio" value="女" name="reg" v-model="reg">女</label>
        </div>

        <div class="re-love">
            <label for="">
               全选<input type="checkbox" :checked="lovetype.length == love.length" @click="loveAll($event,love,lovetype)">
            </label>
            <p>
                <label for="" v-for="(item,index) in love" :key="index">
                    <input type="checkbox" :value="item.val" v-model="lovetype">{{item.txt}}
                </label>
                
            </p>
        </div>

        <div class="re-love">
            <label for="">
               全选<input type="checkbox" :checked="xtype.length == xingqu.length" @click="loveAll($event,xingqu,xtype)">
            </label>
            <p>
                <label for="" v-for="(item,index) in xingqu" :key="index">
                    <input type="checkbox" :value="item.val" v-model="xtype">{{item.txt}}
                </label>
                
            </p>
        </div>


        <div class="re-up">
            <span>所在地</span>
            <select v-model="city">
                <option value ="东">东</option>
                <option value ="西">西</option>
                <option value="南">南</option>
                <option value="北">北</option>
            </select>
        </div>


        <label for=""><input type="checkbox" class="re-true" v-model="read">同意并使用</label>
        <button class="re-logins" :class="{relogint: !read}" @click="regist" :disabled="!read">注册</button>
        <div class="re-a">
            <router-link to="/login">已有账号，现在去登录</router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: "regist",
    data () {
        return {
            username: '',
            password: '',
            rpassword: '',
            messages: '',
            read: false,
            reg: '',
            lovetype: [],
            love: [
                {
                    "val":0,
                    "txt":'玩'
                },
                {
                    "val":1,
                    "txt":'吃'
                },
                {
                    "val":2,
                    "txt":'喝'
                }
            ],
            xingqu: [
                {
                    "val":'a',
                    "txt":'打架'
                },
                {
                    "val":'b',
                    "txt":'吸烟'
                },
                {
                    "val":'c',
                    "txt":'喝酒'
                }
            ],
            xtype: [],
            city: '东'


        }
    },
    methods: {
        regist () {
            axios.post('/apis/regist',{
                userName:this.username,
                password:this.password,
                rpassword:this.rpassword
            }).then(rest => {
                if (rest.data.codes == 1) {
                    this.messages = rest.data.msg1
                }else if (rest.data.codes == 2) {
                    this.messages = rest.data.msg1
                }else if (rest.data.codes == 3) {
                    this.messages = rest.data.msg1
                }else {
                    this.messages = rest.data.msg1
                    setTimeout(()=>{
                        this.$router.push('/login')
                    },2000)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        loveAll (ev,obj,otype) {
            if (ev.target.checked) {
                obj.forEach((items,index) =>{
                    otype.push(items.val)
                })                 
            }else {
                if (otype == this.lovetype) {
                    this.lovetype = []
                }else {
                    this.xtype = []
                }
            }
        }
    }
}
</script>
<style>
    *{
        padding: 0;margin: 0;
    }
    .regist{
        width: 100vw;
        height: 100vh;
        background: #fff;
    }
    .regist h1{
        font-size:24px;
        text-align:center;
        line-height:100px;
    }
    .regist .re-red{
        font-size:14px;
        color:red;
        margin-left:5vw;
        margin-top:20px;
        margin-bottom:-25px;
    }
    .regist input{
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
    .regist label{
        font-size:14px;
    }
    .regist label .re-true{
        width:20px;
        height: 20px;
        border:1px solid gray;
    }
    .regist .re-logins{
        width: 90vw;
        height:50px;
        display:block;
        text-align:center;
        line-height:50px;
        font-size:18px;
        background-color:rgb(45, 130, 228);
        margin:40px auto;
        color:white;
        border:none;
        outline:none;
        transition: all 1s;
    }
    .regist .relogint{
        background-color:rgb(168, 171, 175);
        transition: all 1s;
    }
    .regist .re-a{
        width: 100%;
    }
    .regist .re-a {
        
        text-align:center;
        font-size:18px;
    }
    .regist .re-a a{
        color:rgb(45, 130, 228);
    }
    .regist .re-sex{
        font-size:14px;

    }
    .regist .re-sex input{
        width: 20px;
        height: 20px;
    }
    .regist{
        font-size:14px;

    }
    .regist .re-love label input{
        width: 20px;
        height: 20px;
    }
    .regist .re-up{
        padding: 20px;
        font-size:14px;
    }
</style>

