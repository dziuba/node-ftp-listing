// External files
require('./functions.js');
require('./csv-parse.js');

// CSV product file
GLOBAL.fs=require("fs");
var csvFileName="./sm.csv";


// Mysql connection
/*var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'rockers_panel_07082014',
  multipleStatements: true
});*/

// Date generation
//GLOBAL.dateFormat = require('dateformat');
//var now;// = new Date();

/////////////////////////////////////////
// Main program
/////////////////////////////////////////

//connection.connect();

parseCSV(fs, csvFileName, function(products){
    // Przygotowujemy listę wszytkich artystów [usuwanie dubli]
    removeDoubleFromObject(products, "artist", function(artists){
        log('Usunięto zdublowanych artystów [' + artists.length + ' artystów].');
    });
    
    
    // Pobierz listę artystów z bazy
    // Z listy wszytkich usuń artystów z bazy
    // Dodaj do bazy artystów z pozostałej listy
});