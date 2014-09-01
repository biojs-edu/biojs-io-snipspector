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
      var data = body.split("\n");
      callback(snipspector.parse(data));
    }
  })
}

snipspector.parse_static = function(){
    var data = ["rs5747620	20	15412698	TT",
    "rs9605903	20	15434720	CC",
    "rs2236639	20	15452483	GC",
    "rs5747999	21	15455353	AA",
    "rs11089263	21	15467656	A-",
    "rs2096537	21	15474749	AC",
    "rs9604959	22	15479107	CG",
    "rs9604967	22	15492342	CC"];
    return snipspector.parse(data); 
}

snipspector.parse = function(data) {
    
   var chromosomes = [];

    // analyze snippets
    // homo(zygous): AA
    // hetero(zygous): AC
    // del(etion): A-, -A or --
    
    var chr = null;
    for (var i = 0; i < data.length; i++) {

      // ignore empty rows
      if(data[i].length == 0){
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

      var residues = row[3];
      if( residues.length == 2){
        // ignore MT
        if(residues[0] == residues[1]){
          // homo
          chr.homo = chr.homo + 1;  
        } else if( residues[0] != "-" && residues[1] != "-"){
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
