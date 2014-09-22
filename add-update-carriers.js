GLOBAL.addUpdateCarriers = function(products, callback){
    log('Buduję listę nośników.');
    makeCarriersList(products, function(carriers){
        clearCarriersList(carriers, function(clearCarriers){
            log('Zrobiono listę nośników ['+ clearCarriers.length+']');
            returnQuery(settings, "SELECT * FROM carriers", function(rows){
                if(rows.length+1 < clearCarriers.length){
                    log('Tworzę listę nośników do dodania.');
                    makeCarriersToAdd(rows, clearCarriers, function(carriersToAddQuery){
                        nonreturnQuery(settings, carriersToAddQuery, function(result){
                            log('Dodano nowe nośniki ['+ result.affectedRows +']');
                            returnQuery(settings, "SELECT id, product_group_id, name, priority FROM carriers", function(rows){
                               callback(rows); 
                            });
                        });
                    });
                }else{
                    log('Brak nowych nośników.');
                    returnQuery(settings, "SELECT id, product_group_id, name, priority FROM carriers", function(rows){
                       callback(rows); 
                    });
                }
            });
        });
    });
};

GLOBAL.makeCarriersList = function(products, callback){
    var list = [];
    var i = 1;
    products.forEach(function(prod){
        prod.carrier.forEach(function(carr){
            list.push(carr.type);
        });
        if(products.length === i) callback(list);
        i++;
    });
};


GLOBAL.clearCarriersList = function(carriers, callback){
    var list = [];
        var i = 1;
        carriers.forEach(function(carr){
                if(!searchFor(list, carr))
                    list.push(carr);
                
                if(carriers.length === i)
                   callback(list);
  
                i++;
        });  
};

GLOBAL.makeCarriersToAdd = function(cObjDB, cList, callback){
    removeObjectParamFromArray(cList,cObjDB, "name", function(carriersList){
        makeQueryNewCarriers(carriersList, function(query){
           callback(query); 
        });
    });
};