/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function(){
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
});

function GenerateSlides(){
  var pptx = new PptxGenJS();
  var slide = pptx.addNewSlide();
  slide.addText('Hello world!', { x:1.0, y:1.0, font_size:42, color:'00FF00' });
  pptx.save('Demo-Simple');
}


var slideBtn = document.getElementById('create-slides-btn');
slideBtn.addEventListener('click', function() {
  alert('Generate Slides!');
  GenerateSlides();
  alert('Slides have been generated');
});
