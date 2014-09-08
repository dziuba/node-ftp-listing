GLOBAL.prepareProducts = function(products, artists, carriers, callback){
    var data = [];
    var search;
    var i = 1;
    artists.forEach(function(art){
        var tmp = {
            id: art.id,
            name: art.symfonia_name,
            //products: [],
            titles: [],
            carriers: []
        };
        var titles = [];
        var titlesClean = [];
        var carriers = [];
        
        products.forEach(function(prod){
            //if(el.titleBracket !== null) log(el.titleBracket);
            if(!strcmp(art.symfonia_name, prod.artist)){
                if(prod.titleClean !== null)
                    if(!searchFor(titlesClean, prod.titleClean.replace(/ /g, ''))){
                        titles.push(prod.titleClean);
                        titlesClean.push(prod.titleClean.replace(/ /g, ''));
                    }
                //tmp.products.push(prod);
                if()
            }
                
        });
        tmp.titles = titles;
        if(art.symfonia_name === "BETHEL") search = tmp;
        data.push(tmp);
        
        if(i === artists.length) callback(search);
        
        i++;
    });
};