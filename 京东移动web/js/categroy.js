/**
 * Created by wanghongjiang on 2017/6/26.
 */
;(function () {
  // 需求：让ul跟随手指滑动，并且有反弹效果。。。。
  // （1）让ul可以上下滑动
  // （2）在move的时候，限制滑动的区间
  // 往下的区间 ： 50
  // 往上的区间:（ul的高 - left的高 + 50）

  var scrollL = document.querySelector("#scroll-l");
  var ul = scrollL.children[0];
  var maxDown = 50;  /*向下滑动的最大值*/
  var maxUp = -(ul.offsetHeight - scrollL.offsetHeight + maxDown);/*向上滑动的最大值*/

  var startY;
  var sum=0;
  var dy=0;
  //弹性值
  var minBounceDown = 0; /*只要向下滑动有距离在touchend时就反弹回去，最小距离为0*/
  var maxBoubcsUp =  -(ul.offsetHeight - scrollL.offsetHeight);
  /*向上滑动至ul底部漏出时总共滑移的距离，以这个值作参考判断touchend时要不要反弹*/

  ul.addEventListener('touchstart', function (e) {
    /* 记录最开始的手指落点*/
    startY = e.changedTouches[0].clientY;
  });
  ul.addEventListener('touchmove', function (e) {
    /* 获取差值 这个差值每一次都是从0 - 越来越大的数*/
    dy = e.changedTouches[0].clientY - startY;
    var tempY = sum + dy;
    console.log(tempY);

    // 限制距离
    if (tempY> maxDown) {
      tempY = maxDown;
      this.style.transform = "translateY(" + tempY + "px)"
    } else if (tempY< maxUp) {
      tempY = maxUp;
      this.style.transform = "translateY(" + tempY + "px)"
    }else{
      this.style.transform = "translateY(" + tempY + "px)"
    }
  })

  ul.addEventListener('touchend', function (e) {
    dy = e.changedTouches[0].clientY - startY;
    sum += dy;
    if(sum>minBounceDown){
      this.style.transform = "translateY(" +minBounceDown + "px)"
      this.style.transition="transform 0.5s";
      sum = minBounceDown;

    }else if(sum<maxBoubcsUp){
      sum = maxBoubcsUp;
      this.style.transition="transform 0.5s";
      this.style.transform = "translateY(" +maxBoubcsUp+ "px)"
    }

  });
})()


;(function(){






})()