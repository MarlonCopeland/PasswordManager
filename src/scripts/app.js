var Emitter = require("events").EventEmitter;
var util = require("util");
var path = require("path");
var fs = require("fs");
var View = require("../scripts/view");
var dataManager = require("../scripts/jsonDataManager");
const storage = require("electron-json-storage");


var App = function(){
    this.on("view-selected", function(viewName){
        var view = new View(viewName);
        this.emit("rendered",view.toHtml());
    });
    this.on("submit-click", function(login){
       console.log("got this???")
      dataManager.saveLogin(login);
      dataManager.loadLogins();
    });

};

util.inherits(App, Emitter);
module.exports = new App();

