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
            console.log(attachments[j].url);
            toDataUrl(attachments[j].url, function(base64Img) {
              slide.addImage({x:9.3, y:4.9, w:0.5, h:0.5, data:"image/png;base64,587b108be4473ecc6b0eb369/5890514317a5d48b97b26dd5/81f0137bbcc4e5e0eb94ae3ad8b421ad"});          });

          }
        }
      }
        pptx.save(selectList.options[selectList.selectedIndex].innerHTML);
    }
  );


}

function getImage(oldURL) {

  // Obtain a blob: URL for the image data.
  var arrayBufferView = new Uint8Array();
  var blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
  var urlCreator = window.URL || window.webkitURL;
  var imageUrl = urlCreator.createObjectURL( blob );
  console.log(blob);
  return imageUrl;
}

function toDataUrl(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}


var authBtn = document.getElementById('create-slides-btn');
authBtn.addEventListener('click', function() {
  GenerateSlides();
});
