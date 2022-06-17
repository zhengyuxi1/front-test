<template>
    <section id="main-slider" class="no-margin">
        <div class="carousel slide">
            <div class="carousel-inner">

                <div class="item active" >
                    <div class="container">
                        <div class="row slide-margin">
                            <div class="col-sm-6">
                                <div class="carousel-content">
                                    <h1 class="animation animated-item-1">测试你的英语词汇量</h1>
                                    <h2 class="animation animated-item-2">根据你反馈的单词了解情况...</h2>
                                    <a class="btn-slide animation animated-item-3" @click="startTest">开始测试</a>
                                </div>
                            </div>

                            <div class="col-sm-6 hidden-xs animation animated-item-4">
                                <div class="slider-img">
                                    <img src="@/assets/img1.png" class="img-responsive">
                                </div>
                            </div>

                        </div>
                    </div>
                </div><!--/.item-->
            </div><!--/.carousel-inner-->
        </div><!--/.carousel-->
    </section><!--/#main-slider-->

</template>
<script>

export default {
    name:'Index-1',
    props:{},
    components:{},
    methods:{
        startTest(){
            console.log("点击了开始检测")
            this.$router.push({name:'Estimation'})
        }
    }
}
</script>
