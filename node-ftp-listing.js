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

var cConsole = function(){
    var lines = process.stdout.getWindowSize()[1];
    for(var i = 0; i < lines; i++) {
        console.log('\r\n');
    }
};



// CSV Listing/*

/*
var Converter=require("csvtojson").core.Converter;
var fs=require("fs");

var csvFileName="./test.csv";
var fileStream=fs.createReadStream(csvFileName);
//new converter instance
var param={delimiter: ';'};
var csvConverter=new Converter(param);

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
   
    cConsole();
    
   console.log(jsonObj); //here is your result json object
   console.log('-------------------------\n-------------------------\n');
   console.log(JSON.stringify(jsonObj));
   //var obj = JSON.parse(jsonObj);
   console.log('\n\n\n');
});

//read from file
fileStream.pipe(csvConverter);

*/
var fs=require("fs");
var parse = require('csv');

var csvFileName="./test.csv";

fs.readFile(csvFileName, 'utf8', function (err, data) {
  if (err) throw err;
  console.log(data);
  console.log('-------------------------\n-------------------------\n');
  parse(data, {delimiter: ';'}, function(err, output){
      console.log(output);
});
});
