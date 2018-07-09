'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var onDialogMousemove = userDialog.querySelector('.upload');

  var Rect = function (left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  };

  var Coordinate = function (x, y, constraints) {
    this.x = x;
    this.y = y;
    this._constraints = constraints;
  };

  Coordinate.prototype.setX = function (x) {
    if (x <= this._constraints.left) {
      this.x = this._constraints.left;
    } else if (x >= this._constraints.right) {
      this.x = this._constraints.right;
    }
  };

  Coordinate.prototype.setY = function (y) {
    if (y <= this._constraints.top) {
      this.y = this._constraints.top;
    } else if (y >= this._constraints.bottom) {
      this.y = this._constraints.bottom;
    }
  };

  onDialogMousemove.addEventListener('mousedown', function (evt) {
    var TOP_EDGE = 0;
    var rightEdge = document.body.offsetWidth - userDialog.offsetWidth / 2;
    var leftEdge = userDialog.offsetWidth / 2;
    var bottomEdge = window.innerHeight - userDialog.offsetHeight;
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

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;
      var currentCoords = new Coordinate(userDialog.offsetLeft - shift.x, userDialog.offsetTop - shift.y, new Rect(leftEdge, TOP_EDGE, rightEdge, bottomEdge));

      currentCoords.setX(currentCoords.x);
      currentCoords.setY(currentCoords.y);

      userDialog.style.left = currentCoords.x + 'px';
      userDialog.style.top = currentCoords.y + 'px';
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
  var startCoords = {};

  userDialog.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    startCoords = {
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
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
  });

  var beginX = userDialog.style.left;
  var beginY = userDialog.style.left;

  window.returnUserDialogPosition = function () {
    userDialog.style.left = beginX;
    userDialog.style.top = beginY;
  };

})();
