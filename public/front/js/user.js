/**
 * Created by Administrator on 2018/3/18.
 */
$(function () {

    //页面加载，需要获取当前用户的个人信息
    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        success:function(info){
            console.log(info);
            if(info.error){
                location.href='login.html';
            }
            //坑：没有success 如果成功，会直接返回个人信息 就直接写下去
            $('.userinfo').html( template("tpl",info));  //把拿到的信息渲染在页面上
        }
    });

    //退出功能  发送ajax请求告知后台
    $(".btn_logout").on("click",function(){

        $.ajax({
            type:'get',
            url:'/user/logout',
            success:function(info){
                console.log(info);
                if(info.success){
                    //跳转到登录页
                    location.href="login.html";
                }
            }
        })

    });

});