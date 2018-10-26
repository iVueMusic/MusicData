<template>
    <div class="commend">
        <div class="com-swiper">
            <swiperview ></swiperview>
        </div> 
        <div class="com-hot">
            热门歌单推荐
        </div>
        <div class="loading">
            <loading v-if="recommend.length == 0"></loading>
        </div>
            <scroll class="com-music" ref="scroll">
                <ul>
                    <li v-for="(item,index) in recommend" :key="index" @click="godetails(item)">
                        <div class="com-img">
                            <img v-lazy="item.imgurl" alt="">
                        </div>
                        <div class="com-content">
                            <p class="com-name">{{item.creator.name}}</p>
                            <p class="com-word">{{item.dissname}}</p>
                        </div>
                    </li>
                </ul>
            </scroll>
            <router-view></router-view>
    </div>
</template>
<script>
import swiperview from '../base/swiperview'
// import axios from 'axios'
export default {
    name: 'commend',
    data () {
        return {
            recommend:[]
        }
    },
    components: {
        swiperview
    },
    mounted () {
    //     this.$axios.get('/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1540280333494').then((res) => {
    //         console.log(res.data)
    //     })
       this.$axios.get('/apis/hotDatas.json').then((res) => {
           this.recommend =res.data.data.list
       })
    },
    methods: {
        godetails (item) {
            this.$router.push(`/home/commend/detailst?${item.dissid}`)
        }
    }
}
</script>
<style>
    *{
        padding: 0;
        margin: 0;
    }
    .commend{
        height:100%;
        width: 100%;
        display:flex;
        flex-direction: column;
    }
    .commend .com-swiper{
        width: 100vw;
        height: 150px;
    }
    .commend .com-hot{
        width: 100vw;
        height: 60px;
        font-size:14px;
        font-weight:700;
        color:#dec806;
        line-height:60px;
        text-align:center;
    }
    .commend .com-music{
        height:100%;
        width: 100vw;
        background-color: #282828;
        overflow:hidden;
    }
    .commend .com-music ul{
        list-style:none;
    }
    .commend .com-music li{
        width: 100vw;
        height: 90px;
    }
    .commend .com-music li .com-img{
        float:left;
        width: 60px;
        height: 60px;
        margin-left:18px;
    }
    .commend .com-music li .com-img img{
        width: 100%;
        height: 100%;
    }
    .commend .com-music li .com-content{
        height:60px;
        float:left;
        font-size:14px;
        margin-left:18px;
        color:white;
        padding-right:5vw;
    }
    .commend .com-music li .com-content p{
        line-height:14px;
        margin-top:10px;
    }
    .commend .com-music li .com-content p:last-child{
        color:#686868;
    }
    .commend .loading{
       flex:1;
    }
    .commend .loading img{
        width: 100%;
        height: 100%;
    }
</style>

