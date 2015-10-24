var $ = require("jquery");

$(function () {
  var Controller = require("./controller");
  var controller = new Controller();

  console.log("starting up");

  controller.initialize();
  
});

