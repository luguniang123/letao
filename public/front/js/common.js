/**
 * Created by Administrator on 2018/3/6.
 */
//初始化区域滚动
mui('.mui-scroll-wrapper').scroll({
    indicators: false, //去掉滚动条
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    bounce: true

});

//初始化轮播图
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});

//封装地址栏
function getSearch(key){
    var search=location.search;
  //
  //  console.log(search);
    search=decodeURI(search);
    //去掉问号
    var arr=search.split("?")[1];

    //把字符串根据&切割成数组
    var array=arr.split("&");
  //  console.log(array);
    //5遍历数组把等号切割成：
    var obj={};
    array.forEach(function(e,i){
      //  console.log(e, i);
        arr1= e.split("=");
        var k=e.split("=")[0];
        var v=e.split("=")[1];
        obj[k]=v;
    });
    return obj[key];
}
