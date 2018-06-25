'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_UPLOAD = 'https://js.dump.academy/code-and-magick';
  var TIMEOUT = 1000;
  var SUCCESS_STATUS = 200;


  var backendFunction = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    return xhr;
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = backendFunction(onSuccess, onError);

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    var xhr = backendFunction(onSuccess, onError);

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

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

  window.backend = {
    loadFunction: load,
    uploadFunction: upload,
    error: errorHandler
  };

})();
