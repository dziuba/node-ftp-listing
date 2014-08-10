GLOBAL.addUpdateArtist = function(callback){
    parseCSV(settings.fs, settings.csvFileName, function(products){
    // Przygotowujemy listę wszytkich artystów [usuwanie dubli]
        removeDoubleFromObject(products, "artist", function(artists){
            log('Usunięto zdublowanych artystów [' + artists.length + '].');
            // Pobierz listę artystów z bazy
            var query = "SELECT * FROM `artists`";
            returnQuery(settings.mysql, settings.mysqlSettings, query, function(rows){
                log('Pobrano artystów z bazy ['+ rows.length +']');
                // Z listy wszytkich usuń artystów z bazy
                if(artists.length !== rows.length){
                    removeObjectParamFromArray(artists, rows, "symfonia_name", function(artistsToAdd){
                        log('Nowi artyści ['+ artistsToAdd.length +']');
                        makeQueryNewArtists(artistsToAdd, function(query){
                           log('Dodaję do bazy danych.');
                           nonreturnQuery(settings.mysql, settings.mysqlSettings, query, function(result){
                               var aR = 0;
                               result.forEach(function(el){
                                  aR += el.affectedRows; 
                               });
                              log('Dodano do bazy ['+ aR +']'); 
                              callback(products, artists);

                           });
                        });
                    });
                }else{
                    log('Brak nowych artystów.');
                    callback(products, artists);
                }
            });
        });

    });
};