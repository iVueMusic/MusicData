<template>
    <transition name="detailst">
        <div class="details">
            <div class="det-bg">
                <img v-lazy="details.imgurl" alt="" class="det-img">
                <div class="det-cover">
                    <i class="iconfont icon-fanhui" @click="gohome"></i>
                    <h1 class="det-title">{{details.dissname}}</h1>
                    <div class="det-video">
                        <span class="iconfont icon-bofang"></span>
                        <span>随机播放全部</span>
                    </div>
                </div>
            </div>
            <scroll class="det-lists" ref="scroll">
                <ul>
                    <li v-for="(item,index) in detailsData" :key="index">
                        <p>{{item.albumname}}</p>
                        <p>{{item.songname}}</p>
                    </li>
                </ul>
            </scroll>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'detailst',
    data () {
        return {
            detailsData:[],
            details:[]
        }
    },
    methods: {
        gohome () {
            this.$router.back(-1)
        }
    },
    mounted () {
        this.$axios.get('/apis/hotDatas.json').then( (res) => {
            let hash = window.location.hash.split('?')[1]
            for (let i=0;i<res.data.data.list.length;i++) {
                if (res.data.data.list[i].dissid == hash) {
                    this.details = res.data.data.list[i]
                }
            }
        })
        this.$axios.get('/apis/songList.json').then( (res) => {
            this.detailsData = res.data.cdlist[0].songlist
            // console.log(res.data)
        })
    }
}
</script>
<style>
    *{
        padding: 0;margin: 0;
    }
    .details{
        width: 100vw;
        height: 100vh;
        position:fixed;
        top:0;
        left:0;
        z-index:2;
        background-color: #282828;
        display:flex;
        flex-direction: column;
    }
    .detailst-enter,.detailst-leave-to{
        opacity:0;
        transform: translateX(101vw);
    }
    .detailst-enter-active,.detailst-leave-active{
        transition: all 0.5s;
    }
    .detailst-enter-to,.detailst-leave{
        opacity:1;
        transform: translateX(0);
    }

    .details .det-bg{
        width:100vw;
        height: 280px;
        background-color: #fff;
        position: relative;
    }
    .details .det-lists{
        flex:1;
    }
    .details .det-bg img{
        width: 100%;
        height: 100%;
    }
    .details .det-bg .det-cover{
        width:100vw;
        height: 280px;
        position: absolute;
        top:0;
        left:0;
        background-color: rgba(0,0,0,0.3);
    }
    .details .det-bg .det-cover .icon-fanhui{
        font-size:30px;
        color:#fff512;
        text-shadow: -2px 0 #375280, 0 2px #375280,2px 0 #375280, 0 -2px #375280;
        position: absolute;
        top:10px;
        left:20px;
    }
    .details .det-bg .det-cover .det-title{
        color:white;
        font-size:20px;
        text-align:center;
        font-weight:500;
        margin-top:10px;
    }
    .details .det-bg .det-cover .det-video{
        width:160px;
        height: 34px;
        border:2px solid #fff512;
        border-radius:20px;
        margin:0 auto;
        margin-top:185px;
        text-align:center;
        font-size:14px;
        color:#fff512;
    }
    .details .det-bg .det-cover .icon-bofang{
        float:left;
        font-size:24px;
        margin-top:0px;
        margin-left:26px;
    }
    .details .det-bg .det-cover span{
        float:left;
        line-height:34px;
    }
    .details .det-lists{
        width: 100%;
        height: 100%;
        overflow:hidden;
    }
    .details .det-lists ul{
        width: 100%;
        list-style:none;
        padding-top:30px;
    }
    .details .det-lists ul li{
        color:white;
        width: 85vw;
        height:70px;
        margin:0 auto;
        font-size:14px;
        line-height:26px;
    }
    .details .det-lists ul li p:last-child{
        color:#797979;
    }
</style>