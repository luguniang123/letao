/**
 * Created by Administrator on 2018/3/8.
 */
$(function(){
    var myChart = echarts.init(document.getElementById('echarts1'));

    var myChart2 = echarts.init(document.querySelector(".charts_2"));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数'],
           right:'100px'
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [1000, 2000, 3000, 160, 3010, 2400]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。





    var option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','纽巴伦','新百伦','李宁']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'纽巴伦'},
                    {value:135, name:'新百伦'},
                    {value:1548, name:'李宁'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };


    //显示数据
    myChart.setOption(option);
    myChart2.setOption(option2);    //这个一定要放在下面



});