'use strict';

(function () {
  var coatColor;
  var eyesColor;

  var setup = document.querySelector('.setup');
  var setupPlayer = setup.querySelector('.setup-player');

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
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
  };

  var getItemsRank = function (right, left) {
    var rankDiff = getRank(right) - getRank(left);
    if (rankDiff === 0) {
      rankDiff = namesComparator(left.name, right.name);
    }
    return rankDiff;
  };

  window.similar = {
    setColor: setColor,
    getItemsRank: getItemsRank,
    eyesColor: eyesColor,
    coatColor: coatColor
  };
})();
