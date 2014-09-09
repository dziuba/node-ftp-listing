GLOBAL.getOrAddProductId = function(data, callback){
   // data.forEach(function(artist)) 
   callback(data);
    
};

GLOBAL.checkAndRetunProductId = function(title, group, callback){
    var query = 'SELECT `id` FROM `products` WHERE `symfonia_name` = ? and `product_group_id` = ? LIMIT 0,1';
    var inserts = [title.replace(/ /g, ''), group];
    query = settings.mysql.format(query, inserts);
    //log(query,1);
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
            //log('Sprawdzono w bazie (id: '+ rows[0].id +')',1);
            //console.log(rows);
            //return rows[0].id;
            callback(rows[0].id);
        }
    });  
};