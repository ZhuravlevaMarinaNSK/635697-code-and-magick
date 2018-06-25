'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  // var wizards = [];
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  var getRandomItem = function (array) {
    var item = Math.floor(Math.random() * array.length);
    return array[item];
  };

  // for (var j = 0; j < window.utils.numberOfWizards; j++) {
  //   wizards[j] = {
  //     name: window.utils.wizarsNames[getRandom(0, window.utils.wizarsNames.length - 1)] + ' ' + window.utils.wizardsSurnames[getRandom(0, window.utils.wizardsSurnames.length - 1)],
  //     coatColor: window.utils.coatColors[getRandom(0, window.utils.coatColors.length - 1)],
  //     eyesColor: window.utils.eyesColors[getRandom(0, window.utils.eyesColors.length - 1)],
  //   };
  // }

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  var successHandler = function (wizards) {
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[getRandom(0, 16)]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var setup = document.querySelector('.setup');
  var setupPlayer = setup.querySelector('.setup-player');
  var element = document.querySelector('.setup-fireball-wrap');

  var setColor = function (identificator, colorArray, el, isFireball) {
    var color = getRandomItem(colorArray);
    setupPlayer.querySelector(identificator).value = color;
    if (!isFireball) {
      el.style.fill = color;
    } else {
      el.style.backgroundColor = color;
    }
  };

  var onItemClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('wizard-coat')) {
      setColor('[name="coat-color"]', window.utils.coatColors, target);
    } else if (target.classList.contains('wizard-eyes')) {
      setColor('[name="eyes-color"]', window.utils.eyesColors, target);
    } else if (target.classList.contains('setup-fireball')) {
      setColor('[name="fireball-color"]', window.utils.fireballColors, element, true);
    }
  };

  window.onItemClick = onItemClick;

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

  var onErrorEsq = function (evt) {
    var error = document.querySelector('.error-message');
    if (evt.keyCode === window.utils.escKeycode) {
      error.parentNode.removeChild(error);
    }
  };

  document.addEventListener('keydown', onErrorEsq);
  window.load(successHandler, errorHandler);
})();
