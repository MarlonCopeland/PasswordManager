const os = require("os");
const storage = require("electron-json-storage");


storage.setDataPath(os.tmpdir());


const datapath = storage.getDataPath();
 

console.log(datapath);

storage.set("test",{test:"Marlon"},function(error){
    if(error) throw error;
});

var betadata = storage.get('test', function(error, data) {
    if (error) throw error;
    console.log(data);
    console.log(data.test);
    document.getElementById("loginName").value = data.test;
  });

