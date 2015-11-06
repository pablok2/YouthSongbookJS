function getZipCity(){
	var zip = document.getElementById('zipLabel');
	var city = document.getElementById('cityLabel');
	
	//No input
	if(zip.value == "" && city.value == ""){
		alert('No input provided.');
	}
	
	//Zip lookup
	else if(city.value == ""){
		var zipString = zip.value;
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
	
	//City lookup
	else if(zip.value == ""){
		var cityString = city.value;
		addCity(cityString);
		
		//encode to URI percent encoding
		var encodedCity = encodeURIComponent(cityString);
				
		// Construct your YQL query:
		var query = "select * from rss where url='http://news.google.com/news?geo="
		+ encodedCity + "&output=rss' limit 1";
 
		// Define your JSONP callback:
		var callback = function(data) {
		var post = data.query.results.item;
		addCityURL(post.link);
		};
 
		// Instantiate with the query:
		var resultPost = new YQLQuery(query, callback);
 
		// If you're ready then go:
		resultPost.fetch();
		
		getWeatherCity();
	}
	
	//Both zip and city fields are populated
	else{
		alert('Please enter either zip or city but not both.');
	}
}

//retrieve the users position in HTML5
function showLocation() {
   // One-shot position request.
   navigator.geolocation.getCurrentPosition(callback);

}
 
 //coordinates for lat,long
function callback(position) {
   document.getElementById('latitude').innerHTML = position.coords.latitude;
   document.getElementById('longitude').innerHTML = position.coords.longitude;
	
}

//get the weather for a zip code
function getWeather(textField){
	
	// Construct accuweather query to retrieve the jsonp using YQL:
	var query = "select * from rss where url='http://rss.accuweather.com/rss/liveweather_rss.asp?locCode="+ textField +"' limit 1";
 
	// Define your callback:
	var callback = function(data) {
	var post = data.query.results.item;
	
	//Post the current weather
	alert(post.title);
	};
 
	// Instantiate with the query:
	var resultPost = new YQLQuery(query, callback);
 
	// If you're ready then go:
	resultPost.fetch();
	
}


//geocoder
function getMobile(){

	var geocoder = new google.maps.Geocoder();
	//var latlng = new google.maps.LatLng(43.730,-70.997);
	var latVar = document.getElementById('latitude');
	var longVar = document.getElementById('longitude');
	
	var latlng = new google.maps.LatLng(latVar.value,longVar.value);

      if (geocoder) {
         geocoder.geocode({'latLng': latlng}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              alert(results[2].address_components[2].long_name);
            } 
            else {
              console.log('No results found: ' + status);
            }
         });
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


// YQL serves JSONP (with a callback) so all we have to do
// is create a script element with the right 'src':
// http://james.padolsey.com/javascript/using-yql-with-jsonp/
function YQLQuery(query, callback) {
    this.query = query;
    this.callback = callback || function(){};
    this.fetch = function() {
 
        if (!this.query || !this.callback) {
            throw new Error('YQLQuery.fetch(): Parameters may be undefined');
        }
 
        var scriptEl = document.createElement('script'),
            uid = 'yql' + +new Date(),
			//encode to URI percent encoding 
            encodedQuery = encodeURIComponent(this.query.toLowerCase()),
            instance = this;
 
        YQLQuery[uid] = function(json) {
            instance.callback(json);
            delete YQLQuery[uid];
            document.body.removeChild(scriptEl);
        };
 
        scriptEl.src = 'http://query.yahooapis.com/v1/public/yql?q='
                     + encodedQuery + '&format=json&callback=YQLQuery.' + uid; 
        document.body.appendChild(scriptEl);
 
    };
}






