var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var f = "data/kinoneri_linker.json";
var n = "data/nkarneri_linker.json";

if (fs.existsSync(f) && fs.statSync(f).size > 10) {
    var kinoner = require("./data/kinoneri_linker.json");
}
else {
    fs.appendFile(f, "[]");
    fs.appendFile(n, "[]");
    var kinoner_arr = [];
    var nkarner_arr = [];
}
// for (var k=2012; k<= 2012; k++){
    for (var j=1; j<=3; j++){
    url = "http://gidonline.in/year/in-2017/page/"+j+"/";
        request.get(url, function(error, response, page) {

            var $ = cheerio.load(page);
            var list = $(".mainlink");
            var nkar = $(".mainlink img");
            for (var i = 0; i < list.length; i++) {
                var fullUrl =  $(list[i]).attr("href");
                if (kinoner_arr.indexOf(fullUrl) < 0) {
                    kinoner_arr.push(fullUrl);
                }
                
            }
            for (var i = 0; i < nkar.length; i++) {
                var fullUrl = "http://gidonline.in" + $(nkar[i]).attr("src");
                if (nkarner_arr.indexOf(fullUrl) < 0) {
                    nkarner_arr.push(fullUrl);
                }
                
            }
            
            console.log(kinoner_arr.length + " հատ հղում կա");
            fs.writeFile(f, JSON.stringify(kinoner_arr));
            fs.writeFile(n, JSON.stringify(nkarner_arr));

        });
    }

    // files.forEach(function (fileName) {
    //     i++;
    //     var file = fs.createWriteStream(uploadDir + "nkar" + i + ".jpg");
    //     var request = http.get(fileName, function (response) {
    //         response.pipe(file);
    //     });
    // });

// }
