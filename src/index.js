const express = require('express');
const app = express();
const fileSystem = require('fs');
const path = require('path');
const zlib = require('zlib');
const {Readable} = require("stream");
const port = '3000';
const APIS = ['mock-token'];

/* GET home page. */
app.get('/', function (req, res, next) {
    res.send('Hello Mock server !');
});

let address = process.env.IP;
let localServer = 'http://' + address + ':' + port;
console.log("ip address = " + localServer);
prepareRouter();
app.listen(port);

function prepareRouter() {
    console.log('prepareRouter...');
    APIS.forEach(
        function (apiName) {
            app.get('/' + apiName, function (req, res, next) {
                let filePath = path.join(__dirname, 'response_data/' + apiName + '.json');
                let readStream = fileSystem.createReadStream(filePath);
                mockResponse(res, readStream)
            });

            app.post('/' + apiName, function (req, res, next) {
                let filePath = path.join(__dirname, 'response_data/' + apiName + '.json');
                let readStream = fileSystem.createReadStream(filePath);
                mockResponse(res, readStream)
            });
        }
    );

    // todo 特殊api 回傳對應內容

}

function mockResponse(res, readStream) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200, {'Content-Encoding': 'gzip'});
    readStream.pipe(zlib.createGzip()).pipe(res);
}
