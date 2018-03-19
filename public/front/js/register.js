/**
 * Created by Administrator on 2018/3/18.
 */

$(function(){
    //获取验证
    //1给获取验证码注册点击事件（禁用默认行为） 这里发送验证码是简化的
    //禁用按钮，把内容改成发送中
    //2发送ajax请求
    $(".btn_getcode").on("click",function(e){
        e.preventDefault();
        //首先禁用按钮
        var $this=$(this);
        $this.prop("disabled",true).addClass("disabled").text("发送中...");  //改变背景色

        $.ajax({
            type:'GET',
            url:'/user/vCode',
            success:function(info){
                console.log(info);
                //开启倒计时
                var count=5;
                var timeId=setInterval(function(){  //setInterval setTimeout后面都有，1000
                    count--;

                    //修改text的内容
                    $this.text(count+"秒后再次发送");
                    if(count<=0){
                        //清除定时器
                        clearInterval(timeId);  //让count时间不走了
                        //恢复按钮
                        $this.prop("disabled",false).removeClass("disabled").text("再次发送");
                    }


                },1000)
            }
        })

    });
    //注册功能  不勾选复选框，禁用注册（先不做）
    $(".btn_register").on("click",function(e){
        e.preventDefault();
        var username=$("[name=username]").val();
        var password=$("[name=password]").val();
        var repassword=$("#repassword").val();
        var mobile=$("[name=mobile]").val();
        var vCode=$("[name=vCode]").val();

        if(!username){
            mui.toast("用户名不能为空");
            return;
        }
        if(!password){
            mui.toast("密码不能为空");
            return;
        }
        if(repassword !=password){  //确认码应该与密码一致
            mui.toast("确认密码与密码不一致");
            return;
        }
        if(!mobile){
            mui.toast("手机号不能为空");
            return;
        }
        if(!/^1[3-9]\d{9}$/.test(mobile)){  //调用test方法，如果是true
            mui.toast("手机号格式错误");
            return;
        }
        if(!mobile){
            mui.toast("验证码不能为空");
            return;
        }
        //if(!mobile){
        //    mui.toast("验证码不能为空");
        //    return;
        //}
        //校验通过
        $.ajax({
            type:'post',
            url:'/user/register',
            data:$("form").serialize(),  //表单序列化传过去
            success:function(info){

                console.log(info);
                if(info.error){
                    mui.toast(info.message);   //失败了为什么后面不会再走
                }
                mui.toast('恭喜你,注册成功了，2秒后自动跳转到登录页');
                setTimeout(function(){
                    location.href="login.html";

                },1000);

            }

        })
    })

});