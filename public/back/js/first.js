/**
 * Created by Administrator on 2018/3/5.
 */
$(function(){
    //渲染列表与分页 接口文档要求传page pagesize
    var page=1;
    var pageSize=2;
//渲染页面 和分页
    var render=function(){
        $.ajax({
            type:'GET',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
               var html= template("tpl",info);
                $("tbody").html(html);

                //渲染分页 1引插件 2写一个ul
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


    //添加分类功能
    $(".btn_add").on("click",function(){
        $("#firModal").modal('show');
    });

//初始化表单校验bootstrap-validator插件
    var $form=$("form");  //用一个变量来接收
    $form.bootstrapValidator({
        //小图标
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{message: '一级分类的名称不能为空'}
                }
            }
        }
    });

//给表单注册校验成功的事件
    $form.on("success.form.bv",function(e){
        e.preventDefault(); //禁止表单的自动提交，使用ajax进行表单的提交
        $.ajax({
            type:'POST',
            url:'/category/addTopCategory',
            data:$form.serialize(),
            success:function(info){
               // console.log(info);
                if(info.success){
                //关闭模态框
                $("#firModal").modal('hide');
                //清空重置****
            $form.data('bootstrapValidator').resetForm(true);//重置表单，并且会隐藏所有的错误提示和图标
                //重新渲染
                    page=1;
                    render();

            }
        }
        })

    })

});