const fs = require('fs');
const process = require('process');
const axios = require('axios');
var validUrl = require('valid-url');


// async function webCat(url) {
//     try {
//         let resp = await axios.get(url)
//         console.log(resp.data)
//     } catch (err) {
//         console.error(err);
//         process.exit(1);
//     }
// }


// function cat(path) {
//     fs.readFile(path, "utf8", function (err, data) {
//         if (err) {
//             console.error(err);
//             process.exit(1);
//         }
//         console.log(data);
//     });
// }

// if (validUrl.isUri(process.argv[2])) {
//     webCat(process.argv[2]);
// } else {
//     cat(process.argv[2]);
// }

// if (process.argv[2] == '--out') {
//     fs.writeFile(process.argv[3], content, "utf8", function (err) {
//         if (err) {
//             console.error(err);
//             process.exit(1);
//         }
//         console.log('Successfully wrote to file!');
//     });

// } my attempt at step 3. Below is the correct solution, with my comments explaining the code.


function handleOutput(text, out) { //add out var to func
    if (out) {
        fs.writeFile(out, text, 'utf8', function (err) { //writing using out err
            if (err) {
                console.error(`Couldn't write ${out}: ${err}`); //err handling
                process.exit(1);
            }
        });
    } else {
        console.log(text); //console logging the result
    }
}

/** read file at path and print it out. */

function cat(path, out) { //getting path with out
    fs.readFile(path, 'utf8', function (err, data) { //passing in the path
        if (err) {
            console.error(`Error reading ${path}: ${err}`); //err handing
            process.exit(1);
        } else {
            handleOutput(data, out); //calling handleOutput so out is handled
        }
    });
}

/** read page at URL and print it out. */

async function webCat(url, out) { //reading page at url now
    try {
        let resp = await axios.get(url);
        handleOutput(resp.data, out); //calling handleOutput here so data is read properly using out var
    } catch (err) { //err handling
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path; //declaring path and out vars so logic can reach command line
let out;

if (process.argv[2] === '--out') { //this is the non url option
    out = process.argv[3]; //assigning the vars by their position in the command line
    path = process.argv[4];
} else {
    path = process.argv[2]; //going back to regular way of handling otherwise
}

if (path.slice(0, 4) === 'http') { //iding the url using slice
    webCat(path, out); //calling the funcs
} else {
    cat(path, out);
}