var fs = require("fs");
var path = require("path");
var Handlebars = require("handlebars");

var View = function(viewName){
    //my files are in the html folder of my app
    var templatePath = path.join(__dirname,"../html", viewName + ".hbs");
    var source = fs.readFileSync(templatePath,"utf-8");
    var template = Handlebars.compile(source);

    this.toHtml = function(data){
        return template(data);
    };
};

module.exports = View;