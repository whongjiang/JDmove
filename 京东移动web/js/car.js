/**
 * Created by wanghongjiang on 2017/6/28.
 */
;(function(){
// ȫѡҵ��
  // ���totallʵ��ȫѡ��ȡ��ȫѡ
  var totalls=document.querySelectorAll(".total-l");
  var checkboxs=document.querySelectorAll(".checkbox");

  //1.�ж�totall��û��checked�������ǲ���ѡ��״̬��
  totalls[0].addEventListener("click",function(){

    this.classList.toggle("checked");
  })

  //2.���totalls[0]ʱ�󶨼����¼�
  totalls[0].addEventListener("click",function(){
    /*���totalls[0]��checked�����������ѡ���checked����ֵΪtrue
    ����ѡ��ȫ��ѡ��*/
    if(this.classList.contains('checked')){
      for(var i = 1; i < totalls.length; i++){
        /*totalls[i].classList.add("checked");*/
        checkboxs[i].checked=true;
      }
    }else{
      for(var i = 1; i < totalls.length; i++){
        checkboxs[i].checked=false;
      }
    }
  })

})()


//����Ͱ����
;(function(){
  var dels=document.querySelectorAll(".del");
  var delts=document.querySelectorAll(".del-t");
  //console.log(dels);


  /*for(i=0;i<delts.length;i++){
   dels[i].addEventListener("click",function(){
     delts[i].style.transform="rotate(-30deg) translateY(-4PX)"
   })
  }*/

  for(i=0;i<delts.length;i++){
    dels[i].addEventListener("click",function(){
      this.querySelector(".del-t").style.transform="rotate(-30deg) translateY(-4PX)"
    })
  }





})()