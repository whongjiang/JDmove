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

  window.addEventListener('scroll', function(){
   var scrollTop = document.body.scrollTop;
   //    对不断变化的scrolltop值进行判断
   if(scrollTop >= maxTop){
     jdheader.style.background = 'rgba(201, 21, 35,1)';
   }else{
     jdheader.style.background = 'rgba(201, 21, 35,'+ scrollTop/maxTop*1 +')';
   }
  })

})()



//  京东快报轮播图
//  思路：
//（1）复制一个临时工，追加到最后一个
//（2）一旦看到了最后一个临时工，立马跳到第一个
;(function(){
  var ul=document.querySelector(".jd-news-center ul");
  var lis =ul.querySelectorAll('li');
  /*lis[0].cloneNode(true).appendTo(ul);*/
  ul.appendChild(lis[0].cloneNode(true));
  var index = 0;   // 计数器，读取新闻数量，初始值设为0
   timer = null;
  timer = setInterval(function(){
    index++;
    // 细节：过渡的时候不要大于定时器的时间
    ul.style.transition  = 'transform .5s';
    ul.style.transform  = 'translateY('+ (-index*lis[0].offsetHeight) +'px)';
  }, 1000);


// 如何判断看到的是最后一个临时工，过渡结束的时候去瞅一瞅index的值
  ul.addEventListener('transitionend',function(){
    // console.log(index);
    // lis.length是没有算克隆的 所以这里不需要-1
    if(index >= lis.length){
      index = 0;
      // 干掉过渡
      ul.style.transition  = 'none';
      ul.style.transform  = 'translateY(0px)';
    }
  })
})()



//京东秒杀倒计时
// 倒计时需要两个时间  一个是当前时间 一个是未来时间
;(function(){
  // 获取当前时间
  var nowDate = new Date();
//　获取未来某一时刻
  var furDate = new Date('Jun 23 2017 17:30:00');
// 得到相差的时间并且转换成秒数
  var dTime = parseInt((furDate - nowDate)/1000);
  var spans= document.querySelectorAll('.jd-seckill-header-c span');
  var timer = null;
  timer = setInterval(function(){
    // 得到的秒数自减一
    dTime--;
    // 极值判断
    if(dTime < 0){
      clearInterval(timer);
      return false;
    }

    var h = Math.floor(dTime/3600);
    var m = Math.floor(dTime%3600/60);
    var s =  Math.floor(dTime%60);

    var str = toTwo(h) + ':' + toTwo(m) + ':' + toTwo(s);
    // 遍历str 将str的每一项放到对应的span里面
    for(var i = 0; i < str.length; i++){
      spans[i].innerHTML = str[i];
    }
  }, 1000);
  function toTwo(n){
    return n > 9 ? n : '0' + n;
  }

})()



//主页面轮播图
;(function(){
  // 动态设置ul的高度(让计算机智能获取ul高度)
  var ul=document.querySelector("section>ul");
  var lis=ul.querySelectorAll("li");
  ul.style.height=lis[0].offsetHeight+"px";
// resize 调整大小，当切换不同的窗口设备或屏幕窗口实时变化时触发事件
  window.addEventListener('resize',function(){
    ul.style.height =lis[0].offsetHeight + 'px';
  })

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
  var center = 0;
  var right = 1;
  // 获取的屏幕的宽度
  var screenWidth = document.documentElement.offsetWidth;
  // 归位
  lis[left].style.transform = 'translateX('+ -screenWidth +'px)';
  lis[center].style.transform = 'translateX(0px)';
  lis[right].style.transform = 'translateX('+ screenWidth +'px)';

  timer = setInterval(function(){
    //图片往左移动，下标发生变换
    left=center;
    center=right;
    right++;
    //　极值判断:当右侧对应的图片下标>lis.length -1则返回第一张
    if(right > lis.length -1){
      right = 0;
    }
    lis[left].style.transition = 'transform 0.5s';
    lis[center].style.transition = 'transform 0.5s';
    // 右边的图片永远是替补的，所以压根儿不需要过渡
    lis[right].style.transition = 'none';

    // 归位
    lis[left].style.transform = 'translateX('+ -screenWidth +'px)';
    lis[center].style.transform = 'translateX(0px)';
    lis[right].style.transform = 'translateX('+ screenWidth +'px)';
    setpoint()
  }, 1000)

  var ol=document.querySelector(".points");
  var LIS=ol.querySelectorAll("li");
  function setpoint(){
    for(i=0;i<LIS.length;i++){
      LIS[i].classList.remove("active");
    }
    LIS[center].classList.add('active');
  }


  //触摸滑屏
//1.绑定三个touch事件，在start的时候，清除定时器，记录手指落点，设置时间
//2.在move的时候获取差值（距离），干掉过渡，执行移位（＋ｄｘ）
//3.在end的时候判断滑动是否成功（依据：距离是否超过屏幕的１/3，或者滑动的时候小于300毫秒同时长度超度30）
//4.滑动失败，过渡性复位
//5.滑动成功，判断方向过渡性执行下一张还是上一张

  ul.addEventListener("touchstart",function(e){
    clearInterval(timer);         /*清除定时器*/
    startX = e.changedTouches[0].clientX;  /*开始时候手指落点:起点位置*/
    startTime = Date.now();      /*记录一下开始滑动的时候的时间*/
  })
  ul.addEventListener("touchmove",function(e){
    /*获取起点和离开点之间的差值dx*/
    var dx=e.changedTouches[0].clientX-startX;
    /*去掉过渡，让图片可以跟随触摸自然滑动*/
    lis[left].style.transition = 'none';
    lis[center].style.transition = 'none';
    lis[right].style.transition = 'none';
    /*获取图片产生差值后的位置*/
    lis[left].style.transform="translateX("+(-screenWidth+dx)+"px)";
    lis[center].style.transform="translateX("+dx+"px)";
    lis[right].style.transform="translateX("+(screenWidth+dx)+"px)";
  });
  ul.addEventListener("touchend",function(e){
    var dx = e.changedTouches[0].clientX - startX;
    var dTime = Date.now() - startTime;
    /*判断滑动是否成功*/
    console.log(dx);
    if(Math.abs(dx)>screenWidth/3 || (dTime<300 && Math.abs(dx) > 30)){
      /*滑动成功*/if(dx > 0){
        /* 往右滑 看到上一张*/
        showPrev();
      }else{
       /*  往左滑 看到下一张*/
        showNext();
      }
    }
    else{
      /*添加过度*/
      lis[left].style.transition = 'transform .5s';
      lis[center].style.transition = 'transform .5s';
      lis[right].style.transition = 'transform .5s';

      lis[left].style.transform = 'translateX('+ -screenWidth +'px)';
      lis[center].style.transform = 'translateX(0px)';
      lis[right].style.transform = 'translateX('+ screenWidth +'px)';
    }

    clearInterval(timer);
    timer = setInterval(function(){
      //图片往左移动，下标发生变换
      left=center;
      center=right;
      right++;
      //　极值判断:当右侧对应的图片下标>lis.length -1则返回第一张
      if(right > lis.length -1){
        right = 0;
      }
      lis[left].style.transition = 'transform 0.5s';
      lis[center].style.transition = 'transform 0.5s';
      // 右边的图片永远是替补的，所以压根儿不需要过渡
      lis[right].style.transition = 'none';

      // 归位
      lis[left].style.transform = 'translateX('+ -screenWidth +'px)';
      lis[center].style.transform = 'translateX(0px)';
      lis[right].style.transform = 'translateX('+ screenWidth +'px)';
      setpoint()
    }, 1000)


    // 看到下一张
    function showNext(){
      /* 轮转下标*/left = center;
                  center = right;
                  right++;
      /*　极值判断:如果右侧图片的下标>lis.length -1，立即跳回0；*/
      if(right > lis.length -1){
        right = 0;
      }
      /*添加过度*/
      lis[left].style.transition = 'transform .5s';
      lis[center].style.transition = 'transform .5s';
      lis[right].style.transition = 'none';
      /* 过渡性移位*/
      lis[left].style.transform = 'translateX('+ (-screenWidth) +'px)';
      lis[center].style.transform = 'translateX('+ 0+'px)';
      lis[right].style.transform = 'translateX('+ (screenWidth) +'px)';
      setpoint();
    }
    // 看到上一张
    function showPrev(){
     /*  轮转下标*/right = center;
                  center = left;
                  left--;

      /*　极值判断*/
      if(left < 0){
        left = lis.length -1;
      }
      /* 添加过渡*/
      lis[left].style.transition = 'none';
      lis[center].style.transition = 'transform .5s';
      lis[right].style.transition = 'transform .5s';
      // 归位
      lis[left].style.transform = 'translateX('+ -screenWidth +'px)';
      lis[center].style.transform = 'translateX('+ 0 +'px)';
      lis[right].style.transform = 'translateX('+ screenWidth +'px)';
      setpoint();
    }

  })











})()


