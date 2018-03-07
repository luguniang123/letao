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


    $(".icon_menu").on("click",function(){


        $(".lt_header").toggleClass("now");

    });

    //二级菜单的显示与隐藏
    //思路：找到二级分类的a标签  prev()前一个兄弟  $(this).next()找回到div
    $(".second").prev().on("click",function(){
        $(this).next().slideToggle();

    })

    //找到icon_menu注册点击事件 侧边栏隐藏 让lt_main的 padding-left:0;为了让他回去要给他一个类****  注意找不到的时候找更大的盒子*****
    $(".icon_menu").on("click",function(){
        $(".lt_aside").toggleClass("now");  //显示隐藏hide show 宽高会变小不好看给个left让它离开
        $(".lt_main").toggleClass("now");
    });

//退出功能
$(".icon_logout").on("click",function(){  //点击右边的小按钮出来模态框，注意不是toggle
    $('#myModal').modal('show');
})

});