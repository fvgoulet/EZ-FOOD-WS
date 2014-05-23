/**
 * Created by Félix on 2014-05-23.
 */

var http = require('http');
var port = process.env.port || 1337;
var fs = require('fs');
var index = fs.readFileSync('../html/index.html');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(index);
}).listen(port);
