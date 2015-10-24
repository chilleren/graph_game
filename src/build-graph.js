var utils = require('./utils');

var GraphBuilder = function () {
  var LINK_COUNT = 3;

  this.buildGraph = function (nodeCount) {
    var nodes = buildNodes(nodeCount);
    return nodes;
  }

  function buildNodes (nodeCount) {
    var nodes = [];
    for (var i = 0; i < nodeCount; i++) {
      var newNodeId = i + 1;
      nodes.push(new Node(newNodeId));
    }
    return nodes;
  }

  function addLinks (nodes, linksPerNode) {
    for (var i = 0; i < nodes.length; i++) {
      var currentNode = nodes[i];
      for (var j = 0; j < LINK_COUNT; j++) {
        var randomNode = utils.pluck(nodes);
        currentNode.addLink(randomNode.id);
      }
    }
  }

};

function Node (id) {
  this.id = id;
  this.links = [];

  this.addLink = function (id) {
    this.links.push(id);
  }
}

module.exports = GraphBuilder;