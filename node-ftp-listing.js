// External files
require('./functions.js');
require('./csv-parse.js');
require('./mysql.js');
require('./add-update-artists.js');

// Settings

GLOBAL.settings = {
    fs: require("fs"),
    csvFileName: "./sm.csv",
    mysql: require('mysql'),
    mysqlSettings: {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'rockers_panel_07082014',
      multipleStatements: true
    }
};



/////////////////////////////////////////
// Main program
/////////////////////////////////////////

addUpdateArtist(function(products, artists){
    products.forEach(function(el){
        if(el.titleBracket !== null) log(el.titleBracket);
    });
});



