/**
 * Created by wanghongjiang on 2017/6/26.
 */
;(function () {
  // ������ul������ָ�����������з���Ч����������
  // ��1����ul�������»���
  // ��2����move��ʱ�����ƻ���������
  // ���µ����� �� 50
  // ���ϵ�����:��ul�ĸ� - left�ĸ� + 50��

  var scrollL = document.querySelector("#scroll-l");
  var ul = scrollL.children[0];
  var maxDown = 50;  /*���»��������ֵ*/
  var maxUp = -(ul.offsetHeight - scrollL.offsetHeight + maxDown);/*���ϻ��������ֵ*/

  var startY;
  var sum=0;
  var dy=0;
  //����ֵ
  var minBounceDown = 0; /*ֻҪ���»����о�����touchendʱ�ͷ�����ȥ����С����Ϊ0*/
  var maxBoubcsUp =  -(ul.offsetHeight - scrollL.offsetHeight);
  /*���ϻ�����ul�ײ�©��ʱ�ܹ����Ƶľ��룬�����ֵ���ο��ж�touchendʱҪ��Ҫ����*/

  ul.addEventListener('touchstart', function (e) {
    /* ��¼�ʼ����ָ���*/
    startY = e.changedTouches[0].clientY;
  });
  ul.addEventListener('touchmove', function (e) {
    /* ��ȡ��ֵ �����ֵÿһ�ζ��Ǵ�0 - Խ��Խ�����*/
    dy = e.changedTouches[0].clientY - startY;
    var tempY = sum + dy;
    console.log(tempY);

    // ���ƾ���
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