/**
 * Created by wanghongjiang on 2017/6/23.
 */

// ˼·��(ͷ����͸������ĳ����Χ�ڱ仯)
// ��1�������Ĵ��붼Ӧ����scroll�¼��������
// ��2��ͨ�����ϱ仯��scrollTopȥӰ��͸���� ---
// ���������ϱ仯��scrolltopֵ/�Լ������������ֵ = ���ϱ仯��͸����/���͸����
;(function(){
  var jdheader=document.querySelector(".jd-header");
  var maxTop = 200;

  window.addEventListener("scroll",function(){
    var scrollTop = document.body.scrollTop;
    // �Բ��ϱ仯��scrolltopֵ�����ж�
    if(scrollTop >= maxTop){
      jdheader.style.background = 'rgba(201, 21, 35,1)';
    }else{
      jdheader.style.background = 'rgba(201, 21, 35,'+ scrollTop/maxTop*1 +')';
    }
  })
})()



;(function(){

var ul=document.querySelector(".rotation>ul");
var lis=ul.querySelectorAll("li");
  ul.style.height=lis[0].offsetHeight+"px";
  // resize ������С�����л���ͬ�Ĵ����豸����Ļ����ʵʱ�仯ʱ�����¼�
  window.addEventListener("resize",function(){
    ul.style.height=lis[0].offsetHeight+"px";
  });

  console.log(lis.length);
  // ��̬����СԲ��
  for(var i = 0; i <lis.length; i++){
    var li = document.createElement('li');
    var points=document.querySelector(".points")
    if(i == 0){
      li.classList.add('active');
    }
    points.appendChild(li);
  }
  var left = lis.length -1;
  var center =0;
  var right = 1;
  // ��ȡ��Ļ�Ŀ��
  var screenWidth = document.documentElement.offsetWidth;
  lis[left].style.transform='translateX('+ -screenWidth +'px)';
  lis[center].style.transform="translateX(0px)";
  lis[right].style.transform="translate("+screenWidth+"px)";

  timer = setInterval(function(){
    //ͼƬ�����ƶ����±귢���任
    left=center;
    center=right;
    right++;
    //����ֵ�ж�:���Ҳ��Ӧ��ͼƬ�±�>lis.length -1�򷵻ص�һ��
    if(right>lis.length -1){
      right=0;
    }
    lis[left].style.transition = 'transform .5s';
    lis[center].style.transition = 'transform .5s';
    // �ұߵ�ͼƬ��Զ���油�ģ�����ѹ��������Ҫ����
    lis[right].style.transition = 'none';

    // ��λ
    lis[left].style.transform = 'translateX('+ -screenWidth +'px)';
    lis[center].style.transform = 'translateX(0px)';
    lis[right].style.transform = 'translateX('+ screenWidth +'px)';
    setpoint()



  },1000)
  var ol=document.querySelector(".points");
  var LIS=ol.querySelectorAll("li");
  function setpoint(){
    for(i=0;i<LIS.length;i++){
      LIS[i].classList.remove("active");
    }
    LIS[center].classList.add('active');
  }





})()