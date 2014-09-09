GLOBAL.getOrAddProductIdR = function(data, callback){
    //scanArtists(data, data.length, function(artist){
    var d = scanArtists(data, data.length);
    d.forEach(function(el){
        console.log(el);
    });
    //});
};


var scanArtists = function(data, artistIterator){
    artistIterator--;
    log('Aktualny artysta: '+  artistIterator,1);
    if( artistIterator >= 0){
      return scanProducts(data, artistIterator, data[artistIterator].products.length);
    }else{
      return data;
    }
};

var scanProducts = function(data, artistIterator, productIterator){
    productIterator--;
    log('Aktualny produkt: '+ productIterator, 2);
    if(productIterator >= 0){
        data[artistIterator].products[productIterator].product_id = getProductId(data, artistIterator, productIterator);
        return scanProducts(data, artistIterator, productIterator);
    }else{
        return scanArtists(data, artistIterator);
    }
};

var getProductId = function(data, artistIterator, productIterator){
    return 1;
};

GLOBAL.getOrAddProductId = function(data, callback){
   for(var i = 0;i<data.length;i++){
       for(var j = 0;j<data[i].products.length;j++){
           checkAndRetunProductId(data[i].products[j].title, data[i].products[j].group, function(productId){
               log(productId,1);
               data[i].products[j].product_id = productId;
               
           });
            
       }
       if(i+1 === data.length) callback(data);
   }
   
     
};

GLOBAL.checkAndRetunProductId = function(title, group, callback){
    var query = 'SELECT `id` FROM `products` WHERE `symfonia_name` = ? and `product_group_id` = ? LIMIT 0,1';
    var inserts = [title.replace(/ /g, ''), group];
    query = settings.mysql.format(query, inserts);
    log(query,1);
    returnQuery(settings, query, function(rows){
        //if(rows.length === 0) log('undefined'); else log(rows[0].id);
        if(rows.length === 0){
            var dateFormat = require('dateformat');
            var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            query = "INSERT INTO `products` (`name`, `symfonia_name`, `product_group_id`, `created`, `modified`) VALUES (?,?,?,?,?);";
            inserts = [title, title.replace(/ /g, ''), group,  datetime, datetime];
            query = settings.mysql.format(query, inserts);
            nonreturnQuery(settings, query, function(result){
                log('Dodano produkt (id: '+ result.insertId +')');
                //return result.insertId;
                callback(0);
            });
        }else{
            log('Sprawdzono w bazie (id: '+ rows[0].id +')',1);
            //console.log(rows);
            //return rows[0].id;
            callback(rows[0].id);
        }
    });  
};