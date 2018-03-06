/**
 * Created by Administrator on 2018/3/6.
 */
$(function(){

    // 列表分页
    var page=1;
    var pageSize=5;

    var result=[];
    var render=function(){
        $.ajax({
            type:'GET',
            url:"/product/queryProductDetailList",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
              //  console.log(info);
                $("tbody").html( template("tpl",info));
                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    itemTexts:function(type, page, current){
                       // console.log(type, page, current);  //配置分页按钮上的文字http://blog.csdn.net/cxfly957/article/details/75798630
                            switch (type) {

                                case "first":

                                    return "首页";

                                case "prev":

                                    return "上一页";

                                case "next":

                                    return "下一页";

                                case "last":

                                    return "末页";

                                case "page":

                                    return "第"+page+"页";

                            }

                    },
                    tooltipTitles:function(type, page, current){
                        switch (type) {

                            case "first":

                                return "首页";

                            case "prev":

                                return "上一页";

                            case "next":

                                return "下一页";

                            case "last":

                                return "末页";

                            case "page":

                                return "第"+page+"页";

                        }
                    },
                    useBootstrapTooltip:true,
                    onPageClicked:function(event, originalEvent, type,p){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page=p;  //
                        render();
                    }
                });
            }
        })
    };
render();

    //点击添加商品，出现模态框
    $(".btn_add").click(function(){
        $("#productModal").modal('show');
        //发送ajax请求 请求二级分类数据
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,  //这里写死1，因为全部显示在下面供选择
                pageSize:100
            },
            success:function(info){
                console.log(info);
                $(".dropdown-menu").html( template("tp2",info));
            }
        })

    });

    //给dropdown-menu下的a注册事件
    //设置按钮的内容 就是a的内容
    $(".dropdown-menu").on("click","a",function(){
        //设置按钮的内容
        $(".dropdown_text").text( $(this).text() );
        //设置brandId  给input:hidden 以便传递给后台
        $("[name='brandId']").val($(this).data("id"));

        //3让brandId校验成功
        $("form").data('bootstrapValidator').updateStatus("brandId", "VALID");  //input：hidden提交的应该手动子改状态
    });


//点上传图片按钮 //思路：定义一个数组，把后台返回的picName1 picAddr1放到数组里面。在校验规则中校验一个自定义的input:hidden name字段，一开始空，一旦有图片上传，就让字段状态为valid
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            console.log(data.result);
            if(result.length>=3){
                return;
            }

            //获取到上传图片的地址，往img_box里面添加图片  本地显示图片
            var pic=data.result.picAddr;
            $('<img src="'+pic+'" width="100" height="100 " alt=""/>').appendTo(".img_box"); //appendTo子元素添加到父元素 父元素append（子元素）
        //把******img标签放到父元素中去
            result.push(data.result);   //把后台返回的结果放到数组中这两个结果是后台接口要求传的参数
            console.log(result);
            //根据数组的长度来判断上传了几张图片
            if(result.length===3){
                //让某个字段校验成功
                $("form").data("bootstrapValidator").updateStatus("productLogo", "VALID");
            }else{
                $("form").data("bootstrapValidator").updateStatus("productLogo", "INVALID");
            }
            //如果做删除，找到这种图，让他自杀，删除数组中相应的元素
        }
    });

    //表单校验
    $("form").bootstrapValidator({
        //1. //注意插件禁用的隐藏的，是不校验的。指定不校验的类型，
//默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],
//排除是指这几个不校验 如果想校验，那就excluded:[];
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择品牌'
                    }
                }
            },

            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品库存'
                    }, regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请输入一个有效的商品库存'
                    }
                }
            },  //必须是非零开头的数字

            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品尺码'
                    },regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '请输入一个有效的尺码例如(32-44)'
                    }
                }
            },  //必须是2位数字-2位数字

            oldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品价格'
                    }
                }
            },

            productLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传3张图片'
                    }
                }
            }
        }
    })


    //5给表单注册一个校验成功的事件 bootstrap-validator插件

    $("form").on('success.form.bv', function (e) {
        e.preventDefault();

        var param=$("form").serialize();    //表单序列化
        param+="&picName1="+result[0].picName+"&picAddr1="+result[0].picAddr;
        param+="&picName2="+result[1].picName+"&picAddr2="+result[1].picAddr;
        param+="&picName2="+result[2].picName+"&picAddr2="+result[2].picAddr;
        //使用ajax提交逻辑
        $.ajax({
            type:"POST",
            url:"/product/addProduct",
            data:param,   //上传的参数可以是品号的字符串组成的变量
            success:function(info){
                console.log(info);
                if(info.success){
                    //关闭模态框 重新渲染第一页 重置样式
                    $("#productModal").modal('hide');
                    page=1;
                    render();
                    $("#form").data('bootstrapValidator').resetForm(true);

                    $(".dropdown_text").text("请选择二级分类");
                    $(".img_box img").remove();   //移除不能写empty 因为还有一个input:hidden
                    result=[];  //清空数组 让数组为空，因为下次的逻辑是数组长度是3

                }
            }

        })
    });

});