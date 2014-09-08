GLOBAL.prepareProducts = function(products, artists, carriers, callback){
    var data = [];
    var search;
    var i = 1;
    artists.forEach(function(art){
        var tmp = {
            id: art.id,
            name: art.symfonia_name,
            products: [],
            titles: [],
            groups: []
        };
        var tmpTitles = [];
        var tmpTitlesClean = [];
        var tmpGroups = [];
        
        products.forEach(function(prod){
            //if(el.titleBracket !== null) log(el.titleBracket);
            if(!strcmp(art.symfonia_name, prod.artist)){
                if(prod.titleClean !== null)
                    if(!searchFor(tmpTitlesClean, prod.titleClean.replace(/ /g, ''))){
                        tmpTitles.push(prod.titleClean);
                        tmpTitlesClean.push(prod.titleClean.replace(/ /g, ''));
                    }
                getGroupForProduct(prod, carriers, function(group){
                    if(group !== false){
                        if(!searchFor(tmpGroups, group)){
                            tmpGroups.push(group);
                        }
                    }                  
                });    
 
            }
                
        });
        tmp.titles = tmpTitles;
        tmp.groups = tmpGroups;
        if(art.symfonia_name === "BETHEL") search = tmp;
        data.push(tmp);
        
        if(i === artists.length) callback(search);
        
        i++;
    });
};

GLOBAL.getGroupForProduct = function(prod, carriers, callback){
    var i = 1;
    if(prod.carrier !== undefined){
        var maxCarrier = null;
        prod.carrier.forEach(function(prodCarrier){
            searchForInObjectAndReturn(carriers, "name", prodCarrier.type, function(query){
                if(query !== false){
                    if(maxCarrier !== null){
                        if(maxCarrier.priority < query.priority){
                            maxCarrier = query;
                        }
                    }else{
                        maxCarrier = query;
                    }
                }

            });
            if(i === prod.carrier.length) callback(maxCarrier.product_group_id);
            i++;
        });
    }else{
        callback(false);
    }
};
