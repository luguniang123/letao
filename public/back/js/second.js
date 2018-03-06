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
            //  console.log(info);

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
    //2添加分类的功能
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
            success:function(info){
           // console.log(info);
            $(".dropdown-menu").html(template("tp2",info));
            //把一级分类数据添加到ul
            }
        })

    });


//给ul.dropdown-menu下的a（和li一样大）注册点击事件 换值
$(".dropdown-menu").on("click","a",function(){
    var text=$(this).text();
    $(".dropdown_text").text(text);
    var id=$(this).parent().data("id");  //分类独有的id

    $("[name='categoryId']").val(id);  //???  在第一次上传时有个categoryid
//**手动让brandLogo校验成功，注意因为插件校验时不会改变图标
    $("#form").data('bootstrapValidator').updateStatus('categoryId','VALID');  //获取表单校验实例


    });

//3初始化图片上传 1引入JS 文件（jquery ui.widget.js iframe-transport.js）2准备input:file id 和name 3初始化
$("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址  点击上传图片是打印data

    done:function (e, data) {
        console.log(data);
       var pic= data.result.picAddr;  //上传后的图片地址 对象中有对象 拿到图片地址是字符串，下面就不用再“”
        $(".img_box img").attr("src",pic);  //改本地显示的img标签的src属性 为了显示在本地  ；attr(字符串属性名，value
        // （valueType: String or Number or Null）
        $("[name='brandLogo']").val(pic);  //把图片地址存在input：hidden里面，设置地址传到后台
        //**手动让brandLogo校验成功，注意因为插件校验时不会改变图标
       $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
       // updateStatus(The field name or field element,status); 第一个参数是字段名
    }
    });

//4表单校验功能
    var $form=$("form");
    $form.bootstrapValidator({

        excluded: [],   ////注意插件默认排除【不想校验的disabled】是指这几个隐藏的，没功能的不校验 如果想校验，那就excluded:[];
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择一级分类'
                    }   //插件注意2 即使写了exclude:[],但还是不会自动去实时更新小图标，需要自己手动设置
                }
            },

            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传品牌名称'
                    }
                }

            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传图片'
                    }
                }

            }
        }

    });

//添加二级分类 注册表单验证成功事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
         $.ajax({
             type:'POST',
             url:"/category/addSecondCategory",
             data:$form.serialize(),    //全部表单序列化上传
             success:function(info){
                 console.log(info);
                 if(info.success){   //如果上传成功就执行下面的
                     //关闭模态框
                     $("#secondModal").modal('show');
                     //重新渲染第一页
                     page=1;
                     render();
                     //重置样式
                     $form.data('bootstrapValidator').resetForm(true);
                     $(".dropdown_text").text("请选择一级分类");
                     $(".img_box img").attr("src","images/none.png");
                 }

             }
         })
    });

});