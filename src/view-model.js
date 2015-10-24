var utils = require('./utils');

module.exports = function () {

  this.initialize = function (options) {
    console.log('viewModel initializing');
    this.nodeCount = options.nodeCount || 80;
    this.nodes = utils.randomVertices(options.width, options.height, this.nodeCount);
    this.edges = utils.getEdges(this.nodes, 'position');

    console.log('nodes', this.nodes);
  }
};