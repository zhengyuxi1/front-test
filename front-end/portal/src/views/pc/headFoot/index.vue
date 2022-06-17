<template>
<div>
    <header id="header">
        <nav class="navbar navbar-inverse" role="banner">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand"><img :src="imgUrl" alt="logo"></a>
                </div>
				
                <div class="collapse navbar-collapse navbar-right">
                    <ul class="nav navbar-nav">  
                      <li class="active"><router-link  to="/headFoot">网站主页</router-link></li>  
                      <li class="active"><router-link  to="/headFoot/estimation">详细评测</router-link></li>
                      <li class="active"><router-link  to="/headFoot/quickEst">快速评测</router-link></li>            
                    </ul>
                </div>
            </div><!--/.container-->
        </nav><!--/nav-->
    </header><!--/header-->
    <router-view></router-view>
    <footer id="footer" class="midnight-blue">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    &copy; 2022  06 
                </div>

            </div>
        </div>
    </footer><!--/#footer-->
</div>
</template>

<script>
import imgUrl from '@/assets/logo.png'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      imgUrl
    }
  },
  components:{
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
