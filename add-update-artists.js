GLOBAL.addUpdateArtist = function(products, callback){
    // Przygotowujemy listę wszytkich artystów [usuwanie dubli]
        removeDoubleFromObject(products, "artist", function(artists){
            log('Usunięto zdublowanych artystów [' + artists.length + '].');
            // Pobierz listę artystów z bazy
            var query = "SELECT * FROM `artists`";
            returnQuery(settings, query, function(rows){
                log('Pobrano artystów z bazy ['+ rows.length +']');
                // Z listy wszytkich usuń artystów z bazy
                if(artists.length !== (rows.length+1)){
                    log('Tworzę listę artystów do dodania.');
                    removeObjectParamFromArray(artists, rows, "symfonia_name", function(artistsToAdd){
                        console.log(artistsToAdd);
                        log('Nowi artyści ['+ artistsToAdd.length +']');
                        makeQueryNewArtists(artistsToAdd, function(query){
                           log('Dodaję do bazy danych.');
                           nonreturnQuery(settings, query, function(result){
                               var aR = 0;
                               result.forEach(function(el){
                                  aR += el.affectedRows; 
                               });
                              log('Dodano do bazy ['+ aR +']'); 
                              returnQuery(settings, "SELECT id, symfonia_name FROM artists;", function(rows){
                                    callback(rows);
                                });

                           });
                        });
                    });
                }else{
                    log('Brak nowych artystów.');
                    returnQuery(settings, "SELECT id, symfonia_name FROM artists;", function(rows){
                        callback(rows);
                    });
                }
            });
        });
};