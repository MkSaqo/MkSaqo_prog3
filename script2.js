var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var forEach = require('async-foreach').forEach;
var http = require('http');

var kinoneri_linker = require("./data/kinoneri_linker.json");
var files = require("./data/nkarneri_linker.json");
var f = "data/kinoneri_anunner.json";
var uploadDir = "nkarner/nkar";
var kinoneri_anunner_arr = [];

forEach(kinoneri_linker, function (link, index, arr) {
    request(link, function (error, response, page) {
        index1 = index;
        kinoneri_anunner_arr.push(collectData(page, link));
        // if (index == arr.length - 1) {
            fs.writeFile(f, JSON.stringify(kinoneri_anunner_arr));
        // }

    });
   

});
function collectData(innerPage, currURL) {
    var pageData;
    var $ = cheerio.load(innerPage);
    var name = $(".rl-2").eq(0).text();
    var date = $(".rl-2").eq(1).text();
    var country = $(".rl-2").eq(2).text();
    var genres = $(".rl-2").eq(3).text();
    var jam = $(".rl-2").eq(4).text();
    var prasmotr = $(".rl-2").eq(5).text();
    var glavni = $(".rl-2").eq(6).text();
    var desc = $("[itemprop='description']").text();
    // ______________________________________________________________-
    // ______________________________________________________________-
    var file = fs.createWriteStream(uploadDir + index1 + ".jpg");
    var request1 = http.get(files[index1], function (response) {
        response.pipe(file);
    });
    // ______________________________________________________________-
    // ______________________________________________________________-
    pageData = {
        "id": index1,
        "name": name,
        "date": date,
        "country": country,
        "genres": genres,
        "jam": jam,
        "prasmotr": prasmotr,
        "glavni": glavni,
        "desc": desc,
        "url": currURL
    };
    console.log(index1 + "--------------------------" + name + "-----------------------------------------");
    return pageData;
}