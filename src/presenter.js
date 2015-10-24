var _ = require('underscore');
var config = require('./config');

var defaults = {
  radius: config.nodeRadius,
  lineColor: 'black',
  fillColor: 'blue',
  lineWidth: 3
};

module.exports = function () {

  this.initialize = function (options) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.scale = options.scale; //px
    this.viewModel = options.viewModel;
  }

  this.render = function () {
    this.clearCanvas();
    this.drawGrid();
    this.drawEdges(this.viewModel.edges);
    this.drawNodes(this.viewModel.nodes);
  }

  this.clearCanvas = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  this.offset = function (coordinate) {
    return coordinate * this.scale + this.scale / 2;
  }

  this.drawNodes = function (nodes) {
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i]
      var x = node.position[0];
      var y = node.position[1];
      if (node.selected) {
        this.drawCircle(x, y, {radius: node.radius + 5, fillColor: 'yellow', lineColor: 'orange'});
      }
      this.drawCircle(x, y, {radius: node.radius});
    }
  }

  this.drawEdges = function (edges, options) {
    options = options || {};
    options.lineWidth = options.lineWidth || 1;
    options.lineColor = options.lineColor || 'red';
    _.defaults(options, defaults);
    var that = this;
    edges.forEach(function (nodePair) {
      that.drawEdge(nodePair, { lineWidth: options.lineWidth, lineColor: options.lineColor });
    });
  }

  this.drawGrid = function () {
    this.ctx.strokeStyle = '#ddd';
    this.ctx.lineWidth = 1;
    console.log('drawing grid');

    for (var x = 0; x < this.canvas.width; x += this.scale) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.closePath();
      this.ctx.stroke();
    }

    for (var y = 0; y < this.canvas.height; y += this.scale) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
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