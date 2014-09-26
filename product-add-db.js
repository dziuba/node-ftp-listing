/* ------------ Eans ------------------*/
GLOBAL.addOrUpdateEans = function(data, c, p, s){
    GLOBAL.carriers = c;
    GLOBAL.producers = p;
    GLOBAL.suppliers = s;
    log('Dodawanie/Aktualizacja eanów.');
    scanArtistsForEans(data, data.length, function(data){
        log('Zakończono aktualizowanie/dodawanie.');
    });
};

var scanArtistsForEans = function(data, artistIterator, callback){
    artistIterator--;
    if( artistIterator >= 0){
        scanProductsForEans(data, artistIterator, data[artistIterator].products.length, function(data){
            scanArtistsForEans(data, artistIterator, function(data){
                callback(data);
            });
        });
    }else{
        callback(data);
    }
};

var scanProductsForEans = function(data, artistIterator, productIterator, callback){
    productIterator--;
    if(productIterator >= 0){
        var d = data[artistIterator].products[productIterator];
        scanEans(data, artistIterator, productIterator, d.eans.length, function(data){
           scanProductsForEans(data, artistIterator, productIterator, function(data){
               callback(data);
           });
        });
    }else{
        callback(data);
    }
};

var scanEans = function(data, artistIterator, productIterator, eanIterator, callback){
    eanIterator--;
    if(eanIterator >= 0){
        var p = data[artistIterator].products[productIterator];
        scanEans(data, artistIterator, productIterator, eanIterator, function(data){
           addUpdateEans(p.eans[eanIterator], p.product_id, function(eanDbId){
                p.eans[eanIterator].db_id = eanDbId;
                callback(data);
           });
        });
    }else{
        callback(data);
    }
};

var addUpdateEans = function(ean, productId, callback){
    var query = 'SELECT `id` FROM `eans` WHERE `ean` = ? LIMIT 0,1';
    var inserts = [ean.ean1];
    query = settings.mysql.format(query, inserts);
    returnQuery(settings, query, function(rows){
        if(rows.length === 0){
            getProducerId(ean.producer, function(producerId){
                getSupplierId(ean.supplier, function(supplierId){
                    var dateFormat = require('dateformat');
                    var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
                    query = "INSERT INTO `eans` (`product_id`, `ean`, `price`, `quantity`, `ean2`, `vat`, `code`, `notes`, `cost`, `name`, `short_name`, `full_name`, `supplier_id`, `producer_id`, `created`, `modified`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
                    inserts = [productId, ean.ean1, ean.price, ean.quantity, ean.ean2, ean.vat, ean.code, ean.notes, ean.quantityPrice, ean.titleClean, ean.titleBracket, ean.title, supplierId, producerId, datetime, datetime];
                    query = settings.mysql.format(query, inserts);
                    nonreturnQuery(settings, query, function(result){
                        var eanDbId = result.insertId;
                        addCarriersDependence(ean, eanDbId, ean.carrier.length, function(){
                            callback(eanDbId);
                        });  
                    });
                });
            });
        }else{
            var eanDbId = rows[0].id;
            var dateFormat = require('dateformat');
            var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            query = "UPDATE `eans` SET `price` = ?, `quantity` = ?, `cost` = ?, `modified` = ? WHERE `id` = ?";
            inserts = [ean.price, ean.quantity, ean.quantity_price, datetime, eanDbId];
            query = settings.mysql.format(query, inserts);
            nonreturnQuery(settings, query, function(result){
                callback(eanDbId);
            });
            
        }
    });  
};


var getProducerId = function(name, callback){
    var i = 1;
    var id = 0;
    producers.forEach(function(el){
        if(!strcmp(el.symfonia_name, name))
            id = el.id;
        
        if(i === producers.length) callback(id);
        i++;
    });
};

var getSupplierId = function(name, callback){
    var i = 1;
    var id = 0;
    suppliers.forEach(function(el){
        if(!strcmp(el.symfonia_name, name))
            id = el.id;
        
        if(i === suppliers.length) callback(id);
        i++;
    });
};


var addCarriersDependence = function(ean, eanDbId, carrierIterator, callback){
    carrierIterator--;
    if(carrierIterator >= 0){
        addCarriersDependence(ean, eanDbId, carrierIterator, function(){
            getCarrierId(ean.carrier[carrierIterator].type, function(carrierId){
                var query = "INSERT INTO `carriers_eans` (`carrier_id`, `ean_id`, `quantity`) VALUES (?,?,?);";
                var inserts = [carrierId, eanDbId, ean.carrier[carrierIterator].quantity];
                query = settings.mysql.format(query, inserts);
                nonreturnQuery(settings, query, function(){
                    callback();
                });
            });
        });
    }else{
        callback();
    }
};

var getCarrierId = function(name, callback){
    var i = 1;
    var id = 0;
    carriers.forEach(function(el){
        if(!strcmp(el.name, name))
            id = el.id;
        
        if(i === carriers.length) callback(id);
        i++;
    });
};

/* ------------ Products Ids ----------------*/
GLOBAL.getOrAddProductIdR = function(data, callback){
    log('Pobieranie ID produktów.');
    scanArtists(data, data.length, function(artist){
        log('Zakończono pobieranie.');
        callback(artist);
    });
};


var scanArtists = function(data, artistIterator, callback){
    artistIterator--;
    if( artistIterator >= 0){
        //log('Aktualny artysta: '+  artistIterator,1);
        scanProducts(data, artistIterator, data[artistIterator].products.length, function(data){
            scanArtists(data, artistIterator, function(data){
                callback(data);
            });
        });
    }else{
        callback(data);
    }
};

var scanProducts = function(data, artistIterator, productIterator, callback){
    productIterator--;
    if(productIterator >= 0){
        //log('Aktualny produkt: '+ productIterator, 2);
        var d = data[artistIterator].products[productIterator];
        scanProducts(data, artistIterator, productIterator, function(data){
            checkAndRetunProductId(d.title, d.group, data[artistIterator].id, d.generes, function(productId){
                //log('ID pobrane z bazy: '+ productId,3);
                data[artistIterator].products[productIterator].product_id = productId;
                callback(data);
            });
        }); 
    }else{
        callback(data);
    }
};

var checkAndRetunProductId = function(title, group, artistId, productGeneresIds, callback){
    var query = 'SELECT `id` FROM `products` WHERE `symfonia_name` = ? and `product_group_id` = ? LIMIT 0,1';
    if(title !== null)
        var inserts = [title.replace(/ /g, ''), group];
    else
        var inserts = ["BŁĄD_BARK_NAZWY", group];
    query = settings.mysql.format(query, inserts);
    //log(query,1);
    returnQuery(settings, query, function(rows){
        //if(rows.length === 0) log('undefined'); else log(rows[0].id);
        if(rows.length === 0){
            var dateFormat = require('dateformat');
            var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            query = "INSERT INTO `products` (`name`, `symfonia_name`, `product_group_id`, `created`, `modified`) VALUES (?,?,?,?,?);";
            if(title !== null)
                inserts = [title, title.replace(/ /g, ''), group,  datetime, datetime];
            else
                inserts = ["BŁĄD_BARK_NAZWY", "BŁĄD_BARK_NAZWY", group,  datetime, datetime];
            query = settings.mysql.format(query, inserts);
            nonreturnQuery(settings, query, function(result){
                //log('Dodano produkt (id: '+ result.insertId +')');
                //return result.insertId;
                ///callback(result.insertId);
                var productId = result.insertId;
                query = "INSERT INTO `artists_products` (`artist_id`, `product_id`) VALUES (?,?);";
                inserts = [artistId, productId];
                query = settings.mysql.format(query, inserts);
                nonreturnQuery(settings, query, function(result){
                    //log('Dodano zależność ['+ artistId +', '+ productId +']',2);
                    makeProductGeneresQuery(productId, productGeneresIds, function(gQuery){
                        nonreturnQuery(settings, gQuery, function(result){
                            callback(productId);
                        });
                    });
                });
            });
        }else{
            //log('Sprawdzono w bazie (id: '+ rows[0].id +')',1);
            //console.log(rows);
            //return rows[0].id;
            callback(rows[0].id);
        }
    });  
};

var makeProductGeneresQuery = function(productId, generesArray, callback){
    var i = 1;
    var sql;
    var query = '';
    generesArray.forEach(function(el){
        if(i === 1){
            sql = "INSERT INTO `generes_products` (`product_id`, `genere_id`) VALUES (?,?)";
        }else{
            sql = ', (?,?)';
        }
       
        var inserts = [productId, el];
        sql = settings.mysql.format(sql, inserts);
        query +=sql;
        
        if(generesArray.length === i) callback(query);
        i++;
    });
};

