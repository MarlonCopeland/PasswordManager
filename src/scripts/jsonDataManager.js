var util2 = require("util");

var path = require("path");
var fs = require("fs");
const os = require("os");
const storage = require("electron-json-storage");


storage.setDataPath(os.tmpdir());

const datapath = storage.getDataPath();

console.log(datapath);

// storage.set("test",{test:"Marlon"},function(error){
//     if(error) throw error;
// });

// var testGet = storage.get('test', function (error, data) {
//     if (error) throw error;
//     console.log(data);
//     console.log(data.test);
//     document.getElementById("loginName").value = data.test;
// });

var loadLogin = function (loginName) {
    storage.get('fda', function (error, data) {
        if (error) throw error;

        document.getElementById("loginName").value = data.loginName;
    });
};

function saveLogin(login) {
      //loadLogin('fda');
        console.log(login.name + " " + login.description);
        storage.set('pwdMgrlogin-'+login.name, {
            loginName: login.name, loginDescription: login.description,
            loginUsername: login.username, loginPassword: login.password,
             loginUsesAuthenticator: login.usesAuth
        }, function (error) {
            if (error) throw error;
        });
};

function loadLogins(){
    storage.getAll(function(error, data){
        if(error) throw error;
        console.log(data);
        console.log(data["bart"].loginDescription)
        data.forEach(element => {
            if(element.loginName == "bart")
            {
                console.log("found bart")
            }    
        });
    })
};

module.exports.saveLogin = saveLogin;
module.exports.loadLogin = loadLogin;
module.exports.loadLogins = loadLogins;


