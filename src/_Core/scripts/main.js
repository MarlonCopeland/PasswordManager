const electron = require('electron')
const url = require('url')
const path = require('path')

const app = electron.app;
const browserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain

require("electron-reload")(__dirname);

let mainWindow;

app.on('ready', _ => {
    mainWindow = new browserWindow({
        width: 1280, height: 720, minWidth: 80, minHeight: 500
    })
    //load the main window
    // mainWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, '//html//mainWindow.html'),
    //     protocol:'file:',
    //     slashes: trueelec
    // }))
    //TODO: Fix this so I can put the main.js inside the scripts folder
    mainWindow.loadURL('file://' + __dirname + '/html/mainWindow.html')

    //close window event
    mainWindow.on('closed', _ => {
        console.log(' fired on close event for mainWindow')
        mainWindow = null
    })
})

//wired up event
// ipc.on('countdown-start',_=>{

// })

app.on("window-all-closed", function(){
    console.log("this happened");
   app.quit(); 
});
