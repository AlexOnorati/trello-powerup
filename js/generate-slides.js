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
  t.cards('name', 'description', 'idList').then(
    function(promiseResult){
      for(let i = 0; i < promiseResult.length; i++){
        if(promiseResult.idList == selectList.options[selectList.selectedIndex].value){
          var slide = pptx.addNewSlide();
          slide.addText(promiseResult.name, { x:1.0, y:1.0, font_size:42, color:'000000' });
          slide.addText(promiseResult.description, { x:1.0, y:2.0, font_size:24, color:'000000' });
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
