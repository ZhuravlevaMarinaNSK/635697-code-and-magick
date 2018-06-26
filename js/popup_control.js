'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupPlayer = setup.querySelector('.setup-player');
  var userNameInput = setup.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.escKeycode && !evt.target.matches('[name="username"]')) {
      closePopup();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupPlayer.addEventListener('click', window.onItemClick);
    setupOpen.removeEventListener('keydown', onSetupKeydown);
    setupOpen.removeEventListener('click', onSetupClick);
    setupClose.addEventListener('click', onSetupCloseClick);
    setupClose.addEventListener('keydown', onSetupCloseKeydown);
    userNameInput.addEventListener('invalid', window.inputName.onUserNameInputInvalid);
    userNameInput.addEventListener('input', window.inputName.onUserNameInput);
    form.addEventListener('submit', onSubmitClick);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupPlayer.removeEventListener('click', window.onItemClick);
    window.returnUserDialogPosition();
    setupOpen.addEventListener('keydown', onSetupKeydown);
    setupOpen.addEventListener('click', onSetupClick);
    setupClose.removeEventListener('click', onSetupCloseClick);
    setupClose.removeEventListener('keydown', onSetupCloseKeydown);
    userNameInput.removeEventListener('invalid', window.inputName.onUserNameInputInvalid);
    userNameInput.removeEventListener('input', window.inputName.onUserNameInput);
    form.removeEventListener('submit', onSubmitClick);
  };

  var onSetupClick = function () {
    openPopup();
  };

  var onSetupKeydown = function (evt) {
    if (evt.keyCode === window.utils.enterKeycode) {
      openPopup();
    }
  };

  setupOpen.addEventListener('keydown', onSetupKeydown);
  setupOpen.addEventListener('click', onSetupClick);

  var onSetupCloseClick = function () {
    closePopup();
  };

  var onSetupCloseKeydown = function (evt) {
    if (evt.keyCode === window.utils.enterKeycode) {
      closePopup();
    }
  };

  var form = setup.querySelector('.setup-wizard-form');

  var onSubmitClick = function (evt) {
    window.backend.uploadFunction(new FormData(form), closePopup, window.utils.error);
    evt.preventDefault();
  };
})();
