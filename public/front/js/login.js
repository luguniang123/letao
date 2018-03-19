/**
 * Created by Administrator on 2018/3/18.
 */

$(function(){
//注意必须是点击的时候才去做ajax请求，不点击就不用验证
    $('.btn_login').on("click", function () {
        var username=$("[name=username]").val();
        var password=$("[name=password]").val();

        if(!username){
            mui.toast("请输入用户名");
            return;
        }
        if(!password){
            mui.toast("请输入密码");
            return;
        }
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:username,
                password:password
            },
            success:function(info){
                console.log(info);
                if(info.error){
                    mui.toast(info.message);  //显示消息
                }
                if(info.success){
                    //思路：成功了跳转到哪了，如果是购物车页面跳转到登录页面，***成功了要返回（购物车**原来的页面）
                    //如果是直接访问login.html 直接--》成功了要到用户中心
                    //判断，如果有retUrl参数，说明需要调回去，retUrl对应的地址去
                    //如果没有，默认取user.html
                    if(location.search.indexOf("retUrl")!=-1){   //注意这里不要用函数
                        //说明有，跳转到retUrl对应的地址上一页
                        history.go(-1);
                    }else{
                        //说明没有，跳转到用户中心
                        location.href="user.html";
                    }

                }
            }
        })
    })

});
