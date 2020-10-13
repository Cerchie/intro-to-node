const fs = require('fs');
const process = require('process');
const axios = require('axios');
var validUrl = require('valid-url');


async function webCat(url) {
    try {
        let resp = await axios.get(url)
        console.log(resp.data)
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}


function cat(path) {
    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(data);
    });
}

if (validUrl.isUri(process.argv[2])) {
    webCat(process.argv[2]);
} else {
    cat(process.argv[2]);
}