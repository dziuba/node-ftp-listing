
GLOBAL.returnQuery = function(settings, query, callback){
    var connection = settings.mysql.createConnection(settings.mysqlSettings);
    connection.connect();
    connection.query(query, function(err, rows, fields) {
          if (err) throw err;
          
          connection.end();
          callback(rows);
        }); 
};

GLOBAL.nonreturnQuery = function(settings, query, callback){
    var connection = settings.mysql.createConnection(settings.mysqlSettings);
    connection.connect();
    connection.query(query, function(err, result) {
          if (err) throw err;
          
          connection.end();
          callback(result);
        }); 
};

GLOBAL.makeQueryNewArtists = function(artists, callback){
    var dateFormat = require('dateformat');
    var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    var mysql = require('mysql');
    var query = ''; 
    var i = 1;
    artists.forEach(function(el){
        var sql = "INSERT INTO `artists` (`name`, `symfonia_name`, `created`, `modified`) VALUES (?,?,?,?);";
        var inserts = [el, el, datetime, datetime];
        sql = mysql.format(sql, inserts);
        query +=sql;
        
        if(artists.length === i) callback(query);
        i++;
    });
};

GLOBAL.makeQueryNewCarriers = function(carriers, callback){
    var dateFormat = require('dateformat');
    var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    var mysql = require('mysql');
    var query = ''; 
    var i = 1;
    var sql;
    carriers.forEach(function(el){
        if(i === 1){
            sql = "INSERT INTO `carriers` (`name`, `created`, `modified`) VALUES (?,?,?)";
        }else{
            sql = ', (?,?,?)';
        }
       
        var inserts = [el, datetime, datetime];
        sql = mysql.format(sql, inserts);
        query +=sql;
        
        if(carriers.length === i) callback(query);
        i++;
    });
};
