/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

var slideBtn = document.getElementById('create-slides-btn');
slideBtn.addEventListener('click', function() {
  var pptx = new PptxGenJS();
  var slide = pptx.addNewSlide();
  slide.addText('Hello world!', { x:1.0, y:1.0, font_size:42, color:'00FF00' });
  pptx.save('Demo-Simple');
});
