var ViewModel = require('./view-model');
var Presenter = require("./presenter");
var config = require('./config');
var $ = require('jquery');

module.exports = function () {

  this.initialize = function () {
    this.canvas = document.getElementById('game-canvas');
    this.canvas.addEventListener('click', this.canvasClick.bind(this), false);
    this.scale = config.scale;

    this.viewModel = new ViewModel();
    this.viewModel.initialize({width: this.canvas.width / this.scale, height: this.canvas.height / this.scale});

    this.presenter = new Presenter();
    this.presenter.initialize({
      viewModel: this.viewModel,
      canvas: this.canvas,
      scale: this.scale
    });

    this.presenter.render();
  },

  this.offset = function (coordinate) {
    return coordinate * this.scale + this.scale / 2;
  }

  this.canvasClick = function (ev) {
    var x = event.pageX - this.canvas.offsetLeft;
    var y = event.pageY - this.canvas.offsetTop;
    this.viewModel.deselectAll();
    var node = this.getNodeByCoordinates(x, y);
    if (node) {
      this.viewModel.selectById(node.id);
      Object.keys(node.neighbors).forEach(function (nodeId) {
        node.neighbors[nodeId].selected = true;
      });
    }
    this.presenter.render();
    if (node)  {
      this.presenter.drawEdges(node.edges, {lineWidth: 5, lineColor: 'black'});
    }
  }

  this.getNodeByCoordinates = function (x, y) {
    var chosenNode = null;
    var that = this;
    this.viewModel.nodes.forEach(function (currentNode) {
      var centerX = that.offset(currentNode.position[0]);
      var centerY = that.offset(currentNode.position[1]);
      if (Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) <= Math.pow(currentNode.radius, 2)) {
        chosenNode = currentNode;
      }
    });
    return chosenNode;
  }

}