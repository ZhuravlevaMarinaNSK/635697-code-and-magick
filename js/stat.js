'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_RADIUS = 30;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var GISTO_GAP = 50;
var GISTO_GAP_Y = 35;
var FONT_SIZE = 16;
var BAR_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - CLOUD_Y - FONT_SIZE * 2 - GISTO_GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(x, CLOUD_RADIUS);
  ctx.bezierCurveTo(x, 0, (x + CLOUD_WIDTH) / 2 + CLOUD_RADIUS * 1.5, 0, (x + CLOUD_WIDTH) / 2 + CLOUD_RADIUS * 1.5, CLOUD_RADIUS);
  ctx.bezierCurveTo((x + CLOUD_WIDTH) / 2 + CLOUD_RADIUS * 1.5, 0, x + CLOUD_WIDTH - CLOUD_RADIUS, 0, x + CLOUD_WIDTH - CLOUD_RADIUS, CLOUD_RADIUS);
  ctx.bezierCurveTo(x + CLOUD_WIDTH, 0, x + CLOUD_WIDTH, CLOUD_HEIGHT / 2, x + CLOUD_WIDTH - CLOUD_RADIUS, CLOUD_HEIGHT / 2);
  ctx.bezierCurveTo(x + CLOUD_WIDTH, CLOUD_HEIGHT / 2, x + CLOUD_WIDTH, CLOUD_HEIGHT, x + CLOUD_WIDTH + CLOUD_RADIUS, CLOUD_HEIGHT);
  ctx.bezierCurveTo(x + CLOUD_WIDTH + CLOUD_RADIUS, CLOUD_HEIGHT + CLOUD_RADIUS, (x + CLOUD_WIDTH) / 2 + CLOUD_RADIUS * 1.5, CLOUD_HEIGHT + CLOUD_RADIUS, (x + CLOUD_WIDTH) / 2 + CLOUD_RADIUS * 1.5, CLOUD_HEIGHT);
  ctx.bezierCurveTo((x + CLOUD_WIDTH) / 2 + CLOUD_RADIUS * 1.5, CLOUD_HEIGHT + CLOUD_RADIUS, x - CLOUD_RADIUS, CLOUD_HEIGHT + CLOUD_RADIUS, x - CLOUD_RADIUS, CLOUD_HEIGHT);
  ctx.bezierCurveTo(x, CLOUD_HEIGHT, x, CLOUD_HEIGHT / 2, x + CLOUD_RADIUS, CLOUD_HEIGHT / 2);
  ctx.bezierCurveTo(x, CLOUD_HEIGHT / 2, x, CLOUD_RADIUS, x + CLOUD_RADIUS, CLOUD_RADIUS);
  // ctx.lineTo(x + CLOUD_WIDTH - CLOUD_RADIUS, y);
  // ctx.arcTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH, y + CLOUD_RADIUS, CLOUD_RADIUS);
  // ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - CLOUD_RADIUS);
  // ctx.arcTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x + CLOUD_WIDTH - CLOUD_RADIUS, y + CLOUD_HEIGHT, CLOUD_RADIUS);
  // ctx.lineTo(x + CLOUD_RADIUS, y + CLOUD_HEIGHT);
  // ctx.arcTo(x, y + CLOUD_HEIGHT, x, y + CLOUD_HEIGHT - CLOUD_RADIUS, CLOUD_RADIUS);
  // ctx.lineTo(x, y + CLOUD_RADIUS);
  // ctx.arcTo(x, y, x + CLOUD_RADIUS, y, CLOUD_RADIUS);
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = 'FONT_SIZE PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_WIDTH / 2 + FONT_SIZE, CLOUD_Y + FONT_SIZE);
  ctx.fillText('Список результатов:', CLOUD_WIDTH / 2, CLOUD_Y + FONT_SIZE * 2);

  var maxTime = getMaxElement(times);

  var createGisto = function (number, hours) {
    ctx.fillStyle = PLAYER_COLOR;
    ctx.fillRect(CLOUD_X + GISTO_GAP + (GISTO_GAP + BAR_WIDTH) * number, CLOUD_Y + GISTO_GAP + FONT_SIZE, BAR_WIDTH, barHeight);

    ctx.fillStyle = '#fff';
    ctx.fillRect(CLOUD_X + GISTO_GAP + (GISTO_GAP + BAR_WIDTH) * number, CLOUD_Y + GISTO_GAP + FONT_SIZE, BAR_WIDTH, (barHeight - (barHeight * hours[number]) / maxTime));
    ctx.fillStyle = '#000';
    ctx.fillText(players[number], CLOUD_X + GISTO_GAP + (GISTO_GAP + BAR_WIDTH) * number, CLOUD_Y + GISTO_GAP_Y * 2 + barHeight);
    ctx.fillText(Math.round(hours[i]), CLOUD_X + GISTO_GAP + (GISTO_GAP + BAR_WIDTH) * number, CLOUD_Y + GISTO_GAP_Y + FONT_SIZE + barHeight - (barHeight * hours[number]) / maxTime);
  };

  for (var i = 0; i < players.length; i++) {
    var randomSaturate = (Math.random() * 100).toString();
    var PLAYER_COLOR;
    if (players[i] === 'Вы') {
      PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
    } else {
      PLAYER_COLOR = 'hsl(230, ' + randomSaturate + '%, 36%)';
    }
    createGisto(i, times);
  }
};


