var ViewModel = require('./view-model');
var Presenter = require("./presenter");

module.exports = function () {

  this.initialize = function () {
    var canvas = document.getElementById('game-canvas');
    this.scale = 40; //px

    console.log('controller initializing');

    this.viewModel = new ViewModel();
    this.viewModel.initialize({width: canvas.width / this.scale, height: canvas.height / this.scale});

    this.presenter = new Presenter();
    this.presenter.initialize({
      viewModel: this.viewModel,
      canvas: canvas,
      scale: this.scale
    });

    this.presenter.render();
  }

}