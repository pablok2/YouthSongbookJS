function getSong(){
	var song = document.getElementById('songName');
	
	//No input
	if(song.value == ""){
		alert('Please enter a song name.');
	}
	else
	{
		var songString = song.value;
		addZip(zipString);
		
		//Get the ZIP weather
		getWeather(zipString);		
		
		// Construct your query:
		var query = "select * from rss where url='http://news.google.com/news?geo="
		+ zipString + "&output=rss' limit 1";
 
		// Define your callback:
		var callback = function(data) {
		//var post = data.query.results.item;
		var post = data.query.results.item;
		addZipURL(post.link);
		};
 
		// Instantiate with the query:
		var resultPost = new YQLQuery(query, callback);
 
		// If you're ready then go:
		resultPost.fetch();
	}
}


//store elements in local history
function setSavedZip(localZip) {
	localStorage['localZip'] = localZip;
}
function setSavedCity(localCity) {
	localStorage['localCity'] = localCity;
}
function setSavedMobile(localMobile) {
	localStorage['localMobile'] = localMobile;
}

//Delete the cached history
function removeHistory(){
	localStorage.removeItem("localZip");
	localStorage.removeItem("localZipURL");
	localStorage.removeItem("localCity");
	localStorage.removeItem("localCityURL");
	localStorage.removeItem("localMobile");
}

//store the Zip and the associated URL in local history
function addZip(zipData){
	var zipHistory = getZipHistory();
	zipHistory.unshift(zipData);
	localStorage["localZip"] = JSON.stringify(zipHistory);
}
function addZipURL(zipURLData){
	var zipURLHistory = getZipURLHistory();
	zipURLHistory.unshift(zipURLData);
	localStorage["localZipURL"] = JSON.stringify(zipURLHistory);
}

//Store the City and the associated URL in local history
function addCity(cityData){
	var cityHistory = getCityHistory();
	cityHistory.unshift(cityData);
	localStorage["localCity"] = JSON.stringify(cityHistory);
}
function addCityURL(cityURLData){
	var cityURLHistory = getCityURLHistory();
	cityURLHistory.unshift(cityURLData);
	localStorage["localCityURL"] = JSON.stringify(cityURLHistory);
}

//Retrieve the stored history
function getZipHistory(){
	var zipHistory = [];
	var zipHistoryString = localStorage["localZip"];
	
	if (typeof zipHistoryString != "undefined") {
		zipHistory = JSON.parse(zipHistoryString);
	}
	return zipHistory;
}
function getZipURLHistory(){
	var zipURLHistory = [];
	var zipURLHistoryString = localStorage["localZipURL"];
	
	if (typeof zipURLHistoryString != "undefined") {
		zipURLHistory = JSON.parse(zipURLHistoryString);
	}
	return zipURLHistory;
}
function getCityHistory(){
	var cityHistory = [];
	var cityHistoryString = localStorage["localCity"];
	
	if (typeof cityHistoryString != "undefined") {
		cityHistory = JSON.parse(cityHistoryString);
	}
	return cityHistory;
}
function getCityURLHistory(){
	var cityURLHistory = [];
	var cityURLHistoryString = localStorage["localCityURL"];
	
	if (typeof cityURLHistoryString != "undefined") {
		cityURLHistory = JSON.parse(cityURLHistoryString);
	}
	return cityURLHistory;
}

//Update the previously searched list of Zips
function refreshZipHistory() {
	
	var zipList = document.getElementById('htmlZipList');
	// Remove zip history list
	while (zipList.firstChild) {
		zipList.removeChild(zipList.firstChild);
	}

	//Add all history elements...
	var zipHistoryElements = getZipHistory();
	var zipURLHistoryElements = getZipURLHistory();
	for (var i = 0; i < zipHistoryElements.length; i++) {
		
		//Create a link that cooresponds to each Zip
		var linkElement = document.createElement("a");
		linkElement.href = zipURLHistoryElements[i];
		var textNode = document.createTextNode(zipHistoryElements[i] + " news");
		linkElement.appendChild(textNode);
		zipList.appendChild(linkElement);
		zipList.appendChild(document.createElement("br"));
	}
}

//Update the previously searched list of Zips
function refreshCityHistory() {
	
	var cityList = document.getElementById('htmlCityList');
	// Remove zip history list
	while (cityList.firstChild) {
		cityList.removeChild(cityList.firstChild);
	}

	//Add all history elements...
	var cityHistoryElements = getCityHistory();
	var cityURLHistoryElements = getCityURLHistory();
	for (var i = 0; i < cityHistoryElements.length; i++) {
	
		//Create a link that cooresponds to each City
		var linkElement = document.createElement("a");
		linkElement.href = cityURLHistoryElements[i];
		var textNode = document.createTextNode(cityHistoryElements[i] + " news");
		linkElement.appendChild(textNode);
		cityList.appendChild(linkElement);
		cityList.appendChild(document.createElement("br"));
	}
}






