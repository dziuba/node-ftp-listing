GLOBAL.addUpdateProducers = function(products, callback){
    // Przygotowujemy listę wszytkich artystów [usuwanie dubli]
        removeDoubleFromObject(products, "producer", function(producers){
            log('Usunięto zdublowanych producentów [' + producers.length + '].');
            // Pobierz listę artystów z bazy
            var query = "SELECT * FROM `producers`";
            returnQuery(settings, query, function(rows){
                log('Pobrano producentów z bazy ['+ rows.length +']');
                // Z listy wszytkich usuń artystów z bazy
                if(producers.length !== rows.length){
                    log('Tworzę listę producentów do dodania.');
                    removeObjectParamFromArray(producers, rows, "symfonia_name", function(producersToAdd){
                        log('Nowi producenci ['+ producersToAdd.length +']');
                        makeQueryNewProducers(producersToAdd, function(query){
                           log('Dodaję do bazy danych.');
                           nonreturnQuery(settings, query, function(result){
                               var aR = 0;
                               result.forEach(function(el){
                                  aR += el.affectedRows; 
                               });
                              log('Dodano do bazy ['+ aR +']'); 
                              returnQuery(settings, "SELECT id, symfonia_name FROM producers;", function(rows){
                                    callback(rows);
                                });

                           });
                        });
                    });
                }else{
                    log('Brak nowych producentów.');
                    returnQuery(settings, "SELECT id, symfonia_name FROM producers;", function(rows){
                        callback(rows);
                    });
                }
            });
        });
};