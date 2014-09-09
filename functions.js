// Szukaj w tablicy
GLOBAL.searchFor = function(list, query){
        var found = false;
        list.forEach(function(el){
           if(el === query){
               found = true;
               return found;
           } 
        });
        
        return found;
    };
    
GLOBAL.searchForInObject = function(object, param, query, callback){
    var found = false;
    object.forEach(function(el){
       if(eval('el.'+param) === query){
           found = true;
           callback(found);
           return found;
       }
    });

    callback(found); //return found;
};

// pobierz pojedynczy szukany objekt
GLOBAL.searchForInObjectAndReturn = function(object, param, query, callback){
    var found = false;
    object.forEach(function(el){
       if(eval('el.'+param) === query){
           found = true;
           callback(el);
       }
    });

    callback(found); //return found;
};
    
// Porównaj string
GLOBAL.strcmp = function(str1, str2 ) {
        return ( ( str1 === str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
    };
    
// Sprawdź poprawność eanu
GLOBAL.checkEan13 = function(ean){
    var sum = parseInt(ean[0])*1+
            parseInt(ean[1])*3+
            parseInt(ean[2])*1+
            parseInt(ean[3])*3+
            parseInt(ean[4])*1+
            parseInt(ean[5])*3+
            parseInt(ean[6])*1+
            parseInt(ean[7])*3+
            parseInt(ean[8])*1+
            parseInt(ean[9])*3+
            parseInt(ean[10])*1+
            parseInt(ean[11])*3;
    
    sum %= 10;
    sum = 10 - sum;
    sum %= 10;

    if (sum === parseInt(ean[12])) {
        return 1;
    }
    else {
        return 0;
    }

};


GLOBAL.log = function(msg, type){
    type = typeof type !== 'undefined' ? type : 0;
    
    var dateFormat = require('dateformat');
    var clc = require('cli-color');
    
    var error = clc.redBright;
    var good = clc.greenBright;
    //var warn = clc.yellow;
    //var notice = clc.blue;
    var bold = clc.bold;
    
    if(type === 0)
        console.log(bold(dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")) + ' ' + msg);
    else if(type === 2)
        console.log(bold(dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")) + ' ' + good(msg));
    else
        console.log(bold(dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")) + ' ' + error(msg));
};

GLOBAL.removeDoubleFromObject = function(array, param, callback){
    var list = [];
    var i = 1;
    array.forEach(function(el){
        if(eval("!searchFor(list, el."+ param +")")) {
            eval("list.push(el."+ param +");");
        }
        if(array.length === i){
            callback(list);
        }
        i++;
    });
};

GLOBAL.newArrayFrom2ArraysA = function(arrayA, arrayB, callback){
    var i = 1;
    var list = [];
    arrayA.forEach(function(el){
        if(!searchFor(arrayB, el))
            list.push(el);
        
        if(arrayA === i) callback(list);
        i++;
    });
};

GLOBAL.removeObjectParamFromArray = function(array, object, param, callback){
    var i = 1;
    var list = [];
    array.forEach(function(el){
        if(i % 2500 === 0) log('Sprawdzono '+ Math.round((i/array.length)*10000)/100 +'%');
        searchForInObject(object, param, el, function(f){      
            if(!f) list.push(el);
        });
        if(array.length === i) callback(list);
        i++;
    });
};

