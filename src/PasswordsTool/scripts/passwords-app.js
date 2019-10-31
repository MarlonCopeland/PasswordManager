/** This file handles all passwords tool specific functions */

var Emitter = require("events").EventEmitter;
var util = require("util");
var path = require("path");
var fs = require("fs");
var View = require("../scripts/view");
var dataManager = require("../scripts/jsonDataManager");
var exportManager = require("../scripts/export.js");

const storage = require("electron-json-storage");


var App = function(){
    this.on("view-selected", function(viewName, appFolder){
        var view = new View(viewName, appFolder);
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
    this.on("delete-login",function(loginName){
        console.log("delete-login emitted")
        dataManager.deleteLogin(loginName);
        this.emit("view-selected", "home");
    });
    this.on("test-click",function(){
        console.log("test-click emitted")
        exportManager.ConnectAndOutput();
    });
};

util.inherits(App, Emitter);
module.exports = new App();

