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
      assert.deepEqual(snip.parse_static(), dummyObj);
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
