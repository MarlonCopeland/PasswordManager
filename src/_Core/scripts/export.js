var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
const textManager = require("../scripts/textManager");

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
            instanceName: 'MSSQLSERVER',
            rowCollectionOnRequestCompletion: true
        }
    };
  /*
  Medigap_cntrct_year
  Medigap_hlth_ctgry
  Medigap_hlth_ctgry_lkp
  Medigap_lang
  Medigap_OOP
  Medigap_org_type
  Medigap_orgs
  Medigap_orgstate
  Medigap_plan_cnty_xwalk
  Medigap_plan_info
  Medigap_plan_state_xwalk
  Medigap_plan_type
  Medigap_plan_type_basics
  Medigap_plan_type_xwalk
  Medigap_plan_zip_xwalk
  Medigap_prm_yr
  Medigap_prms
  Medigap_simple_plan_type
  Medigap_simple_plantype_lkp
  Medigap_split_state_lkp
  Medigap_src_type
  Medigap_state
  Medigap_state_site
  Medigap_type_grp
  */
var commandArray = [["Select * from Medigap.dbo.Medigap_simple_plantype_lkp;","Medigap_simple_plantype_lkp.txt"]];
//["Select * from Medigap.dbo.Plantype","plantype.txt"]];

 connection = new Connection(config);
  
    connection.on('connect', function(err) {
      // If no error, then good to go...
      console.log("connected");
      console.log(err);
        
      executeStatement(commandArray);
/*      commandArray.forEach(command => {
        setTimeout(executeStatement(command) , 3000);
      });*/
      }
    );
};

function executeStatement(commandArray) {
    var filename;
    var html = "<table border='1'>";
    var fileText = "";
   var request = new Request(commandArray[0][0], function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
        console.log(commandArray[0][0]);
        console.log(rowCount + ' rows');
      }
      }); 

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

    request.on('doneInProc', function(rowCount, more) {
      html+="</table>"
      $("#result").html(html);
      console.log(rowCount + ' rows returned : doneInProc');
      filename = commandArray[0][1];
      console.log("filename is: " + filename);
      textManager.WriteToTextFile(fileText,filename);
    });
    
    /*request.on('done', function(rowCount, more, rows){
        html+="</table>"
        $("#result").html(html);
        console.log(html + "batfart");

    });*/

    /*request.on('done', function(rowCount, more) {
        console.log(rowCount + ' rows returned');
    });*/

   /* request.on('doneProc', function(rowCount, more) {
        console.log(rowCount + ' rows returned : doneProc');
    });
    */

   //for (let index = 0; index < commandArray.length; index++) {


    
        
         connection.execSql(request);


  }

module.exports.ConnectAndOutput = ConnectAndOutput;
