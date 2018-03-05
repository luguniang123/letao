/**
 * Created by Administrator on 2018/3/5.
 */
$(function(){
    var page=1;
    var pageSize=5;

    var render=function(){
        $.ajax({
            type:'GET',
            url:"/category/querySecondCategoryPaging",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
              console.log(info);

                $("tbody").html(template("tpl", info));
                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function (a,b,c,p){
                        //设置当前页
                        page=p;
                        //重新渲染
                        render();
                    }
                });
            }
        })
    };

render();
    //添加分类的功能
    //点击添加分类，显示模态框，加载一级分类的数据 (为避免数据加载慢在第一个点击添加分类这里就先去拿数据
    $(".btn_add").on("click",function(){
        $("#secondModal").modal('show');

        //请求ajax渲染一级分类
        $.ajax({
            type:'GET',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,      //这里写死***1 ***
                pageSize:100 //这里可以写死一级分类不会特别多
            },
            success(info){
            console.log(info);
            $(".dropdown-menu").html(template("tp2",info));
            //把一级分类数据添加到ul
            }
        })

    })


//给ul.dropdown-menu下的a（和li一样大）注册点击事件
$(".dropdown-menu").on("click","a",function(){
    var text=$(this).text();
    $(".dropdown_text").text(text);
    var id=$(this).parent().data("id");

    $("[name='categoryId']").val(id);  //???  在第一次上传时有个categoryid

    })


});