'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var NUMBER_OF_WIZARDS = 4;

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; padding: 50px 10px; margin: 0 auto; text-align: center; vertical-align: middle; background-color: #da641a; border: 15px dashed white';
    node.style.position = 'absolute';
    node.style.left = '190px';
    node.style.right = '150px';
    node.style.top = '100px';
    node.style.bottom = '300px';
    node.style.fontSize = '30px';
    node.classList.add('error-message');

    node.textContent = 'Что-то пошло не так ¯\_(ツ)_/¯ ' + errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.utils = {
    escKeycode: ESC_KEYCODE,
    enterKeycode: ENTER_KEYCODE,
    wizarsNames: WIZARD_NAMES,
    wizardsSurnames: WIZARD_SURNAMES,
    coatColors: COAT_COLORS,
    eyesColors: EYES_COLORS,
    fireballColors: FIREBALL_COLORS,
    numberOfWizards: NUMBER_OF_WIZARDS,
    error: errorHandler,
    getShuffle: function (array) {
      var counter = array.length;
      while (counter > 0) {
        var index = Math.floor(Math.random() * counter);
        counter--;
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
    }
  };
})();
