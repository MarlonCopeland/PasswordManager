//holds functions that handle text manipulation etc.
const {clipboard} = require('electron');
const cryptoJS = require('crypto-js');
const fs = require("fs");

function copyToClipboard (text){
    clipboard.writeText(text);
    console.log("Added to clipboard" + text)
}

//shows password that is obscured by dots
function viewPassword(){

}

function getPasswordFromLoginName(loginName){
    return "pwdMgrlogin-" + loginName;
}

//maybe allow user to set secret key in some settings???
function EncryptText(text)
{
    var encryptedText = cryptoJS.AES.encrypt(text,'password').toString();
    return encryptedText;
}

function DecryptText(text)
{
    var bytes = cryptoJS.AES.decrypt(text,'password');
    var decryptedText = bytes.toString(cryptoJS.enc.Utf8);
    return decryptedText;
}

function WriteToTextFile(text, filename)
{
 fs.writeFile("C:/output/" + filename, text);

}

module.exports.copyToClipboard = copyToClipboard;
module.exports.getPasswordFromLoginName = getPasswordFromLoginName;
module.exports.EncryptText = EncryptText;
module.exports.DecryptText = DecryptText;
module.exports.WriteToTextFile = WriteToTextFile;
