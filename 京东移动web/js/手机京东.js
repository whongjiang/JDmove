/**
 * Created by wanghongjiang on 2017/6/23.
 */

// 思路：(头部的透明度在某个范围内变化)
// （1）基本的代码都应该在scroll事件里面完成
// （2）通过不断变化的scrollTop去影响透明度 ---
// 比例：不断变化的scrolltop值/自己设的最大滚动的值 = 不断变化的透明度/最大透明度
;(function(){
  var jdheader=document.querySelector(".jd-header");
  var maxTop = 200;

  window.addEventListener("scroll",function(){
    var scrollTop = document.body.scrollTop;
    // 对不断变化的scrolltop值进行判断
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
  // resize 调整大小，当切换不同的窗口设备或屏幕窗口实时变化时触发事件
  window.addEventListener("resize",function(){
    ul.style.height=lis[0].offsetHeight+"px";
  });

  console.log(lis.length);
  // 动态设置小圆点
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
  // 获取屏幕的宽度
  var screenWidth = document.documentElement.offsetWidth;
  lis[left].style.transform='translateX('+ -screenWidth +'px)';
  lis[center].style.transform="translateX(0px)";
  lis[right].style.transform="translate("+screenWidth+"px)";

  timer = setInterval(function(){
    //图片往左移动，下标发生变换
    left=center;
    center=right;
    right++;
    //　极值判断:当右侧对应的图片下标>lis.length -1则返回第一张
    if(right>lis.length -1){
      right=0;
    }
    lis[left].style.transition = 'transform .5s';
    lis[center].style.transition = 'transform .5s';
    // 右边的图片永远是替补的，所以压根儿不需要过渡
    lis[right].style.transition = 'none';

    // 归位
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