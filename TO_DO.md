Lista rzeczy do zrobienia
=========================
A. Import produktów do sklepu

1. Otwórz plik sm.csv
2. Wczytaj parametry do tablicy
3. Rozszyfruj nazwę produktu i ean. Przygotuj grupę jeżeli trzeba.
4. Połącz się z bazą i sprawdź czy produkt jest już w bazie.
5. Jeżeli tak to aktualizuj jego stan/nazwę/itd
6. Jeżeli nie to go dodaj sprawdzając czy ma już swoją grupę.

B. Export zamówień

1. Wczytaj zamówienia do przyjęciaz bazy danych.
2. Wczytaj istniejący plik zamówień.
3. Sparuj obie tablice.
4. Zapisz do pliku csv.


/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 /*var Client = require('ftp');

  var c = new Client();
  c.on('ready', function() {
    c.list(function(err, list) {
      if (err) throw err;
      //console.dir(list);
      //console.log(list[0].name);
      list.forEach(function(el){
         console.log(el.name); 
      });
      c.end();
    });
  });
  // connect to localhost:21 as anonymous
  c.connect({host: '', user: '', password: ''});
*/
