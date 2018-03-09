/**
 * Created by Administrator on 2018/3/9.
 */
$(function(){

//封装地址栏 在common.js
    //功能1：将地址栏中的key属性 z值放到input框中
    var key=getSearch("key");
    $(".lt_search input").val(key);


    var param={};
    param.page=1;
    param.pageSize=100;
    param.proName=key;  //输入框的值

    render();  //页面一进来就渲染一次

    // 功能2 ：点击搜索按钮 1直接获取到input框中的value值 2发送ajax请求  把搜索框中的值放到历史记录中
    $(".lt_search button").on("click",function(){
        //把所有的a的now全部干掉，并且把a的箭头全部向下 逻辑：当搜索的时候，我们排序是乱序的，所以要去除下面的排序逻辑
        $(".lt_sort a").removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");

    key =$(".lt_search input").val();   //注意这里必须写key 把全局的改掉点击搜索时再去渲染
        console.log(key);
        render();


    //把key的值添加到search_list中
    var history=localStorage.getItem("search_list")||'[]';  //取数据  这里空数组一定要加上“”,在localStorage里面存的一定只能是字符串，否则在拿出数据JSON.parse的时候回报错
    var arr=JSON.parse(history);  //转化成js数组.
    var index=arr.indexOf(key);   // 与search功能一样，把函数拆开 value换成key
    //需求1数组的长度不能超过10
    //需求2如果这个关键字已经存在，需要删除掉
    //分析应该先判断是否存在，存在的话，就胡搜啊了一个，后面就不用再去删除
    if(index !=-1){  //获取value在数组中的位置
        arr.splice(arr.indexOf(key),1);   //干掉他
    }
    if(arr.length>=10){
        arr.pop();  //删除数组的最后一项
    }
    arr.unshift(key);  //把key添加到数组的最前面
    //重新设置search_list
    localStorage.setItem("search_list",JSON.stringify(arr));  //转换成字符串

});

    //功能3 排序功能
    //给lt_sort下面的a注册点击事件 判断点击的a是否有now这个类  ***
    //如果没有，*****加上now这个类，并且删除其他a的类,****让所有的箭头都向下
    //如果有，改变这个a下的span的箭头的方向这个e
    $(".lt_sort a[data-type]").on("click",function(){
        //后台要求只要价格和库存两个就行，所以在写选择器的时候，一定要注意

        var $this=$(this);
        if($this.hasClass("now")){
            $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up"); //可以进行两次toggle判断*******
        }else{
           $this.addClass("now").parent().siblings().find('a').removeClass("now");  //保证只有一个now*****
            $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down"); //必须是向下，所以用addClass

        }
        render();
    });

    function render(){
        $(".product").html('<div class="loading"></div>');
        //对于price与num两个参数不一定要加
        //判断价格是否有now这个类，如果有now这个类，就需传递price
        //判断库存是否有now这个类，如果有now这个类，就需要传递num
        //如果确定值，1升序 2降序
        //获取lt_sort下有没有now这个类的a
        var temp=$(".lt_sort a.now");  //伪数组  bug1***以下代码必须写在里面，否则只走一次，就无法去判断了，也就无法渲染了

        //说明需要排序
        if(temp.length>0){
            var sortName=temp.data('type');  //为price与num**设***自定义属性
//根据箭头来确定传递的具体的值。判断temp下的span是否有fa-angle-down这个类
            var sortValue=temp.find("span").hasClass("fa-angle-down")?2:1;
            // console.log(sortName, sortValue);
            //把这两个值价格param
            param[sortName]=sortValue;
        }

        //发送ajax请求
        $.ajax({
            type:'get',
            url:"/product/queryProduct",
            data:param,    //数据可传可以不传，用对象包裹起来*****
            success:function(info){
                console.log(info);
                setTimeout(function(){
                $(".product").html(template( "tpl",info ));
            },1000);

            }
        });

         param[sortName] = null;  //每次渲染完，让price 的数据为null,为了不影响，后面的库存的排序
    }

});
