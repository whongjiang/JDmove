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

  window.addEventListener('scroll', function(){
   var scrollTop = document.body.scrollTop;
   //    �Բ��ϱ仯��scrolltopֵ�����ж�
   if(scrollTop >= maxTop){
     jdheader.style.background = 'rgba(201, 21, 35,1)';
   }else{
     jdheader.style.background = 'rgba(201, 21, 35,'+ scrollTop/maxTop*1 +')';
   }
  })

})()



//  �����챨�ֲ�ͼ
//  ˼·��
//��1������һ����ʱ����׷�ӵ����һ��
//��2��һ�����������һ����ʱ��������������һ��
;(function(){
  var ul=document.querySelector(".jd-news-center ul");
  var lis =ul.querySelectorAll('li');
  /*lis[0].cloneNode(true).appendTo(ul);*/
  ul.appendChild(lis[0].cloneNode(true));
  var index = 0;   // ����������ȡ������������ʼֵ��Ϊ0
   timer = null;
  timer = setInterval(function(){
    index++;
    // ϸ�ڣ����ɵ�ʱ��Ҫ���ڶ�ʱ����ʱ��
    ul.style.transition  = 'transform .5s';
    ul.style.transform  = 'translateY('+ (-index*lis[0].offsetHeight) +'px)';
  }, 1000);


// ����жϿ����������һ����ʱ�������ɽ�����ʱ��ȥ��һ��index��ֵ
  ul.addEventListener('transitionend',function(){
    // console.log(index);
    // lis.length��û�����¡�� �������ﲻ��Ҫ-1
    if(index >= lis.length){
      index = 0;
      // �ɵ�����
      ul.style.transition  = 'none';
      ul.style.transform  = 'translateY(0px)';
    }
  })
})()



//������ɱ����ʱ
// ����ʱ��Ҫ����ʱ��  һ���ǵ�ǰʱ�� һ����δ��ʱ��
;(function(){
  // ��ȡ��ǰʱ��
  var nowDate = new Date();
//����ȡδ��ĳһʱ��
  var furDate = new Date('Jun 23 2017 17:30:00');
// �õ�����ʱ�䲢��ת��������
  var dTime = parseInt((furDate - nowDate)/1000);
  var spans= document.querySelectorAll('.jd-seckill-header-c span');
  var timer = null;
  timer = setInterval(function(){
    // �õ��������Լ�һ
    dTime--;
    // ��ֵ�ж�
    if(dTime < 0){
      clearInterval(timer);
      return false;
    }

    var h = Math.floor(dTime/3600);
    var m = Math.floor(dTime%3600/60);
    var s =  Math.floor(dTime%60);

    var str = toTwo(h) + ':' + toTwo(m) + ':' + toTwo(s);
    // ����str ��str��ÿһ��ŵ���Ӧ��span����
    for(var i = 0; i < str.length; i++){
      spans[i].innerHTML = str[i];
    }
  }, 1000);
  function toTwo(n){
    return n > 9 ? n : '0' + n;
  }

})()



//��ҳ���ֲ�ͼ
;(function(){
  // ��̬����ul�ĸ߶�(�ü�������ܻ�ȡul�߶�)
  var ul=document.querySelector("section>ul");
  var lis=ul.querySelectorAll("li");
  ul.style.height=lis[0].offsetHeight+"px";
// resize ������С�����л���ͬ�Ĵ����豸����Ļ����ʵʱ�仯ʱ�����¼�
  window.addEventListener('resize',function(){
    ul.style.height =lis[0].offsetHeight + 'px';
  })

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
  var center = 0;
  var right = 1;
  // ��ȡ����Ļ�Ŀ��
  var screenWidth = document.documentElement.offsetWidth;
  // ��λ
  lis[left].style.transform = 'translateX('+ -screenWidth +'px)';
  lis[center].style.transform = 'translateX(0px)';
  lis[right].style.transform = 'translateX('+ screenWidth +'px)';

  timer = setInterval(function(){
    //ͼƬ�����ƶ����±귢���任
    left=center;
    center=right;
    right++;
    //����ֵ�ж�:���Ҳ��Ӧ��ͼƬ�±�>lis.length -1�򷵻ص�һ��
    if(right > lis.length -1){
      right = 0;
    }
    lis[left].style.transition = 'transform 0.5s';
    lis[center].style.transition = 'transform 0.5s';
    // �ұߵ�ͼƬ��Զ���油�ģ�����ѹ��������Ҫ����
    lis[right].style.transition = 'none';

    // ��λ
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


  //��������
//1.������touch�¼�����start��ʱ�������ʱ������¼��ָ��㣬����ʱ��
//2.��move��ʱ���ȡ��ֵ�����룩���ɵ����ɣ�ִ����λ���������
//3.��end��ʱ���жϻ����Ƿ�ɹ������ݣ������Ƿ񳬹���Ļ�ģ�/3�����߻�����ʱ��С��300����ͬʱ���ȳ���30��
//4.����ʧ�ܣ������Ը�λ
//5.�����ɹ����жϷ��������ִ����һ�Ż�����һ��

  ul.addEventListener("touchstart",function(e){
    clearInterval(timer);         /*�����ʱ��*/
    startX = e.changedTouches[0].clientX;  /*��ʼʱ����ָ���:���λ��*/
    startTime = Date.now();      /*��¼һ�¿�ʼ������ʱ���ʱ��*/
  })
  ul.addEventListener("touchmove",function(e){
    /*��ȡ�����뿪��֮��Ĳ�ֵdx*/
    var dx=e.changedTouches[0].clientX-startX;
    /*ȥ�����ɣ���ͼƬ���Ը��津����Ȼ����*/
    lis[left].style.transition = 'none';
    lis[center].style.transition = 'none';
    lis[right].style.transition = 'none';
    /*��ȡͼƬ������ֵ���λ��*/
    lis[left].style.transform="translateX("+(-screenWidth+dx)+"px)";
    lis[center].style.transform="translateX("+dx+"px)";
    lis[right].style.transform="translateX("+(screenWidth+dx)+"px)";
  });
  ul.addEventListener("touchend",function(e){
    var dx = e.changedTouches[0].clientX - startX;
    var dTime = Date.now() - startTime;
    /*�жϻ����Ƿ�ɹ�*/
    console.log(dx);
    if(Math.abs(dx)>screenWidth/3 || (dTime<300 && Math.abs(dx) > 30)){
      /*�����ɹ�*/if(dx > 0){
        /* ���һ� ������һ��*/
        showPrev();
      }else{
       /*  ���� ������һ��*/
        showNext();
      }
    }
    else{
      /*��ӹ���*/
      lis[left].style.transition = 'transform .5s';
      lis[center].style.transition = 'transform .5s';
      lis[right].style.transition = 'transform .5s';

      lis[left].style.transform = 'translateX('+ -screenWidth +'px)';
      lis[center].style.transform = 'translateX(0px)';
      lis[right].style.transform = 'translateX('+ screenWidth +'px)';
    }

    clearInterval(timer);
    timer = setInterval(function(){
      //ͼƬ�����ƶ����±귢���任
      left=center;
      center=right;
      right++;
      //����ֵ�ж�:���Ҳ��Ӧ��ͼƬ�±�>lis.length -1�򷵻ص�һ��
      if(right > lis.length -1){
        right = 0;
      }
      lis[left].style.transition = 'transform 0.5s';
      lis[center].style.transition = 'transform 0.5s';
      // �ұߵ�ͼƬ��Զ���油�ģ�����ѹ��������Ҫ����
      lis[right].style.transition = 'none';

      // ��λ
      lis[left].style.transform = 'translateX('+ -screenWidth +'px)';
      lis[center].style.transform = 'translateX(0px)';
      lis[right].style.transform = 'translateX('+ screenWidth +'px)';
      setpoint()
    }, 1000)


    // ������һ��
    function showNext(){
      /* ��ת�±�*/left = center;
                  center = right;
                  right++;
      /*����ֵ�ж�:����Ҳ�ͼƬ���±�>lis.length -1����������0��*/
      if(right > lis.length -1){
        right = 0;
      }
      /*��ӹ���*/
      lis[left].style.transition = 'transform .5s';
      lis[center].style.transition = 'transform .5s';
      lis[right].style.transition = 'none';
      /* ��������λ*/
      lis[left].style.transform = 'translateX('+ (-screenWidth) +'px)';
      lis[center].style.transform = 'translateX('+ 0+'px)';
      lis[right].style.transform = 'translateX('+ (screenWidth) +'px)';
      setpoint();
    }
    // ������һ��
    function showPrev(){
     /*  ��ת�±�*/right = center;
                  center = left;
                  left--;

      /*����ֵ�ж�*/
      if(left < 0){
        left = lis.length -1;
      }
      /* ��ӹ���*/
      lis[left].style.transition = 'none';
      lis[center].style.transition = 'transform .5s';
      lis[right].style.transition = 'transform .5s';
      // ��λ
      lis[left].style.transform = 'translateX('+ -screenWidth +'px)';
      lis[center].style.transform = 'translateX('+ 0 +'px)';
      lis[right].style.transform = 'translateX('+ screenWidth +'px)';
      setpoint();
    }

  })











})()


