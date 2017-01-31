var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var selectList = document.getElementById('list');
t.lists('id','name').then(function(promiseResult){
  //selectList.empty();
  for(let i = 0; i < promiseResult.length; i++){

    var option = document.createElement('option');
    option.appendChild( document.createTextNode(promiseResult[i].name) );
    option.value = promiseResult[i].id;
    selectList.appendChild(option);
  }
});;

function GenerateSlides(){
  var pptx = new PptxGenJS();
  t.cards('name', 'desc', 'idList').then(
    function(promiseResult){
      for(let i = 0; i < promiseResult.length; i++){
        if(promiseResult[i].idList == selectList.options[selectList.selectedIndex].value){
          console.log(promiseResult[i]);
          var slide = pptx.addNewSlide();
          slide.addText(promiseResult[i].name, { x:1.0, y:1.0, font_size:42, color:'000000' });
          slide.addText(promiseResult[i].description, { x:1.0, y:2.0, font_size:24, color:'000000' });
        }
      }
        pptx.save(selectList.options[selectList.selectedIndex].innerHTML);
    }
  );


}


var authBtn = document.getElementById('create-slides-btn');
authBtn.addEventListener('click', function() {
  alert('Generate Slides!');
  GenerateSlides();
});
