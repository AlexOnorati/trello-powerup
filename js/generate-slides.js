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
            console.log(b64DecodeUnicode(attachments[j].url));
            slide.addImage({x:9.3, y:4.9, w:0.5, h:0.5, data:"image/png;base64,"+getImage(attachments[j].url)});
          }
        }
      }
        pptx.save(selectList.options[selectList.selectedIndex].innerHTML);
    }
  );


}

function getImage(oldURL) {
  // Simulate a call to Dropbox or other service that can
// return an image as an ArrayBuffer.
var xhr = new XMLHttpRequest();

// Use JSFiddle logo as a sample image to avoid complicating
// this example with cross-domain issues.
xhr.open( "GET", oldURL, true );

// Ask for the result as an ArrayBuffer.
xhr.responseType = "arraybuffer";

xhr.onload = function( e ) {
  // Obtain a blob: URL for the image data.
  var arrayBufferView = new Uint8Array( this.response );
  var blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
  var urlCreator = window.URL || window.webkitURL;
  var imageUrl = urlCreator.createObjectURL( blob );
  console.log(imageUrl);
  return imageUrl;
};

xhr.send();
}


var authBtn = document.getElementById('create-slides-btn');
authBtn.addEventListener('click', function() {
  GenerateSlides();
});
