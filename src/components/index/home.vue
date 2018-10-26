<template>
    <div class="home">
        <div class="home-header">
            <div class="home-top">
                <i class="iconfont icon-bofang"></i>
                <h1>music player</h1>
            </div>
            <i class="iconfont icon-user"></i>
        </div>
        <ul class="home-nav">
            <li><router-link to="commend">推荐</router-link></li>
            <li><router-link to="singer">歌手</router-link></li>
            <li><router-link to="ranking">排行</router-link></li>
            <li><router-link to="search">搜索</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: "home"
}
</script>
<style>
    *{
        padding: 0;
        margin: 0;
    }
    .home{
        width: 100vw;
        height: 100vh;
        background-color: #282828;
        display:flex;
        flex-direction: column;
    }
    .home .home-header{
        width: 100vw;
        height: 50px;
        color:#dec806;
        position:relative;
    }
    .home .home-header .home-top{
        height:50px;
        width: 200px;
        margin:0 auto;
        line-height:50px;
        position:relative;
    }
    .home .home-header .icon-bofang{
        display:block;
        font-size:32px;
        position:absolute;
        left:15px;
    }
    .home .home-header h1{
        display:inline-block;
        font-size:18px;
        margin-left:60px;
    }
    .home .home-header .icon-user{
        display:block;
        font-size:20px;
        line-height:50px;
        position:absolute;
        top:0;
        right:15px;
    }
    .home .home-nav{
        width: 100vw;
        height:50px;
        display:flex;
        justify-content: space-around;
        list-style:none;
        overflow:hidden;
    }
    .home .home-nav li{
        width:35px;
        height:35px;
        border-bottom:2px solid #282828;
        text-align:center;
        line-height:50px;
        font-size:15px;
        color:#858585;
    }
    .home .home-nav li a{
        color:#858585;
        font-weight:700;
        text-decoration:none;
    }

    .home .home-nav li a.router-link-exact-active.router-link-active{
        color:#dec806;border-bottom:2px solid #dec806;
        padding-bottom:4px;
    }
</style>

