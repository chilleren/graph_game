var _ = require('underscore');

var defaults = {
  radius: 5,
  lineColor: 'black',
  fillColor: 'blue',
  lineWidth: 3
};

module.exports = function () {

  this.initialize = function (options) {
    console.log('presenter initializing');
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width; //px
    this.height = this.canvas.height; //px
    this.scale = options.scale; //px
    this.viewModel = options.viewModel;
  }

  this.render = function () {
    console.log("rendering");
    this.drawGrid();
    this.drawNodes(this.viewModel.nodes);
    this.drawEdges(this.viewModel.edges);
  }

  this.offset = function (coordinate) {
    return coordinate * this.scale + this.scale / 2;
  }

  this.drawNodes = function (nodes) {
    for (var i = 0; i < nodes.length; i++) {
      var x = nodes[i].position[0];
      var y = nodes[i].position[1];
      this.drawCircle(x, y, {radius: 10});
    }
  }

  this.drawEdges = function (edges) {
    var that = this;
    edges.forEach(function (nodePair) {
      that.drawEdge(nodePair, { lineWidth: 1, lineColor: 'red' });
    });
  }

  this.drawGrid = function () {
    this.ctx.strokeStyle = '#ddd';
    this.ctx.lineWidth = 1;
    console.log('drawing grid');

    for (var x = 0; x < this.width; x += this.scale) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.closePath();
      this.ctx.stroke();
    }

    for (var y = 0; y < this.height; y += this.scale) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }

  this.drawEdge = function (nodePair, options) {
    options = options || {};
    _.defaults(options, defaults);

    this.ctx.strokeStyle = options.lineColor;
    this.ctx.lineWidth = options.lineWidth;
    this.ctx.beginPath();

    this.ctx.moveTo(
      this.offset(nodePair[0]["position"][0]),
      this.offset(nodePair[0]["position"][1])
    );

    this.ctx.lineTo(
      this.offset(nodePair[1]["position"][0]),
      this.offset(nodePair[1]["position"][1])
    );

    this.ctx.closePath();
    this.ctx.stroke();

  }

  this.drawCircle = function (x, y, options) {
    options = options || {};
    _.defaults(options, defaults);

    var centerX = this.offset(x);
    var centerY = this.offset(y);

    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, options.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = options.fillColor;
    this.ctx.fill();
    this.ctx.lineWidth = options.lineWidth;
    this.ctx.strokeStyle = options.lineColor;
    this.ctx.stroke();
  }

};