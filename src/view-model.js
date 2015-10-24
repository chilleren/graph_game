var utils = require('./utils');
var config = require('./config');

module.exports = function () {

  this.initialize = function (options) {
    console.log('viewModel initializing');
    this.nodeCount = options.nodeCount || 80;
    this.nodes = utils.randomVertices(options.width, options.height, this.nodeCount);
    this.edges = utils.getEdges(this.nodes, 'position');

    this.nodes.forEach(this.addPropsToNode);

    utils.pluck(this.nodes).selected = true;

    console.log('nodes', this.nodes);
  }

  this.selectRandom = function () {
    this.deselectAll();
    utils.pluck(this.nodes).selected = true;
  },

  this.selectById = function (id) {
    this.deselectAll();
    this.nodes.forEach(function (node) {
      if (node.id === id) {
        node.selected = true;
      }
    })
  },

  this.deselectAll = function () {
    this.nodes.forEach(function (node) {
      node.selected = false;
    });
  }

  this.addPropsToNode = function (node) {
      node.radius = config.nodeRadius;
  }
};