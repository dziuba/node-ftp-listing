// External files
require('./functions.js');
require('./csv-parse.js');
require('./mysql.js');
require('./add-update-artists.js');
require('./add-update-carriers.js');
require('./add-update-producers.js');
require('./add-update-suppliers.js');
require('./add-update-generes.js');
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
            addUpdateGeneres(products, function(generes){
                addUpdateProducers(products, function(producers){
                    addUpdateSuppliers(products, function(suppliers){
                        prepareProducts(products, artists, carriers, generes, function(data){
                            getOrAddProductIdR(data, function(dataWithId){
                                addOrUpdateEans(dataWithId, carriers, producers, suppliers);
                            });
                        });
                    });
                });
            });
        });
    });
});





/*
 * 
 * prepareProducts(products, artists, carriers, function(data){
                getOrAddProductIdR(data, function(dataWithId){
                    addOrUpdateEans(dataWithId, carriers);
                });
            });
 */

//addUpdateArtist(products,function(artists){
        //addUpdateCarriers(products, function(carriers){
            //addUpdateGeneres(products, function(generes){
             //  console.log(generes); 
           // });
        //});
    //});