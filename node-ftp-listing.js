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

// CSV Listing/*
//Converter Class
var fs=require("fs");
var file = "sm.csv";


fs.readFile(file, "utf8", function (err, data) {
    if (err) throw err;
    var elS;
    data.forEach(function(el){
        elS = el.split(';');
        console.log(elS[0]);
    });
});