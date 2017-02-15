var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var selectList = document.getElementById('list');
t.lists('id','name').then(function(promiseResult){
  //selectList.empty();
  if(promiseResult.length == 0){
    //selectList.hide();
  }else{
    for(let i = 0; i < promiseResult.length; i++){

      var option = document.createElement('option');
      option.appendChild( document.createTextNode(promiseResult[i].name) );
      option.value = promiseResult[i].id;
      selectList.appendChild(option);
    }
  }
});;

function GenerateSlides(){
  var pptx = new PptxGenJS();
  t.cards('name', 'desc', 'idList').then(
    function(promiseResult){
      for(let i = 0; i < promiseResult.length; i++){
        if(promiseResult[i].idList == selectList.options[selectList.selectedIndex].value){
          var slide = pptx.addNewSlide();
          if(promiseResult[i].name != null || promiseResult[i].name != ""){
            slide.addText(promiseResult[i].name, { x:1.0, y:1.0, font_size:42, color:'000000' });
          }
          if(promiseResult[i].desc != null || promiseResult[i].desc != ""||promiseResult[i].desc != ''){
            console.log(promiseResult[i].desc);
            slide.addText(promiseResult[i].desc, { x:1.0, y:2.0, font_size:24, color:'000000' });
          }
        }
      }
        pptx.save(selectList.options[selectList.selectedIndex].innerHTML);
    }
  );
}

var authBtn = document.getElementById('create-slides-btn');
authBtn.addEventListener('click', function() {
  GenerateSlides();
});
