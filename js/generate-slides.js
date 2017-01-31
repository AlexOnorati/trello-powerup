var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var selectList = document.getElementById('lists');
t.lists('id','name').then(function(promiseResult){
  selectList.clear();
  for(let i = 0; i < promiseResult.length; i++){

    var option = document.createElement('option');
    option.appendChild( document.createTextNode(promiseResult[i].name) );
    option.value = promiseResult[i].id;
    selectList.appendChild(option);
  }
});;

function GenerateSlides(){
  var pptx = new PptxGenJS();
  var slide = pptx.addNewSlide();
  slide.addText('Hello world!', { x:1.0, y:1.0, font_size:42, color:'00FF00' });
  pptx.save('Demo-Simple');
}


var authBtn = document.getElementById('create-slides-btn');
authBtn.addEventListener('click', function() {
  alert('Generate Slides!');
  GenerateSlides();
});
