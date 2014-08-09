//var dateFormat = require('dateformat');

GLOBAL.parseCSV = function(fs, file, callback){
      
    fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err;
    
    log('Rozpoczynam przetwarzanie CSV Produkty.');
    
    var lines = data.split('\r\n');
    var csvArray = [];
    var i = 0;
    var csvObj;
    var cEan = 0;
    
    // Rozszyfruj CSV
    lines.forEach(function(el){
        /*if(i % 1000 === 0){
            now = new Date();
            console.log(dateFormat(now, "yyyy-mm-dd HH:MM:ss") + ': Przetworzono ' + i + ' produktów.');
        }*/
        
        var row = el.split(';');
        var name = row[0].split(' ^^^ ');
        //console.log(row[1].length);
        if(typeof row[1] !== 'undefined'){
            if(row[1].length === 13){
                if(checkEan13(row[1])){ 
                //var c = generateCarrier(row[6]);
                csvObj = {
                    artist: name[0],
                    title: name[1],
                    ean1: row[1],
                    price: row[2],
                    quantity: row[3],
                    ean2: row[4],
                    vat: row[5],
                    carrier: generateCarrier(row[6]),
                    supplier: row[7],
                    producer: row[8],
                    year: row[9],
                    code: row[10],
                    genere: row[11],
                    notes: row[12],
                    quantityPrice: row[13]
                };

            //console.dir(csvObj.carrier);
                csvArray[i] = csvObj;
                //console.log((lines.length-cEan) +' '+ i);
                if((lines.length-cEan) === (i+3)){
                    now = new Date();
                    log('Przetworzono CSV [' + (i+1) +' produktów].');
                    callback(csvArray);
                }

                i++;
                }else{
                    //log('EAN: błędny ['+ row[1] +']', 1);
                    cEan++;
                }
            }else{
                //log('EAN: zła długość ['+ row[1] +']', 1);
                cEan++;
            }
        }else{
            //log('Błędny EAN: '+ row[1]);
            cEan++;
        }
        
      });

    
    });
    
};