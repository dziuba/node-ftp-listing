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
  c.connect({host: '', user: '', password: ''});
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

//clearConsole();

fs.readFile(csvFileName, 'utf8', function (err, data) {
    if (err) throw err;

    var lines = data.split('\r\n');
    var csvArray = [];
    var i = 0;
    
    // Rozszyfruj CSV
    lines.forEach(function(el){
        var row = el.split(';');
        var name = row[0].split(' ^^^ ');
        //if(row[1].toString().length != 13){
            csvObj = {
                artist: name[0],
                title: name[1],
                ean1: row[1],
                price: row[2],
                quantity: row[3],
                ean2: row[4],
                vat: row[5],
                carrier: row[6],
                supplier: row[7],
                producer: row[8],
                year: row[9],
                code: row[10],
                genere: row[11],
                notes: row[12],
                quantityPrice: row[13]
            }
        //}

        csvArray[i] = csvObj;
        i++;
      });
      
    // Policz artystów, nośniki   
    var artistList = [];
    var carrierList = [];
    var searchedFor = [];
    var searchFor = function(list, query){
        var found = false;
        list.forEach(function(el){
           if(el == query){
               found = true;
           } 
        });
        
        return found;
    };
    function strcmp ( str1, str2 ) {
        return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
    }
    csvArray.forEach(function(el){
        // artysta
       if(!searchFor(artistList, el.artist)) {
           artistList.push(el.artist);
       }
       // nosnik
       if(!searchFor(carrierList, el.carrier)) {
           carrierList.push(el.carrier);
       }
       // nosnik = odziez
       if(!strcmp(el.carrier, "ODZIEŻ")) searchedFor.push(el);
    });
    
 
    
    //console.log("\nIlość artystów: " + artistList.length);  
    //console.log("\nIlość produktów: " + csvArray.length);
    //console.log("\nIlość nośników: " + carrierList.length + '\nOdzież: \n');
    console.log(searchedFor);
    
      
    //console.log(csvArray[15000]);

    

});

