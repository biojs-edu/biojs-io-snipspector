var assert = require("chai").assert;
var snip = require("../");

// you can find more docu about mocha here
// https://visionmedia.github.io/mocha/

var nock = require('nock')
var testURL = 'http://an.url/'

var scope = nock(testURL)
  .get('/list')
  .replyWithFile(200, __dirname + '/test.file');

  var dummyObj = [{name: "20", homo: 2, hetero: 1, del: 0},
{name: "21", homo: 1, hetero: 1, del: 1}, 
{name: "22", homo: 1, hetero: 1, del: 0 }];

describe('Snipspector', function(){
  // do any init stuff here
  beforeEach(function(){
  });
  describe('parse', function(){
    it('should return match with default object', function(){
      var data = ["rs5747620	20	15412698	TT",
      "rs9605903	20	15434720	CC",
      "rs2236639	20	15452483	GC",
      "rs5747999	21	15455353	AA",
      "rs11089263	21	15467656	A-",
      "rs2096537	21	15474749	AC",
      "rs9604959	22	15479107	CG",
      "rs9604967	22	15492342	CC"];
      assert.deepEqual(snip.parse(data), dummyObj);
    });
  });
  it('should work with live data', function(done){
    snip.read(testURL + "list", function(parsed){
      // the dummy file contains exactly this obj
      assert.deepEqual(parsed, dummyObj);
      done(); // you need to call the done callback to resume mocha
    });
  });
});
