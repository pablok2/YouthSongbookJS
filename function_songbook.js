function getSong(){
	
	// Get the song name here
	var song = document.getElementById('songNameId');
	//alert(song.value);
	
	//Get this songs words (if any)
	var songWords = getSongFromHistory(song.value);
	if(songWords == "")
	{
		//continue
	}
	else
	{
		//Send the title and the words to a new page
		alert("Send the title and the words to a new page");
	}	
	
	//No input
	if(song.value == ""){
		alert('Please enter a song name.');
	}
	else
	{
		//Get json and add to local storage
		var jqxhr = $.getJSON( "songs2.json", function(data) {
			$.each( data, function( key, val ) {
				
				// Add song to the local storage
				setSaveSong(key, val);
				
				// Add to title list
				addTitle(key);
			});
		})
		.done(function() {
				alert( "done" );
		})
		.fail(function() {
				alert( "error" );
		})
		.always(function() {
				alert( "complete" );
		});
	
		// Set another completion function for the request above
		jqxhr.complete(function() {
			alert( "did it's thing bro" );
		});
	}
}


//store songs in local history
function setSaveSong(localSongName, localSongWords) {
	localStorage[localSongName] = localSongWords;
}

//Add title to the stored array
function addTitle(titleData){
	var songTitles = getSongTitles();
	songTitles.unshift(titleData);
	localStorage["songTitles"] = JSON.stringify(songTitles);
}

//get titles from local history
function getSongTitles() {
	
	var titleHistory = [];
	var titles = localStorage["songTitles"];
	
	if(typeof titles != "undefined"){
		var titleHistory = JSON.parse(titles);
	}
	
	return titleHistory;
}

//Retrieve the stored history
function getSongFromHistory(songName){
	
	var songHistory = [];	
	var songHistoryString = localStorage[songName];
	
	if (typeof songHistoryString != "undefined") {
		songHistory = songHistoryString;
	}
	
	return songHistory;
}
