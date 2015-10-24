var utils = require('./utils');
var config = require('./config');

module.exports = function () {

  this.initialize = function (options) {
    console.log('viewModel initializing');
    this.nodeCount = config.nodeCount;
    this.nodes = utils.randomVertices(options.width, options.height, this.nodeCount);
    this.edges = utils.getEdges(this.nodes, 'position');

    this.populateNeighbors();


    this.nodes.forEach(this.addPropsToNode);

    utils.pluck(this.nodes).selected = true;

    console.log('nodes', this.nodes);
  }

  this.populateNeighbors = function () {
    this.edges.forEach(function (edge) {
      if (!edge[0].neighbors) {
        edge[0].neighbors = {};
      }
      if (!edge[0].edges) {
        edge[0].edges = [];
      }
      edge[0].neighbors[edge[1].id] = edge[1];
      edge[0].edges.push(edge);

      if (!edge[1].neighbors) {
        edge[1].neighbors = {};
      }
      if (!edge[1].edges) {
        edge[1].edges = [];
      }
      edge[1].neighbors[edge[0].id] = edge[0];
      edge[1].edges.push(edge);
    })
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