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
       console.log("submit-click fired")
      dataManager.saveLogin(login);
    });
    this.on("load-logins", function(loginsHTML){
        console.log("load-logins fired")
        dataManager.loadLogins(loginsHTML);
    });
    this.on("edit-login",function(loginName){
        console.log("edit-login emitted")
        var view = new View("addPassword");
        this.emit("rendered", view.toHtml());
        dataManager.editLogin(loginName);
    });
};

util.inherits(App, Emitter);
module.exports = new App();

