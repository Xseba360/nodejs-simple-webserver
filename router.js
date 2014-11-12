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

function route(pathname) {
	console.log("[" + getDateTime() + "] Wykonywanie zlecenia o " + pathname);
}



exports.route = route;