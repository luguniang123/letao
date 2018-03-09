/**
 * Created by Administrator on 2018/3/8.
 */
$(function(){
    //约定 ：localStorage 里面存的键是search_list

    //列表渲染功能
    //1从本地缓存中获取需要渲染的数据

    function getHistory(){
        var history=localStorage.getItem("search_list")||'[]';  //取数据  这里空数组一定要加上“”,在localStorage里面存的一定只能是字符串，否则在拿出数据JSON.parse的时候回报错

        var arr=JSON.parse(history);  //转化成js数组
       //console.log(arr);
        return arr;
    }
    function render(){
        var arr= getHistory();
     //   console.log(arr);
        //注意，现在不用去后台请求数据，而是改用localStorage
        //2结合模板引擎渲染数据   template 遍历的必须是个对象，所以还需要用对象包起来
        $(".lt_history").html(template("tpl",{arr:arr}));
    }
    render();

    //功能二：清空  全部清空
    //1给清空按钮注册点击事件（委托）
    //清空search_list这个值
    //重新渲染
    $(".lt_history").on("click",".btn_empty",function(){  //给删除按钮注册委托事件
        console.log(1);
        //弹出一个确认框
        mui.confirm('你确认要清空所有的历史记录吗？','温馨提示',['是','否'],function(e){
            console.log(e);
            if(e.index==0){
                //删除缓存
                localStorage.removeItem("search_list");  //删除键
                render();
            }
        });

    });

    //功能三：删除事件
    //给删除按钮注册点击事件
    //获取到删除的下标
    //获取到web存储中的数组
    //删除数组中对应下标的那一项
    //重新设置search_list的值
    //重新渲染
    $(".lt_history").on("click",".btn_delete",function(){
        var that=this;  ///******************************************************
        mui.confirm("你确定要删除这条历史记录吗?","温馨提示",["删了吧","还是别"],function(e){
            if(e.index==0) {
                var index = $(that).data("index"); //下标   //***又有了一个函数 此时this不再指这个按钮，方法1 把变量放外面，方法二写外面，$(that)=$(this)
                var arr = getHistory(); //拿到数组
                //删除数组对应的下标 splice(start位置,删个数，添加元素）
                arr.splice(index, 1);
                console.log(arr);  //数组变了，但内部的值不变，还需要重新设置
                localStorage.setItem("search_list", JSON.stringify(arr));
                render();
            }
        });

    });
    //功能4 增加
    //1给搜索按钮注册事件
    //2获取到存储中的数组
    //3把value值添加到数组最前面
    //重新设置search_list的值
    //重新渲染 跳转到商品详情页
    $(".lt_search button").on("click",function(){

        var value=$(".lt_search input").val().trim();
       $(".lt_search input").val('');      //????这里不是空了吗？？？
        if(value==''){
            mui.toast('请输入搜索关键字',{ duration:'long', type:'div' });
        }

        var arr=getHistory(); //拿到localStorage中的值

        //需求1数组的长度不能超过10
        //需求2如果这个关键字已经存在，需要删除掉
        //分析应该先判断是否存在，存在的话，就胡搜啊了一个，后面就不用再去删除
        if(arr.indexOf(value)!=-1){  //获取value在数组中的位置
            arr.splice(arr.indexOf(value),1);   //干掉他
        }
        if(arr.length>=10){
            arr.pop();  //删除数组的最后一项
        }
        arr.unshift(value);  //把value添加到数组的最前面
        console.log(arr);
        //重新设置search_list
        localStorage.setItem("search_list",JSON.stringify(arr));  //转换成字符串
        render(); //重新渲染
location.href="searchList.html?key="+value;   //   把value带过去
    })

});