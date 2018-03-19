/**
 * Created by Administrator on 2018/3/9.
 */
$(function(){
    //1获取到地址栏中的productId
    //2发送ajax请求，获取到商品的详细信息
    //3结合模板引擎渲染出来
//渲染商品数据
    var productId=getSearch('productId');  //不用引入就可以掉用函数

    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{id:productId},
        success:function(info){

            //给info添加一个数组
            var tempArr=info.size.split("-");
            var arr=[];
            for(var i=+tempArr[0]; i<=+tempArr[1]; i++){
                arr.push(i);
            }
            info.sizeArray=arr;   //设置属性******
            console.log(info);
            $('.mui-scroll').html( template('tpl',info));
            mui('.mui-slider').slider();  //重新初始化轮播图
            mui('.mui-numbox').numbox();  //重新初始化numbox

            //选择尺码
            $(".size span").on("click",function(){  //后生成的，事件委托
                console.log("hh");
               $(this).addClass("now").siblings().removeClass("now"); //
            })
        }

    });

    //功能二：加入购物车
    //1 给按钮注册点击事件
    //2获取到productId  num size
    $(".btn_add_cart").on("click",function(){
        var size=$(".size span.now").text();
        var num=$(".mui-numbox-input").val();
        if(!size){
            mui.toast("请选择尺码");
            return;    //没有尺码，就return
        }
        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
                productId:productId,
                num:num,
                size:size
            },
            success:function(info){
                console.log(info);
                if(info.error){
                    //跳转到登录页面 ,并且------******把当前页给传递过去了-----
                    // 如果想要把购物车数据保留起来，可以先用数组存到localStroage 跳转回来以后就销毁localStorage--------------
                    location.href="login.html?retUrl="+location.href;
                }
                if(info.success){
                    mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
                        console.log(e);
                        if(e.index==0){
                            location.href="cart.html";
                        }

                    })
                }
            }
        })
    })

})