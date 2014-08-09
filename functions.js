// Dzieli nośniki na objekt

GLOBAL.generateCarrier = function(carrier){
    if(typeof carrier !== 'undefined'){
        var tmp = carrier.split("+");
        //console.log(tmp);
        var tmp2 = [];
        tmp.forEach(function(el){
            var q = el.replace(/[a-zA-Z]/, ""); 
            var c = el.replace(/[0-9]/, ""); 
            if(parseInt(q) >= 0) q = parseInt(q); else q = 1;
            var tmp3 = {
                type: c,
                quantity: q
            };
            tmp2.push(tmp3);
        });
        return tmp2;
    }
    return null;
};


// Szukaj w tablicy
GLOBAL.searchFor = function(list, query){
        var found = false;
        list.forEach(function(el){
           if(el === query){
               found = true;
           } 
        });
        
        return found;
    };
    
// Porównaj string
GLOBAL.strcmp = function(str1, str2 ) {
        return ( ( str1 === str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
    }
    
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
    //var warn = clc.yellow;
    //var notice = clc.blue;
    var bold = clc.bold;
    
    if(type === 0)
        console.log(bold(dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")) + ' ' + msg);
    else
        console.log(bold(dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")) + ' ' + error(msg));
};

GLOBAL.removeDoubleFromObject = function(array, param, callback){
    var list = [];
    var i = 0;
    array.forEach(function(el){
        if(eval("!searchFor(list, el."+ param +")")) {
            eval("list.push(el."+ param +");");
        }
        if(array.length === (i+1)){
            callback(list);
        }
        i++;
    });
};