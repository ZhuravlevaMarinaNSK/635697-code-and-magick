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
      var randomIndex = getRandom(1, wizards.length);
      var randomWizard = wizards[randomIndex];
      wizards.splice(randomIndex, 1);

      fragment.appendChild(renderWizard(randomWizard));
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

  var onErrorEsq = function (evt) {
    var error = document.querySelector('.error-message');
    if (evt.keyCode === window.utils.escKeycode) {
      error.parentNode.removeChild(error);
    }
  };

  document.addEventListener('keydown', onErrorEsq);
  window.backend.loadFunction(successHandler, window.backend.error);
})();
