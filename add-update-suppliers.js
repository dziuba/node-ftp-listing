GLOBAL.addUpdateSuppliers = function(products, callback){
    // Przygotowujemy listę wszytkich artystów [usuwanie dubli]
        removeDoubleFromObject(products, "supplier", function(suppliers){
            log('Usunięto zdublowanych dostawców [' + suppliers.length + '].');
            // Pobierz listę artystów z bazy
            var query = "SELECT * FROM `suppliers`";
            returnQuery(settings, query, function(rows){
                log('Pobrano dostawców z bazy ['+ rows.length +']');
                // Z listy wszytkich usuń artystów z bazy
                if(suppliers.length !== rows.length){
                    log('Tworzę listę dostawców do dodania.');
                    removeObjectParamFromArray(suppliers, rows, "symfonia_name", function(suppliersToAdd){
                        log('Nowi dostawcy ['+ suppliersToAdd.length +']');
                        makeQueryNewSuppliers(suppliersToAdd, function(query){
                           log('Dodaję do bazy danych.');
                           nonreturnQuery(settings, query, function(result){
                               var aR = 0;
                               result.forEach(function(el){
                                  aR += el.affectedRows; 
                               });
                              log('Dodano do bazy ['+ aR +']'); 
                              returnQuery(settings, "SELECT id, symfonia_name FROM suppliers;", function(rows){
                                    callback(rows);
                                });

                           });
                        });
                    });
                }else{
                    log('Brak nowych dostawców.');
                    returnQuery(settings, "SELECT id, symfonia_name FROM suppliers;", function(rows){
                        callback(rows);
                    });
                }
            });
        });
};