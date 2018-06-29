'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var setupPlayer = userDialog.querySelector('.setup-player');
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  var similarWizard = function (data) {
    similarListElement.innerHTML = '';
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
    return similarWizard;
  };


  var element = document.querySelector('.setup-fireball-wrap');
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

  var wizard = {
    onEyesChange: function (color) {
      return color;
    },
    onCoatChange: function (color) {
      return color;
    }
  };

  var setColor = function (identificator, colorArray, el, isFireball) {
    var color = window.utils.getRandomItem(colorArray);
    setupPlayer.querySelector(identificator).value = color;
    if (!isFireball) {
      el.style.fill = color;
    } else {
      el.style.backgroundColor = color;
    }
    if (el.classList.contains('wizard-coat')) {
      wizard.onCoatChange(color);
    } else if (el.classList.contains('wizard-eyes')) {
      wizard.onEyesChange(color);
    }
  };

  setupPlayer.addEventListener('click', onItemClick);

  var onErrorEsq = function (evt) {
    var error = document.querySelector('.error-message');
    if (evt.keyCode === window.utils.escKeycode) {
      error.parentNode.removeChild(error);
    }
  };

  document.addEventListener('keydown', onErrorEsq);

  window.wizard = {
    similarWizard: similarWizard,
    wizard: wizard
  };

})();
