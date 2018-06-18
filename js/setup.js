'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var NUMBER_OF_WIZARDS = 4;

var userDialog = document.querySelector('.setup');
var onDialogMousemove = userDialog.querySelector('.upload');


var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var wizards = [];
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getRandomItem = function (array) {
  var item = Math.floor(Math.random() * array.length);
  return array[item];
};

for (var j = 0; j < NUMBER_OF_WIZARDS; j++) {
  wizards[j] = {
    name: WIZARD_NAMES[getRandom(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandom(0, WIZARD_SURNAMES.length - 1)],
    coatColor: COAT_COLORS[getRandom(0, COAT_COLORS.length - 1)],
    eyesColor: EYES_COLORS[getRandom(0, EYES_COLORS.length - 1)],
  };
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupPlayer = setup.querySelector('.setup-player');
var element = document.querySelector('.setup-fireball-wrap');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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
    setColor('[name="coat-color"]', COAT_COLORS, target);
  } else if (target.classList.contains('wizard-eyes')) {
    setColor('[name="eyes-color"]', EYES_COLORS, target);
  } else if (target.classList.contains('setup-fireball')) {
    setColor('[name="fireball-color"]', FIREBALL_COLORS, element, true);
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !evt.target.matches('[name="username"]')) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  RIGHT_EDGE = document.body.offsetWidth - userDialog.offsetWidth / 2;
  BOTTOM_EDGE = document.body.offsetHeight - userDialog.offsetHeight / 2;
  document.addEventListener('keydown', onPopupEscPress);
  setupPlayer.addEventListener('click', onItemClick);
  star.addEventListener('mousedown', onStarMousemove);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupPlayer.removeEventListener('click', onItemClick);
  star.removeEventListener('mousedown', onStarMousemove);
  returnUserDialogPosition();
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

var TOP_EDGE = 0;
var LEFT_EDGE = userDialog.offsetWidth / 2;
var RIGHT_EDGE;
var BOTTOM_EDGE;
var beginX = userDialog.style.left;
var beginY = userDialog.style.left;

var returnUserDialogPosition = function () {
  userDialog.style.left = beginX;
  userDialog.style.top = beginY;
};

onDialogMousemove.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var currentX = userDialog.offsetLeft - shift.x;
    var currentY = userDialog.offsetTop - shift.y;


    if (currentY < TOP_EDGE) {
      currentY = 0;
    } else if (currentY > BOTTOM_EDGE) {
      currentY = BOTTOM_EDGE;
    }

    if (currentX < LEFT_EDGE) {
      currentX = 0;
    } else if (currentX > RIGHT_EDGE) {
      currentX = RIGHT_EDGE;
    }

    userDialog.style.top = currentY + 'px';
    userDialog.style.left = currentX + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        onDialogMousemove.removeEventListener('click', onClickPreventDefault);
      };
      onDialogMousemove.addEventListener('click', onClickPreventDefault);
    }

  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


var shopDialog = userDialog.querySelector('.setup-artifacts-cell');
var star = shopDialog.querySelector('img');
var playersBag = userDialog.querySelector('.setup-artifacts');
var playersCell = playersBag.querySelector('.setup-artifacts-cell');

var onStarMousemove = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var oldCoords = {
    x: star.offsetLeft,
    y: star.offsetTop
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    star.style.position = 'absolute';
    star.style.zIndex = '100';
    star.style.top = (star.offsetTop - shift.y) + 'px';
    star.style.left = (star.offsetLeft - shift.x) + 'px';

  };

  var onMouseUp = function (upEvt) {
    star.style.display = 'none';
    var elem = document.elementFromPoint(event.clientX, event.clientY);
    star.style.display = 'block';

    if (elem === playersCell) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          star.removeEventListener('click', onClickPreventDefault);
        };
        star.addEventListener('click', onClickPreventDefault);
      }
    } else {
      // star.style.top = oldCoords.y + 'px';
      // star.style.left = oldCoords.x + 'px';
      star.style.position = 'static';
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

};

// // var shopDialog = userDialog.querySelector('.setup-artifacts-shop');
// var cellShop = document.querySelector('.setup-artifacts');
// var draggedItem;

// shopDialog.addEventListener('dragstart', function (evt) {
//   if (evt.target.closest('img')) {
//     evt.dataTransfer.effectAllowed = 'move';
//     evt.dataTransfer.setData('text/plain', evt.target.getAttribute('alt'));
//     evt.dataTransfer.setDragImage(evt.target, 30, 25);
//     draggedItem = evt.target;
//   }
// });

// cellShop.addEventListener('dragover', function (evt) {
//   evt.preventDefault();
//   return false;
// });

// cellShop.addEventListener('drop', function (evt) {
//   evt.target.style.opacity = '1';
//   evt.target.appendChild(draggedItem);
//   if (evt.stopPropagation) {
//     evt.stopPropagation();
//   }
//   return false;
// });

// cellShop.addEventListener('dragenter', function (evt) {
//   evt.target.style.opacity = '1';
//   evt.preventDefault();
//   return true;
// });

// cellShop.addEventListener('dragleave', function (evt) {
//   evt.target.style.opacity = '0.5';
//   evt.preventDefault();
// });


