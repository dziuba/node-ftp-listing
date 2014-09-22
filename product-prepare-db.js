GLOBAL.prepareProducts = function(products, artists, carriers, callback){
    log('Przygotowuję tablicę produktów.');
    var data = [];
    var i = 1;
    artists.forEach(function(art){ if(art.id ===7564){
        var tmp = {
            id: art.id,
            name: art.symfonia_name,
            products: []
        };
        products.forEach(function(prod){  
            if(!strcmp(art.symfonia_name, prod.artist)){
                getGroupForProduct(prod, carriers, function(group){
                    if(group > 0){ // eliminuje produkty bez grupy produktowej
                        if(!checkForProducts(tmp.products, prod.titleClean, group)){
                                tmp.products.push({title: prod.titleClean, group: group, eans: [prod], product_id: null});
                        }else{
                            tmp.products = insertInProductArray(tmp.products, prod.titleClean, group, prod);
                        }                    
                    }                  
                });  
                
 
            }
                
        });

        data.push(tmp);
        }
        if(i === artists.length){
            log('Zakończono przygotowywanie.');
            callback(data);
        }
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
            if(i === prod.carrier.length){
                if(maxCarrier.product_group_id === null)
                    callback(0);
                else
                    callback(maxCarrier.product_group_id);
            }
            i++;
        });
    }else{
        callback(false);
    }
};


GLOBAL.checkForProducts = function(productList, title, group){
    var ret = false;
    if(productList.length > 0){
        productList.forEach(function(pL){
            if(pL.title !== null && pL.title !== undefined){
                if(pL.title.replace(/ /g, '') === title.replace(/ /g, '') && pL.group === group){
                    ret = true;
                }
            }
        });
    }
    return ret;
};


GLOBAL.insertInProductArray = function(productList, title, group, product){
    for(var i = 0;i<productList.length;i++){
        if(productList[i].title !== null && productList[i].title !== undefined){
            if(productList[i].title.replace(/ /g, '') === title.replace(/ /g, '') && productList[i].group === group){
                productList[i].eans.push(product);
                //productList[i].product_id = checkAndRetunProductId(title, group);
            }
        }
    }
    return productList;
};




        
                       