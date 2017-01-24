/* global TrelloPowerUp */

var WHITE_ICON = './images/logo.png';
var GRAY_ICON = './images/icon-gray.svg';

var parkMap = {
  acad: 'Acadia National Park',
  arch: 'Arches National Park',
  badl: 'Badlands National Park',
  brca: 'Bryce Canyon National Park',
  crla: 'Crater Lake National Park',
  dena: 'Denali National Park',
  glac: 'Glacier National Park',
  grca: 'Grand Canyon National Park',
  grte: 'Grand Teton National Park',
  olym: 'Olympic National Park',
  yell: 'Yellowstone National Park',
  yose: 'Yosemite National Park',
  zion: 'Zion National Park'
};

var getBadges = function(t){
  return t.card('name')
  .get('name')
  .then(function(cardName){
    var badgeColor;
    var icon = GRAY_ICON;
    var lowercaseName = cardName.toLowerCase();
    if(lowercaseName.indexOf('green') > -1){
      badgeColor = 'green';
      icon = WHITE_ICON;
    } else if(lowercaseName.indexOf('yellow') > -1){
      badgeColor = 'yellow';
      icon = WHITE_ICON;
    } else if(lowercaseName.indexOf('red') > -1){
      badgeColor = 'red';
      icon = WHITE_ICON;
    }

    if(lowercaseName.indexOf('dynamic') > -1){
      // dynamic badges can have their function rerun after a set number
      // of seconds defined by refresh. Minimum of 10 seconds.
      return [{
        dynamic: function(){
          return {
            title: 'Detail Badge', // for detail badges only
            text: 'Dynamic ' + (Math.random() * 100).toFixed(0).toString(),
            icon: icon, // for card front badges only
            color: badgeColor,
            refresh: 10
          }
        }
      }]
    }

    if(lowercaseName.indexOf('static') > -1){
      // return an array of badge objects
      return [{
        title: 'Detail Badge', // for detail badges only
        text: 'Static',
        icon: icon, // for card front badges only
        color: badgeColor
      }];
    } else {
      return [];
    }
  })
};

var formatNPSUrl = function(t, url){
  if(!/^https?:\/\/www\.nps\.gov\/[a-z]{4}\//.test(url)){
    return null;
  }
  var parkShort = /^https?:\/\/www\.nps\.gov\/([a-z]{4})\//.exec(url)[1];
  if(parkShort && parkMap[parkShort]){
    return parkMap[parkShort];
  } else{
    return null;
  }
};

var boardButtonCallback = function(t){
  alert('Slides!');
  /*return t.popup({
    title: 'Popup List Example',
    items: [
      {
        text: 'Open Overlay',
        callback: function(t){
          return t.overlay({
            url: './overlay.html',
            args: { rand: (Math.random() * 100).toFixed(0) }
          })
          .then(function(){
            return t.closePopup();
          });
        }
      },
      {
        text: 'Open Board Bar',
        callback: function(t){
          return t.boardBar({
            url: './board-bar.html',
            height: 200
          })
          .then(function(){
            return t.closePopup();
          });
        }
      }
    ]
  });*/
};
var cardButtonCallback = function(t){

    return {
      text: 'Include in slides?',
      callback: function(t){
        return t.set('card','shared','toggle',!t.get('toggle'))
        .then(function(){
          return t.closePopup();
        })
      }
    };

  return t.popup({
    title: 'Popup Search Example',
    items: items,
    search: {
      count: 5,
      placeholder: 'Search National Parks',
      empty: 'No parks found'
    }
  });
};

TrelloPowerUp.initialize({

  'board-buttons': function(t, options){
    return [{
      icon: WHITE_ICON,
      text: 'Generate',
        callback: function(t){
          return t.popup({
            icon: WHITE_ICON,
            text: 'Generate',
            height: 200,
            args: { example: 1042 }
          });

        }

    }];
  },
  'card-badges': function(t, card) {
    return t.card('name').then(function(promiseResult){
      var name = promiseResult.name;
      return t.get('card','shared','toggle','T').then(function(promiseGetResult){
        console.log(promiseGetResult);
        return {
          title: 'Detail Badge', // for detail badges only
          text:  name,

          //t.get('toggle') == null || t.get('toggle') ?'exclude' : 'include',
          icon: './images/logo.png', // for card front badges only

          refresh: 10
        };
      })
    });
  // return {
  //   dynamic: function(){
  //     var name;
  //     console.log(t.card('name').then(function(promiseResult){
  //       return promiseResult.name;
  //     }));
  //     return {
  //       title: 'Detail Badge', // for detail badges only
  //       text:  'test',
  //
  //       //t.get('toggle') == null || t.get('toggle') ?'exclude' : 'include',
  //       icon: './images/logo.png', // for card front badges only
  //
  //       refresh: 10
  //     }
  //}
  //};
},
'card-buttons':function(t, options){
  //t.get('card', 'shared','toggle', 'T').then(function(promiseResult){
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
    //});
  }


});
