var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
const textManager = require("./textManager");

var config;
var connection;
function ConnectAndOutput() {

    config = {
        userName: 'sa',
        password: 'Password@123',
        server: 'localhost',
        driver: 'tedious',
        database: 'medigap',
        options: {
            instanceName: 'MSSQLSERVER'
        }
    };
  
var commandArray = [["Select * from Medigap.dbo.Plan_info","planinfo.txt"],
["Select * from Medigap.dbo.Plantype","planinfo.txt"]];

 connection = new Connection(config);
  
    connection.on('connect', function(err) {
      // If no error, then good to go...
      console.log("connected");
      console.log(err);
        
      executeStatement(commandArray);

      }
    );
};

function executeStatement(commandArray) {
var request = new Request;

    var html = "<table border='1'>";
    var fileText = "";

    request.on('row', function(columns) {
        
      html += "<tr>"
        columns.forEach(function(column) {
            
          html+= "<td>" + column.value + "</td>";
        //console.log(column.value);
        fileText += column.value += "\t"
      });
      fileText += '\r\n'
      html += "</tr>"
      
    });

    /*request.on('done', function(rowCount, more, rows){
        html+="</table>"
        $("#result").html(html);
        console.log(html + "batfart");

    });*/

    /*request.on('done', function(rowCount, more) {
        console.log(rowCount + ' rows returned');
    });*/

    request.on('doneInProc', function(rowCount, more, rows) {
        html+="</table>"
        $("#result").html(html);
        console.log(rowCount + ' rows returned : doneInProc');
        textManager.WriteToTextFile(fileText,filename);
        filename = commandArray[index][1];


    });
   
   /* request.on('doneProc', function(rowCount, more) {
        console.log(rowCount + ' rows returned : doneProc');
    });
    */

   for (let index = 0; index < commandArray.length; index++) {
        request = new Request(commandArray[index][0], function(err, rowCount) {
        if (err) {
          console.log(err);
        } else {
          console.log(rowCount + ' rows');
        }
      });  
         connection.execSql(request);


  };

module.exports.ConnectAndOutput = ConnectAndOutput;
