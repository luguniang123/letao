/**
 * Created by Administrator on 2018/3/9.
 */
$(function () {
    //render1获取服务器的数据 2拿到数据后渲染
    //问题：获取数据是一样的 数据渲染
    var render = function (callback){
        var obj = {};
        obj.page = page; //全局的page
        obj.pageSize = 4;
        obj.proName = $(".lt_search input").val();
        //处理price与num,如果lt_sort下有now这个类，就传排序字段，否则不传
        var $now = $(".lt_sort a.now");
        if ($now.length > 0) {
            var sortName = $now.data('type');
            var sortValue = $now.find("span").hasClass("fa-angle-down") ? 2 : 1;
            obj[sortName] = sortValue;
        } else {
            console.log("不需要排序");
        }


        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: obj,
            success: function (info){
                console.log(info);
                setTimeout(function (){
                    callback(info);  //把渲染的操作放到回调函数中，以便放出去给其他人用
//                    $(".product").html( template( "tpl",info));
//                    //数据已经加载完成，需要把下拉刷新关闭了

                }, 1000);

            }
        })
    };

//    //功能1：页面一进来，需要渲染一次proName来自于input框
    var key = getSearch("key");
    $(".lt_search input").val(key);
//    render();
//
    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",//区域滚动容器下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                auto: true,
                callback: function (){  //下拉刷新时候，会执行的函数
                    page = 1;
                    render(function (info){   //回调函数
                        $(".product").html(template("tpl", info));
                        //结束下拉刷新
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();////注意mui文档把方法写错了
                        //结束下拉刷新mui('.mui-scroll-wrapper').pullRefresh()去控制台看原型
                        //重置上拉刷新
                        mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                    });
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                //.自动上拉加载一次 注意上拉刷新是绝对不能配置auto:true,否则全部帮你加载完毕
                callback: function () {
                    page++;
                    render(function (info) {

                        $(".product").append(template("tpl", info));
                        //结束下拉刷新
                        if (info.data.length > 0) {
                            //  console.log(info); {page: 4, size: 4, data: Array(1), count: 13}
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
                        } else {
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true); //停止上拉
                        }


                    })
                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }

    });


//功能2：点击搜索按钮，需要渲染一次，用户修改了input 里面的值proName
    $(".lt_search button").on("tap",function(){  //注意click被mui屏蔽了，  把click改为tap轻触

        $(".lt_sort a").removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
       //下拉自动刷新   --------------------------------*********
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();


            //想把此次的搜索记录存储起来
        var value=$(".lt_search input").val();
        var arr=JSON.parse(localStorage.getItem("search_list") ||'[]');

    var index=arr.indexOf(value);
        if(index !=-1){
            arr.splice(index,1);

        }
        if(arr.length>=10){
            arr.pop();
        }
        arr.unshift(value);
        localStorage.setItem("search_list",JSON.stringify(arr));
    })

//排序功能 给lt_sort下的a注册点击事件
    $(".lt_sort a[data-type]").on("tap",function(){
        var $this=$(this);
        if($this.hasClass("now")){
           $this.find("span").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
        }else{
            $this.addClass("now").parent().siblings().find("a").removeClass("now");
            $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        //render();
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
//注意click被mui屏蔽了，  把click改为tap
    })
});
