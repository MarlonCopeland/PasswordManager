//https://github.com/electron-userland/electron-json-storage#module_storage.remove

var util2 = require("util");
var path = require("path");
var fs = require("fs");
const os = require("os");
const storage = require("electron-json-storage");
const textManager = require("../scripts/textManager");
const { dialog } = require('electron').remote; //TODO: learn about remote importing here 

const storagePath = "C://Users/MarlonCopeland/Documents";
//os.tmpdir() 

storage.setDataPath(storagePath + "/pwm/");
const datapath = storage.getDataPath();
//console.log(datapath);

var login = {
    name: "",
    description: "",
    username: "",
    password: "",
    usesAuth: ""
}

function importLogins() {
    var strPath = ""
    var importJson;
    //strPath =  dialog.showOpenDialog({properties:['openFile']});
    dialog.showOpenDialog({
        properties: ['openFile']
    }, function (strFile) {
        if (strFile !== undefined) {
            // handle files
            console.log(strFile[0]);
            importJson = require(strFile[0]);
            console.log(importJson);

            for(var jsonLogin in importJson){
                login.loginDescription = importJson[jsonLogin].loginDescription;
                login.loginName = importJson[jsonLogin].loginName;
                login.loginPassword = importJson[jsonLogin].loginPassword;
                login.loginUsername = importJson[jsonLogin].loginUsername;
                login.loginUsesAuthenticator = importJson[jsonLogin].loginUsesAuthenticator;      

                console.log("description: " + importJson[jsonLogin].loginDescription);
            }
        }
    })
};

function getAllLogins() {
    storage.getAll(function (error, data) {
        console.log(data);
    })

}

function editLogin(loginName) {
    storage.get(loginName, function (error, data) {
        if (error) throw error;
        login.name = data.loginName;
        login.description = data.loginDescription;
        login.username = data.loginUsername;
        login.password = data.loginPassword;
        login.usesAuth = data.loginUsesAuthenticator;

        $("#loginName").val(login.name);
        $("#loginDescription").val(login.description);
        $("#loginUsername").val(login.username);
        $("#loginPassword").val(login.password);
        $("#loginUsesAuthenticator").val(login.usesAuth);
        $("#Title").html("Edit Login - " + login.name);

    });
};

function loadLogin(loginName) {

    storage.get(loginName, function (error, data) {
        if (error) throw error;
        var decryptedPassword = textManager.DecryptText(data.loginPassword);
        login.name = data.loginName;
        login.description = data.loginDescription;
        login.username = data.loginUsername;
        login.password = decryptedPassword;
        login.usesAuth = data.loginUsesAuthenticator;

        $("#loginName").html(login.name);
        $("#loginDescription").html(login.description);
        $("#loginUsername").html(login.username);
        $("#loginPassword").val(login.password);
        $("#loginUsesAuthenticator").html(login.usesAuth);

    });
};

function loadFirstLogin() {
    storage.keys(function (error, keys) {
        if (error) throw error;
        storage.get(keys[0], function (error, data) {
            if (error) throw error;
            var decryptedPassword = textManager.DecryptText(data.loginPassword);
            login.name = data.loginName;
            login.description = data.loginDescription;
            login.username = data.loginUsername;
            login.password = decryptedPassword;
            login.usesAuth = data.loginUsesAuthenticator;

            $("#loginName").html(login.name);
            $("#loginDescription").html(login.description);
            $("#loginPassword").val(login.password);
            $("#loginUsesAuthenticator").html(login.usesAuth);
        });
    });
};


function saveLogin(login) {
    //loadLogin('fda');
    var encryptedPassword = textManager.EncryptText(login.password);
    console.log(login.name + " " + login.description);
    $("#loginName").val("");
    $("#loginGroup").val("");
    $("#loginDescription").val("");
    $("#loginUsername").val("");
    $("#loginPassword").val("");
    $("#loginUsesAuthenticator").val("");
    storage.set('pwdMgrlogin-' + login.name, {
        loginName: login.name, loginDescription: login.description,
        loginUsername: login.username, loginPassword: encryptedPassword,
        loginUsesAuthenticator: login.usesAuth
    }, function (error) {
        if (error) throw error;

    });

    $("#StatusText").html("Password Saved");

    console.log("savedLogin");


};

//maybe use handlebars to handle looping through the list this returns???
function loadLogins() {
    var loginsHTML = "";
    storage.keys(function (error, keys) {
        if (error) throw error;
        for (const key in keys) {
            if (keys[key].includes("pwdMgrlogin-")) {
                console.log(keys[key] + "found");
                storage.get(keys[key], function (error, data) {
                    if (error) throw error;
                    loginsHTML += "<li><a href='#' class='login-link'>" + data.loginName + "</a></li>"
                    $("#loginlinks").html(loginsHTML);

                });
            }
        }
    });
};

function deleteLogin(loginName) {
    storage.remove(loginName, function(error) {
        if (error) throw error;
      });
};

module.exports.deleteLogin = deleteLogin;
module.exports.saveLogin = saveLogin;
module.exports.loadLogin = loadLogin;
module.exports.loadLogins = loadLogins;
module.exports.loadFirstLogin = loadFirstLogin;
module.exports.editLogin = editLogin;
module.exports.getAllLogins = getAllLogins;
module.exports.importLogins = importLogins;
module.exports.login = login;

