/**
 * Created by Administrator on 2018/3/3.
 */
$(function(){
    NProgress.configure({ showSpinner: false });  //���ý��Ȼ�


$(document).ajaxStart(function(){  //��documentע���¼���document   ��ȫ���¼���ÿһ��Ԫ�ض��� �ڵ�
    console.log("ajax��ʼ��");
    NProgress.start(); //����������  �������
});
    $(document).ajaxStop(function(){
        console.log("ajax������");
        //setTimeout(function(){
            NProgress.done(); //���������� ��дһֱ��ͣ��д�������ʾÿ��ҳ��һ���أ���������������5�롣˼�룺�ڵ�¼����ajaxǰȥ����
        //},500);
    });
});