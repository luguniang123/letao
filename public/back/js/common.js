/**
 * Created by Administrator on 2018/3/3.
 */
$(function(){
    NProgress.configure({ showSpinner: false });  //禁用进度环


$(document).ajaxStart(function(){  //给document注册事件，document   是全局事件。每一个元素都是 节点
    console.log("ajax开始了");
    NProgress.start(); //进度条开启  插件自有
});
    $(document).ajaxStop(function(){
        console.log("ajax结束了");
        //setTimeout(function(){
            NProgress.done(); //进度条结束 不写一直不停。写在这里表示每次页面一加载，就来进度条闪现5秒。思想：在登录发送ajax前去加载
        //},500);
    });
});