'use strict';

(function () {
  var TOP_EDGE = 0;
  var userDialog = document.querySelector('.setup');
  var onDialogMousemove = userDialog.querySelector('.upload');
  var leftEdge = userDialog.offsetWidth * 2;

  onDialogMousemove.addEventListener('mousedown', function (evt) {
    var rightEdge = document.body.offsetWidth - userDialog.offsetWidth / 2;
    var bottomEdge = document.body.offsetHeight - userDialog.offsetHeight / 2;
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
      } else if (currentY > bottomEdge) {
        currentY = bottomEdge;
      }

      if (currentX < leftEdge) {
        currentX = 0;
      } else if (currentX > rightEdge) {
        currentX = rightEdge;
      }

      userDialog.style.top = currentY + 'px';
      userDialog.style.left = currentX + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (event) {
          event.preventDefault();
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

  star.addEventListener('mousemov', function (evt) {
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
          var onClickPreventDefault = function (event) {
            event.preventDefault();
            star.removeEventListener('click', onClickPreventDefault);
          };
          star.addEventListener('click', onClickPreventDefault);
        }
      } else {
        star.style.position = 'static';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  var beginX = userDialog.style.left;
  var beginY = userDialog.style.left;

  window.returnUserDialogPosition = function () {
    userDialog.style.left = beginX;
    userDialog.style.top = beginY;
  };
})();
