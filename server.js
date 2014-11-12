var http = require('http');
	url = require('url');
	fs = require('fs');

var port = 80

function getDateTime() {
	var date = new Date();

	var godz = date.getHours();
	godz = (godz < 10 ? "0" : "") + godz;
	var min = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;
	var sek	= date.getSeconds();
	sek = (sek < 10 ? "0" : "") + sek;
	return godz + ":" + min + ":" + sek;
}
var czas = getDateTime();

function start(route) {
	function onRequest(req, res) {
		var pathname = url.parse(req.url).pathname;
		if (pathname == '/') {
			pathname = '/index.html';
		}
		var ip = req.connection.remoteAddress;
		console.log('[' + getDateTime() + '] Odebrano zapytanie o ' + pathname + ' dla ' + ip);
		route(pathname);

		fs.readFile( '.' + pathname , function (err, html) {
			if (err) {
				res.writeHead(404, {
					'Content-Type': 'text/plain; charset=utf-8'
				});
				res.write('Error 404');
				res.end();	
				console.log('[' + getDateTime() + '] Blad 404 przy zapytaniu o ' + pathname)
			} else {
				if (pathname.match('.*\.html$')) {
					res.writeHead(200, {
						'Content-Type': 'text/html; charset=utf-8'
					});
					res.write(html);
					res.end();
					
					console.log('[' + getDateTime() + '] Wyslano html')
				} else {
					res.writeHead(200);
					res.write(html);
					res.end();
					
					console.log('[' + getDateTime() + '] Wyslano plik')
				}
			}
		})
	}
	http.createServer(onRequest).listen(port);
	console.log('[' + getDateTime() + '] Serwer uruchomiony na porcie ' + port)
}

exports.start = start;