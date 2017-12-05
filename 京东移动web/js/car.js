/**
 * Created by wanghongjiang on 2017/6/28.
 */
;(function(){
// 全选业务
  // 点击totall实现全选或取消全选
  var totalls=document.querySelectorAll(".total-l");
  var checkboxs=document.querySelectorAll(".checkbox");

  //1.判断totall有没有checked类名（是不是选中状态）
  totalls[0].addEventListener("click",function(){

    this.classList.toggle("checked");
  })

  //2.点击totalls[0]时绑定监听事件
  totalls[0].addEventListener("click",function(){
    /*如果totalls[0]有checked这个类名，则复选框的checked属性值为true
    即复选框全被选中*/
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


//垃圾桶画面
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