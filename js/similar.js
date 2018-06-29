'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var wizardsLoaded = [];

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

  var updateWizards = function () {
    window.wizard.similarWizard(wizardsLoaded.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.wizard.onEyesChange = window.utils.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.wizard.onCoatChange = window.utils.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var successHandler = function (wizards) {
    wizardsLoaded = wizards;
    updateWizards();
  };

  window.backend.loadFunction(successHandler, window.utils.error);
})();
