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
  t.cards('name', 'desc', 'idList', 'attachments').then(
    function(promiseResult){
      for(let i = 0; i < promiseResult.length; i++){
        if(promiseResult[i].idList == selectList.options[selectList.selectedIndex].value){
          var slide = pptx.addNewSlide();
          slide.addText(promiseResult[i].name, { x:1.0, y:1.0, font_size:42, color:'000000' });
          slide.addText(promiseResult[i].desc, { x:1.0, y:2.0, font_size:24, color:'000000' });
          var attachments = promiseResult[i].attachments;

          for(let j = 0; j < attachments.length; j++){
            console.log(attachments[j]);
            slide.addImage({x:9.3, y:4.9, w:0.5, h:0.5, data:"image/png;base64,"+b64DecodeUnicode(attachments[j].url)});
          }
        }
      }
        pptx.save(selectList.options[selectList.selectedIndex].innerHTML);
    }
  );


}

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(window.atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


var authBtn = document.getElementById('create-slides-btn');
authBtn.addEventListener('click', function() {
  GenerateSlides();
});
