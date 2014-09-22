GLOBAL.addUpdateGeneres = function(products, callback){
    log('Buduję listę gatunków.');
    makeGeneresList(products, function(generes){
        clearGeneresList(generes, function(clearGeneres){
            log('Zrobiono listę gatunków ['+ clearGeneres.length+']');
            returnQuery(settings, "SELECT * FROM generes", function(rows){
                if(rows.length+1 < clearGeneres.length){
                    log('Tworzę listę gatunków do dodania.');
                    makeGeneresToAdd(rows, clearGeneres, function(generesToAddQuery){
                        nonreturnQuery(settings, generesToAddQuery, function(result){
                            log('Dodano nowe gatunki ['+ result.affectedRows +']');
                            returnQuery(settings, "SELECT id, name, symfonia_name FROM generes", function(rows){
                               callback(rows); 
                            });
                        });
                    });
                }else{
                    log('Brak nowych gatunków.');
                    returnQuery(settings, "SELECT id, name, symfonia_name FROM generes", function(rows){
                       callback(rows); 
                    });
                }
            });
        });
    });
};

GLOBAL.makeGeneresList = function(products, callback){
    var list = [];
    var i = 1;
    products.forEach(function(prod){
        prod.genere.forEach(function(gen){
            list.push(gen);
        });
        if(products.length === i) callback(list);
        i++;
    });
};


GLOBAL.clearGeneresList = function(generes, callback){
    var list = [];
        var i = 1;
        generes.forEach(function(gen){
                if(!searchFor(list, gen))
                    if(gen !== '')
                        list.push(gen);
                
                if(generes.length === i)
                   callback(list);
  
                i++;
        });  
};

GLOBAL.makeGeneresToAdd = function(gObjDB, gList, callback){
    removeObjectParamFromArray(gList,gObjDB, "symfonia_name", function(generesList){
        makeQueryNewGeneres(generesList, function(query){
           callback(query); 
        });
    });
};