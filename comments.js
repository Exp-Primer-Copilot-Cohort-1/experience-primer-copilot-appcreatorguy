// Create web server
// 1. Load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. Create web server
http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log(pathname);
    if (pathname == '/') {
        fs.readFile('comment.html', function(err, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
    } else if (pathname == '/comment') {
        var postData = '';
        request.on('data', function(chunk) {
            postData += chunk;
        });
        request.on('end', function() {
            var comment = qs.parse(postData);
            console.log(comment);
            fs.appendFile('comment.txt', JSON.stringify(comment), function(err) {
                if (err) {
                    console.log(err);
                }
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write('<h1>' + comment.name + '님의 댓글이 정상적으로 저장되었습니다.</h1>');
            response.end();
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('<h1>404 Page Not Found!</h1>');
        response.end();
    }
}).listen(50000, function() {
    console.log('Server Running at http://