/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 /*var Client = require('ftp');

  var c = new Client();
  c.on('ready', function() {
    c.list(function(err, list) {
      if (err) throw err;
      //console.dir(list);
      //console.log(list[0].name);
      list.forEach(function(el){
         console.log(el.name); 
      });
      c.end();
    });
  });
  // connect to localhost:21 as anonymous
  c.connect({host: 'ftp.rockerspro.pl', user: 'dziuba', password: 'giwoo9du'});
*/

// Clear console function

var clearConsole = function(){
    var lines = process.stdout.getWindowSize()[1];
    for(var i = 0; i < lines; i++) {
        console.log('\r\n');
    }
};

var fs=require("fs");

var csvFileName="./sm.csv";
var csvObj;

clearConsole();

fs.readFile(csvFileName, 'utf8', function (err, data) {
    if (err) throw err;
    
  
    
    var lines = data.split('\r\n');
    var row = null;
    var csvArray = [];
    var i = 0;
    lines.forEach(function(el){
        row = el.split(';');
        csvObj = {
            name: row[0]//,
            //year: row[1],
            //month: row[2],
            //day: row[3],
           // mail: row[4]
        } 
        /*csvObj['year'] = row[1]; 
        csvObj['month'] = row[2]; 
        csvObj['day'] = row[3]; 
        csvObj['mail'] = row[4];*/
        csvArray[i] = csvObj;
        i++;
      });
      
      console.log(csvArray);

    

});