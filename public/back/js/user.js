/**
 * Created by Administrator on 2018/3/4.
 */
$(function(){
    var page=1;
    var pageSize=5;

function render(){
    $.ajax({
        type:'GET',
        url:'/user/queryUser',
        data:{
            page:page,
            pageSize:pageSize
        },
        success:function(info){
            console.log(info);
            var html =template("tpl",info); //第一个参数：模板id ；第二个参数：对象
            //渲染数据
            $("tbody").html(html);
            console.log(template("tpl",info));
//6.渲染分页要写在成功返回数据里面
            $("#pagination").bootstrapPaginator({
                bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage:page,//设置当前页 是一个变量page
                totalPages:Math.ceil(info.total/info.size),//总页数
                numberOfPages:5,
                size:"small",//设置控件的大小，mini, small, normal,large
                onPageClicked:function(event, originalEvent, type,p){
                    //为按钮绑定点击事件 page:当前点击的按钮值
                    console.log(p);
                    page=p;
                    render();
                }
            })
        }
    })

}

        render();

  //启用禁用模态框
    $("tbody").on("click",".btn",function(){  //事件委托因为是动态生成的
       $("#userModal").modal("show");

        //获取到点击的按钮所在的用户的id  根据接口要求
        var id =$(this).parent().data("id");
        var isDelete=$(this).hasClass("btn-success")?1:0;   //改变状态，原先是启用的0传1
        $(".btn_confirm").off().on("click",function(){   //思路1 可以把要传给后天的数据变成全局的，就可以把模态框确定按钮点击事件写外面，来获取数据
           // 思路2 把这个写到点击事件里面先清除原来的事件
//发送ajax请求
            $.ajax({
                type:"POST",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:(function (info){
                    console.log(info);
                    //后台返回数据为{success:true}
                    if(info.success){
                        //关闭模态框
                        $("#userModal").modal("hide");
                        //重新渲染
                        render();
                    }
                })
            })
        })
    });
    //$(".btn_confirm").on("click",function(){
    //    console.log('hh');
    //})
});