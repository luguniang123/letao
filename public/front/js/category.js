/**
 * Created by Administrator on 2018/3/7.
 */
$(function(){
   //1发送ajax，加载一级分类的数据
    $.ajax({
        type:'GET',
        url:'/category/queryTopCategory',
        success: function (info) {
            //console.log(info);
            $(".first").html( template("firstTpl",info));
            renderSecond(info.rows[0].id);  //***接口要求是一级分类的id
        }
    })

function renderSecond(id){
    $.ajax({
        type:'get',
        url:'/category/querySecondCategory',
        data:{
            id:id
        },
        success:function(info){
            console.log(info);
            $(".second").html( template('secondTpl',info));
        }
    })
}
    //2点击一级菜单，重新渲染二级菜单
    $(".first").on("click","li",function(){
        console.log($(this));
      $(this).addClass("now").siblings().removeClass("now");  //点击时就让这个元素有now这个类，其他都消灭
       var id=$(this).data("id");   //拿到自定义属性后面是一个在字符串形式
        console.log(id);
        renderSecond(id);
//****0mui插件文档有回复到顶部的代码，但是mui('.mui-scroll-wrapper').scroll() 返回的是一个滚动的对象是一个数组，所以后面还应该写【1】
         mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,100);//100毫秒滚动到顶
    });
});

