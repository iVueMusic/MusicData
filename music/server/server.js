const express=require("express");//引入express模块
const app=express(); 
const fs=require("fs");//引入fs模块
// const url=require("url");

var bodyParser = require('body-parser')//实例化express

app.use(bodyParser.urlencoded({ extended: false }))//不允许进行扩展
app.use(bodyParser.json())

app.listen(8000)// 指定端口;
app.get('/',function(req, res){//匹配主页的get请求
    res.send("首页")
})
app.get('/hotDatas.json',function (req,res) {
    fs.readFile('./data/hotDatas.json','utf-8',function (err,data) {
        if (err) {
            res.send('文件读取失败')
        } else {
            if (JSON.parse(data).length == 0) {
                res.send('暂无数据')
            } else{
                res.send(JSON.parse(data))
            }
        }
    })
})

app.get('/songList.json',function (req,res) {
    fs.readFile('./data/songList.json','utf-8',function (err,data) {
        if (err) {
            res.send('文件读取失败')
        } else {
            if (JSON.parse(data).length == 0) {
                res.send('暂无数据')
            } else{
                res.send(JSON.parse(data))
            }
        }
    })
})

app.get('/singer.json',function (req,res) {
    fs.readFile('./data/singer.json','utf-8',function (err,data) {
        if (err) {
            res.send('文件读取失败')
        } else {
            if (JSON.parse(data).length == 0) {
                res.send('暂无数据')
            } else{
                res.send(JSON.parse(data))
            }
        }
    })
})

app.post('/test',function (req,res) {
    res.send('123456');
})


app.post('/login',function (req,res) {
    if (req.body.userName === '' || req.body.password === '') {
        res.send({
            'Code':1,
            'Msg':"用户名或密码不能为空"
        })
    }else if (req.body.userName !== '18513000529' || req.body.password !=='123456') {
        res.send({
            'Code':2,
            'Msg':"用户名或密码错误"
        })
    }else{
        res.send({
            'Code':0,
            'Msg':"登录成功"
        })
    }
})


app.post('/regist',function (req,res) {
    console.log(12345)
    if (req.body.userName === '' || req.body.password === '') {
        res.send({
            'codes':1,
            'msg1':"用户名或密码不能为空"
        })
    }else if (req.body.userName !== '' && req.body.password !== '' && req.body.rpassword === '') {
        res.send({
            'codes':2,
            'msg1':"请再次输入密码"
        })
    }else if (req.body.password !== req.body.rpassword) {
        res.send({
            'codes':3,
            'msg1':"请输入相同的密码"
        })
    }else{
        res.send({
            'codes':4,
            'msg1':"登录成功"
        })
    }
})