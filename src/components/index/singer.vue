<template>
    <div class="singer">
        <scroll ref="scroll" class="sin-scroll" :probe-type="3" @scroll="scroll">
            <div class="sin-content">
                <div class="sin-number" v-for="(item,index) in singer" :key="index" ref="sin-list-item">
                    <div class="sin-title">
                        <p>{{item.title}}</p>
                    </div>
                    <ul>
                        <li v-for="(node,indexs) in item.items" :key="indexs"  @click="sinGo(node,$event)">
                            <p class="sin-img">
                                <img v-lazy="node.avatar" alt="">
                            </p>
                            <p class="sin-name">{{node.name}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
        <ul class="sin-nav">
            <li  v-for="(item,index) in singer" :key="index" @click="sinFloor(index,$event)" :class="{sin_active : currentIndex === index}">
                {{item.title}}
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'singer',
    data () {
        return {
            singerData: [],
            singer: [],
            sinlistheight: [],
            scrollY: 0
        }
    },
    created () {
        this.getSinger()
        setTimeout( () => {
            this.sinlistHeight()
        }, 500)
    },
    methods: {
        getSinger () {
            this.$axios.get('/apis/singer.json').then(res => {
                // console.log('res111', res.data.data.list)
                this.singer = this._normalLizeSinger(res.data.data.list)
                console.log('222', this.singer)
            })
        },
        _normalLizeSinger (list) {
            let map = {
                hot: {
                    title: '热门',
                    items: []
                }
            }
            // console.log('hot1', map)
            list.forEach((item, index) => {
                if (index <= 10) {
                    // console.log(index)
                    map.hot.items.push({
                        'name': item.Fsinger_name,
                        'id': item.Fsinger_id,
                        'avatar':  `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg`
                    })
                    // console.log(map)
                }


                const key = item.Findex
                // console.log('key', key)
                if (!map[key]) {
                    map[key] = {
                        'title': key,
                        items: []
                    }
                }
                map[key].items.push({
                    'name': item.Fsinger_name,
                    'id': item.Fsinger_id,
                    'avatar': `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg`
                })
            })
            
            let ret = []
            let hot = []
            for (let key in map) {
                let val = map[key]
                // console.log('val999', val)
                if (val.title.match(/[a-zA-Z]/)) {
                // console.log('ret', ret)
                ret.push(val)

            
                } else if (val.title === '热门') {
                hot.push(val)
                }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt() - b.title.charCodeAt()
            })

            return hot.concat(ret)
        },
        sinGo (node) {
             this.$router.push(`/home/singer/detailst?${1234}`)
        },
        sinFloor (index) {
            let sinlist = this.$refs['sin-list-item']
            this.$refs.scroll.scrollToElement(sinlist[index],600)
        },
        sinlistHeight (){
            let sinlist = this.$refs['sin-list-item']
            let sinheight = 0
            this.sinlistheight.push(sinheight)
            for(let i=0;i<sinlist.length;i++){
                sinheight += sinlist[i].clientHeight
                this.sinlistheight.push(sinheight)
            }
        },
        scroll (position) {
            this.scrollY = Math.round(Math.abs(position.y))
            // console.log(this.scrollY)
        }
    },
    mounted () {
        this.$axios.get('/apis/singer.json').then( (res) => {
            this.singerData = res.data.data.list
        })
    },
    computed: {
        currentIndex () {
            for(let i=0;i<this.sinlistheight.length;i++){
                let currentHeight = this.sinlistheight[i]
                let nextHeight = this.sinlistheight[i+1]
                if(this.scrollY >= currentHeight && this.scrollY< nextHeight || !nextHeight){
                    return i
                }
            }
            return 0
        }
    }
}
</script>
<style>
    *{
        padding: 0;
        margin: 0;
    }
    .singer{
        flex:1;
        display:flex;
    }
    .singer .sin-scroll{
        flex:1;
        overflow:hidden;
    }
    .singer .sin-content{
        width: 100vw;
    }
    .singer .sin-number{
        width: 100vw;
    }
    .singer .sin-number .sin-title{
        height:35px;
        width: 100vw;
        background-color: #363636;
        border-top:1px solid #232323;
    }
    .singer .sin-number .sin-title p{
        font-size:13px;
        line-height:35px;
        color:#9f9f9f;
        margin-left:20px;
    }
    .singer .sin-number ul{
        list-style:none;
        padding-top:26px;
    }
    .singer .sin-number ul li{
        height:70px;
    }
    .singer .sin-number ul li p{
        float:left;
    }
    .singer .sin-number ul li .sin-img{
        width: 46px;
        height: 46px;
        margin-left:30px;
        border-radius:50%;
        overflow:hidden;
    }
    .singer .sin-number ul li .sin-img img{
        width: 100%;
        height: 100%;
    }
    .singer .sin-number ul li .sin-name{
        font-size:13px;
        color:#9f9f9f;
        line-height:46px;
        margin-left:18px;
    }
    .singer .sin-nav{
        width:20px;
        height:76vh;
        top:137px;
        position:absolute;
        right:1px;
        background-color: #1c1c1c;
        border-radius:10px;
        list-style:none;
        display:flex;
        flex-direction: column;
        justify-content:center;
        z-index:2;
    }
    .singer .sin-nav li{
        width: 100%;
        height:20px;
        font-size:13px;
        text-align:center;
        line-height:20px;
        color:#9f9f9f;
        font-weight:700;
        overflow: hidden;
    }
    .singer .sin-nav li.sin_active{
        color:#ffdc34;
    }
</style>