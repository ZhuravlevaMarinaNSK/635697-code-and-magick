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


  var updateWizards = function () {
    similarWizard(wizardsLoaded.sort(function (left, right) {
      window.similar.getItemsRank(right, left);
    }));
  };

  var element = document.querySelector('.setup-fireball-wrap');
  var onItemClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('wizard-coat')) {
      window.similar.setColor('[name="coat-color"]', window.utils.coatColors, target);
      window.similar.coatColor = setupPlayer.querySelector('[name="coat-color"]').value;
      updateWizards();
    } else if (target.classList.contains('wizard-eyes')) {
      window.similar.setColor('[name="eyes-color"]', window.utils.eyesColors, target);
      window.similar.eyesColor = setupPlayer.querySelector('[name="eyes-color"]').value;
      updateWizards();
    } else if (target.classList.contains('setup-fireball')) {
      window.similar.setColor('[name="fireball-color"]', window.utils.fireballColors, element, true);
    }
  };

  var wizardsLoaded = [];
  setupPlayer.addEventListener('click', onItemClick);

  var successHandler = function (wizards) {
    wizardsLoaded = wizards;
    updateWizards();
  };

  var onErrorEsq = function (evt) {
    var error = document.querySelector('.error-message');
    if (evt.keyCode === window.utils.escKeycode) {
      error.parentNode.removeChild(error);
    }
  };

  document.addEventListener('keydown', onErrorEsq);

  window.wizard = {
    successHandler: successHandler
  };

})();
