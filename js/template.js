/* global TrelloPowerUp */

var WHITE_ICON = './images/logo.png';
var GRAY_ICON = './images/icon-gray.svg';

TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    return [{
      icon: WHITE_ICON,
      text: 'Generate',
        callback: function(t){
          return t.popup({
            title: "Generate Slides",
            url: './board-button-popup.html'
          });
        }
    }];
  },
  'card-badges': function(t, card) {
    return t.card('name').then(function(promiseResult){
      var name = promiseResult.name;
      return t.get('card','shared','toggle','T').then(function(promiseGetResult){
        return {
          title: 'Detail Badge',
          text:  promiseGetResult == 'F'?'exclude' : 'include',
          icon: './images/logo.png',
          refresh: 10
        };
      });
    });
  },
  'card-buttons':function(t, options){
    return t.get('card', 'shared','toggle', 'T').then(function(promiseResult){
      return [{
        icon: './images/logo.png',
        text:  promiseResult == 'F'?'exclude' : 'include',
        callback: function(t){
          if(promiseResult == 'T'){
            t.set('card', 'shared','toggle', 'F');
          }else{
            t.set('card', 'shared','toggle', 'T');
          }
        }
      }];
    });
  }
});
