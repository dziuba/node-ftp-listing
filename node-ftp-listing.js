// External files
require('./functions.js');
require('./csv-parse.js');
require('./mysql.js');
require('./add-update-artists.js');
require('./add-update-carriers.js');
require('./product-prepare-db.js');
require('./product-add-db.js');

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


parseCSV(settings.fs, settings.csvFileName, function(products){
    addUpdateArtist(products,function(artists){
        addUpdateCarriers(products, function(carriers){
            prepareProducts(products, artists, carriers, function(data){
               getOrAddProductId(data, function(data){
                   console.log(data);
               });
            });
        });
    });
});





