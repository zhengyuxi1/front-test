/*
 * @Author: Crayon
 * @Date: 2021-06-23 11:48:16
 * @Last Modified by: Crayon
 * @LastEditTime: 2021-07-03 10:57:19
 */
import Vue from "vue";
import Router from "vue-router";

// 去除重复路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/headFoot"
    },
    {
      path:'/headFoot',
      name:'HeadFoot',
      component:resolve=>require([
        /* webpackChunkName:'headFoot'*/ "@/views/pc/headFoot/index"
      ],resolve),
      children:[
        {
          path:"/",
          name:"Index",
          meta:{
            title:"网站主页"
          },
          component:resolve=>require([
            /* webpackChunkName:'index'*/ "@/views/pc/index/index"
          ],resolve)
        },
        {
          path:"quickEst",
          name:"QuickEst",
          meta:{
            title:"快速评测"
          },
          component:resolve=>{
            require([
              /* webpackChunkName:'quickEst'*/ "@/views/pc/quickEst/index"
            ],resolve)
          }
        },
        {
          path: "estimation",
          name: "Estimation",
          meta:{
            title:"详细评测"
          },
          component: resolve =>
            require([
              /* webpackChunkName:'estimation'*/ "@/views/pc/estimation/index"
            ], resolve)
        },
        {
          path: "result",
          name: "Result",
          meta:{
            title:"评测结果"
          },
          component: resolve =>
            require([
              /* webpackChunkName:'result'*/ "@/views/pc/result/index"
            ], resolve)
        },
        {
          path: "m_estimation",
          name: "M_Estimation",
          component: resolve =>
            require([
              /* webpackChunkName:'m_estimation'*/ "@/views/mobile/estimation/index"
            ], resolve)
        },
        {
          path: "m_result",
          name: "M_Result",
          component: resolve =>
            require([
              /* webpackChunkName:'m_result'*/ "@/views/mobile/result/index"
            ], resolve)
        }
      ]
    },
  ]
});
router.afterEach((to)=>{
  document.title=to.meta.title
})
export default router;
