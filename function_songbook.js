function getSong(){
	
	// Get the song name here
	var song = document.getElementById('songName');
	
	//No input
	if(song.value == ""){
		alert('Please enter a song name.');
	}
	else
	{
		var songString = song.value;
		//addSongToLocal(songString);
		
		//Get the Song
		//getSong(zipString);		
		
		// Construct your query:
		var jsonFile = "http://handforyou.org/app/songs.json";
		
		var songNames = [];
		
		$.getJSON(jsonFile, function(data){			
			$.each( data, function( key, val ) {
				songNames[i] = key;
				
				//items.push( "<li id='" + key + "'>" + val + "</li>" );
			}
		);
		
		alert(songNames);
		//var obj = JSON.parse(jsonFile);

		//alert(obj.count);
 
		// Define your callback:
		//var callback = function(data) {
		//var post = data.query.results.item;
		//addZipURL(post.link);
		//};
	}
}


//store elements in local history
function setSavedZip(localZip) {
	localStorage['localZip'] = localZip;
}

//Delete the cached history
function removeHistory(){
	localStorage.removeItem("localZip");
}

//store the Song and the associated URL in local history
function addSongToLocal(stringSong){
	var zipHistory = getSongHistory();
	zipHistory.unshift(zipData);
	localStorage["localZip"] = JSON.stringify(zipHistory);
}

//Retrieve the stored history
function getSongHistory(){
	var songHistory = [];
	var songHistoryString = localStorage["localSongs"];
	
	if (typeof zipHistoryString != "undefined") {
		songHistory = JSON.parse(zipHistoryString);
	}
	return songHistory;
}






