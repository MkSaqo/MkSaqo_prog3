var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var forEach = require('async-foreach').forEach;
var http = require('http');

var kinoneri_linker = require("./data/kinoneri_linker.json");
var files = require("./data/nkarneri_linker.json");
var f = "data/kinoneri_anunner.json";
var uploadDir = "nkarner/";
var kinoneri_anunner_arr = [];

forEach(kinoneri_linker, function (link, index, arr) {
    request(link, function (error, response, page) {
        index1 = index;
        kinoneri_anunner_arr.push(collectData(page, link));
        if (index == arr.length - 1) {
            fs.writeFile(f, JSON.stringify(kinoneri_anunner_arr));
        }

    });

});

function collectData(innerPage, currURL) {
    var pageData;
    var $ = cheerio.load(innerPage);
    var name = $(".r-1 .rl-2 [itemprop='name']").text();
    var country = $(".r-1 .rl-2 [rel='tag']").text();
    var genres = $(" [itemprop='genre'] ").text();
    var date = $("[itemprop='dateCreated']").text();
    var desc = $("[itemprop='description']").text();
    var a = country.split(" ");
    // ______________________________________________________________-
    // ______________________________________________________________-
    var hasce = uploadDir + "nkar" + index1 + ".jpg";
    var file = fs.createWriteStream(uploadDir + "nkar" + index1 + ".jpg");
    var request1 = http.get(files[index1], function (response) {
        response.pipe(file);
    });
    // ______________________________________________________________-
    // ______________________________________________________________-
    pageData = {
        "id": index1,
        "name": name,
        "country": a[0],
        "genres": genres,
        "date": date,
        "desc": desc,
        "home_img": hasce,
        "url": currURL
    };
    // console.log(i + "--------------------------" + name + "-----------------------------------------");
    return pageData;
}

