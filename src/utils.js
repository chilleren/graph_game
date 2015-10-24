var Delaunay = require("delaunay-fast");

var utils = {

  //random integer within range (inclusive). if one argument, that arg is max and min is 1
  randomBetween: function (min, max) {
    if (arguments.length === 1) {
      min = 1;
      max = arguments[0];
    }
    return Math.floor(Math.random() * max) + min;
  },

  //select a random element from  @array
  pluck: function (array) {
    return array[utils.randomIndex(array)];
  },

  //return a random index of @array
  randomIndex: function (array) {
    return utils.randomBetween(0, array.length - 1);
  },

  //normalizes the vertices of a bunch of triangles
  //list comes in as an array of triplets, e.g. [1, 2, 3]
  //returns it as array of objects with properties a, b, c. e.g. [{a: 3, b: 2, c: 1}]
  normalizeDelaunayTriangles: function (array) {
    var newArray = [];

    for(var i = array.length; i; ) {
      var newTriangle = {};
      --i;
      newTriangle.a = array[i];
      --i;
      newTriangle.b = array[i];
      --i;
      newTriangle.c = array[i];
      newArray.push(newTriangle);
    }

    return newArray;
  },

  getEdges: function (vertices, coordFieldName) {
    var mesh = Delaunay.triangulate(vertices, coordFieldName);
    var triangles = utils.normalizeDelaunayTriangles(mesh);
    var edges = utils.getEdgesFromDelaunayTriangles(vertices, triangles);
    return edges;
  },

  getEdgesFromDelaunayTriangles: function (vertices, triangles) {
    var edges = [];

    triangles.forEach(function (triangle) {
      var a = vertices[triangle.a];
      var b = vertices[triangle.b];
      var c = vertices[triangle.c];

      edges.push([a, b]);
      edges.push([a, c]);
      edges.push([c, b]);
    });

    return edges;
  },

  //call @callback @n times
  times: function (n, callback) {
    for (var i = 0; i < n; i++) {
      callback(i);
    }
  },

  //takes @array, returns a copy with a percentage of the items removed at random.
  // e.g. if @factor = 0.2, remove 20% of the array
  thinByFactor: function (array, factor) {
    var newArray = [];
    var numberOfElementsToRemove = Math.floor(array.length * factor);
    var indexesToRemove = [];

    if (factor < 0 || factor > 1) {
      numberOfElementsToRemove = 0;
    }

    utils.times(numberOfElementsToRemove, function () {
      indexesToRemove.push(utils.randomIndex(array));
    });

    array.forEach(function (element, i) {
      var keep = indexesToRemove.indexOf(i) === -1;
      if (keep) {
        newArray.push(element);
      }
    });

    return newArray;
  },

  //returns a random vertex between the min and max coordinates
  randomVertex: function (minX, maxX, minY, maxY) {
    var x = utils.randomBetween(minX, maxX);
    var y = utils.randomBetween(minY, maxY);
    var vertex = { 
      id: x + ":" + y,
      position: [x, y] 
    };
    return vertex;
  },

  //returns an array of @count vertices, x coords between 0 and @width, y between 0 and @height
  randomVertices: function (width, height, count) {
    var vertices = [];
    var takenVertices = {};

    utils.times(count, function () {
      var vertex = utils.randomVertex(0, width, 0, height);

      while (takenVertices[vertex.id]) {
        vertex = utils.randomVertex(0, width, 0, height);
      }
    
      takenVertices[vertex.id] = true;
      vertices.push(vertex);
    });

    return vertices;
  }

};

module.exports = utils;