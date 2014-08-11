GLOBAL.prepareProducts = function(callback){
    var data = [];
    var search;
    artists.forEach(function(art){
        var tmp = {
            id: art.id,
            name: art.symfonia_name,
            products: [],
            titles: []
        };
        var titles = [];
        products.forEach(function(prod){
            //if(el.titleBracket !== null) log(el.titleBracket);
            if(!strcmp(art.symfonia_name, prod.artist)){
                if(!searchFor(titles, prod.titleClean)){
                    titles.push(prod.titleClean);
                }
                tmp.products.push(prod);
            }
                
        });
        tmp.titles = titles;
        if(art.symfonia_name === "BETHEL") search = tmp;
        data.push(tmp);
    });
    console.log(search);
    log(data.length);  
};