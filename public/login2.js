/**
 * Created by Administrator on 2018/3/3.
 */
/**
 * Created by Administrator on 2018/3/3.
 */
//写入口函数 等待页面加载完成 防止全局污染

$(function(){
    $("form").bootstrapValidator({
//要求用户名不能为空
        //密码不能为空 密码的长度在6-12位
        //配置校验的规则
        fields:{
            //**对应了**form中的name属性
            username:{
                //校验器 是一个对象 给username配置校验规则
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message:'长度应该在2-6位'
                    },//专门用来提示信息
                    callback:{
                        message: "用户名错误"  //回调函数 专门用来做提示
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },stringLength:{
                        min:6,
                        max:12,
                        message:'长度应该在6-12'
                    },callback:{
                        message:"密码错误"
                    }
                }
            }

        },
        //配置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            //校验通过 不通过 校验中的图标
            validating: 'glyphicon glyphicon-refresh'
        }
    });


//给表单注册一个校验成功的事件success.form.bv --是插件提供的 ，成功时阻止表单的默认提交，使用ajax提交
    $("form").on('success.form.bv', function (e) {
        e.preventDefault();   //阻止浏览器默认行为 不能用return false ,后面的代码不能执行了
        //使用ajax提交逻辑
        $.ajax({
            type:'post',
            url:"/employee/employeeLogin",
            data:$("form").serialize(),  //表单序列化
            dataType:'json',
            success:function(info){
                console.log(info);   //打印不出？？？
                if(info.error===1000){
                    $("form").data("bootstrapValidator").updateStatus("username","INVALID",'callback');  //固定写法 用户名错误时出现回调
                }
                if(info.error===1001){
                    alert("密码错误");
                    $("form").data("bootstrapValidator").updateStatus("password","INVALID",'callback');
                }
                if(info.success){
                    //location.href="index.html";
                }
            }


        })

    });

    //重置表单，清除所有样式
    $("[type='reset']").on("click",function(){
        //e.preventDefault();//function里面传e可以保留输入内容
        $("form").data('bootstrapValidator').resetForm();  //固定写法 ，
        // bootstrapvalidator.votintsev.ru/api/#reset-field 这个api的说明中说写resetForm之前有个要写$("form").bootstrapValidator
        // 如果true该方法将字段值重置为空或删除选中/选定的属性
    })
});
