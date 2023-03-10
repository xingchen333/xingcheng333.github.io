# 消息无缝滚动

项目中遇到了一个需求，有一处消息展示窗口，数据加载是通过http请求获取的数据，而后是由websocket完成的更新，需要在这处展示的时候，能够有个动态的效果，让推送的消息能够以从上到下滚动的方式进行更新，并且在滚动时如果鼠标放上去可以停止滚动，更新完成后销毁对应失效的数据，数据行数有两行，高度可以定高，多余隐藏，但是难点在于websocket不知道什么时候会推送，也不知道推送的时候是有多少条。  
这里就提供了一个思路：以两个盒子嵌套为模型，子盒子相对父盒子做绝对定位，bottom为0，如果有消息推送，可以降bottom往下拉对应消息条数*行高的方式，通过比较消息总共需要下拉多少高度，和已经滚动多少高度的差，即可使用定时器js动画来达到无缝滚动的效果。  
这么做的好处在于如果鼠标放入的时候，websocket又推送的相应条数的消息，依旧可以记录下当前滚动的位置，不会造成滚动高度失效，抖动等问题。  
下面是实现方法...
***

html 部分
``` html
<div class="flash-content" @mouseenter="stopAnimate" @mouseleave="startAnimate">
    <ul class="flash-list" :style="{bottom: -animateTop + 'px'}">
        <li class="li" v-for="item in dataList" :key="'flash'+item.id">
            <p v-text="item.content"></p>
        </li>
    </ul>
</div>
```

css部分（使用了sass）

``` css
.flash-content {
    flex: 1;
    overflow: hidden;
    position: relative;
    height: 48px;

    .flash-list {
        bottom: 0;
        position: absolute;
        width: 100%;
    }

    .li {
        overflow: hidden;
        align-items: center;
        height: 24px;
        line-height: 24px;

        .content {
            color: #222222;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
```

JS部分（如何链接websocket已省略，详见我上一章的博客，这里仅写明数据处理的函数）

``` js
export default {
    data() {
        return {
            dataList: [],
            boxTop: 0,
            animateTop: 0,
            aniInterval: null
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData(){
            // xxx request 请求数据列表，逻辑请自行完成
            this.dataList = [{id: 1,content: '测试信息1'},{id: 2,content: '测试信息2'}];
        },
        getsocketData(e) {
            // 接收到websocket函数的数据后的处理
            try {
                const data = e && JSON.parse(e.detail.data)

                console.log('向数组中插入一项')
                this.dataList.unshift(data)
                
                // 启动动画效果
                
                this.boxTop += 24
                
                if(this.aniInterval){
                    return
                }
                this.setAniFun()
            } catch (e) {
                console.log(e, 'websocket推送失败')
            }
        },
        setAniFun(){
            console.log('启动动画效果')
            this.aniInterval = setInterval(()=>{
                if(this.animateTop < this.boxTop){
                    this.animateTop ++
                }else{
                    console.log('动画结束，删除DOM，数据')
                    clearInterval(this.aniInterval)
                    this.aniInterval = null
                    this.boxTop = 0
                    this.animateTop = 0
                    this.dataList = this.dataList.slice(0, 2)
                }
            },30)
        },
        startAnimate(){
            if(this.aniInterval){
                clearInterval(this.aniInterval)
                this.aniInterval = null
            }
            if(this.boxTop === 0){
                return
            }
            if(!(this.boxTop < this.animateTop)){
                this.boxTop = 0
                this.animateTop = 0
                this.dataList = this.dataList.slice(0, 2)
            }
            this.setAniFun()
        },
        stopAnimate(){
            if(!this.aniInterval){
                return
            }
            clearInterval(this.aniInterval)
            this.aniInterval = null
        },
    }
}
```