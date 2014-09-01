/*
* Welcome to the biojs tutorial. 
* You can find the documentation about this tutorial here
* http://edu.biojs.net/categories/101_tutorial/index.html
*
* Can you build a parser to analyze this snippet file?
*/

var request = require("nets");

var snipspector = {};

snipspector.read = function(url, callback) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(snipspector.parse(body));
    }
  })
}

snipspector.parse = function(data) {

    if(data.indexOf('\n') >= 0 ){
      data = data.split('\n');
    }
    
   var chromosomes = [];

    // analyze snippets
    // homo(zygous): AA
    // hetero(zygous): AC
    // del(etion): A-, -A or --
    
    var chr = null;
    for (var i = 0; i < data.length; i++) {

      // ignore empty rows or comments
      if(data[i].length == 0 || data[i][0] === "#"){
        continue;
      }

      var row = data[i].split(/\s+/);
      var chrName = row[1];

      // new chromosome begins
      if( chr == null ||  chrName !== chr.name) {
        // ignore the first time
        if( chr != null ){
          chromosomes.push(chr);
        }
        chr = {homo: 0, hetero: 0, del: 0};
        chr.name = chrName;
      }

      var genotype = row[3];
      if( genotype.length == 2){
        // ignore MT
        if(genotype[0] == genotype[1] && genotype[0] != "-"){
          // homo
          chr.homo = chr.homo + 1;  
        } else if( genotype[0] !== "-" && genotype[1] !== "-"){
          // hetero
          chr.hetero = chr.hetero + 1;  
        }else{
          // del
          chr.del = chr.del + 1;  
        }
      }
    }
    // push the last item
    chromosomes.push(chr);

    return chromosomes;
}

//Should print [{name: "20", homo: 2, hetero: 1, del: 0,
// {name: "21", homo: 1, hetero: 1, del: 1}, 
// {name: "22", homo 1, hetero: 1, del: 0 }]


module.exports = snipspector; // Export the object for other components
