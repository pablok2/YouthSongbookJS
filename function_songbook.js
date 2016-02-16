// get session info about selected song
function openSongInNewPage()
{
	var selSongName = sessionStorage.getItem('selectedSongName');
	var songWords = getSongFromHistory(selSongName);
	
	return songWords;
}

// Data proc
function getSong(song){
	
	// Get the song name here
	//var song = document.getElementById('songNameId');
	//alert(song.value);
	
	//Get this songs words (if any)
	var songWords = getSongFromHistory(song);
	if(songWords != "")
	{		
		//Send the title and the words to a new page
		sessionStorage.setItem('selectedSongName', song);
		var words = openSongInNewPage();
		alert(words);
	}
	else // Song is not in the local database, download them all
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
				//alert( "done" );
		})
		.fail(function() {
				//alert( "error" );
		})
		.always(function() {
				//alert( "complete" );
		});
	
		// Set another completion function for the request above
		jqxhr.complete(function() {
			//alert( "did it's thing bro" );
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

//Turn songs in history into an html list
function getSongListHtml()
{
	var titles = getSongTitles();
	var textOut = "";
	
	for(i = 0; i < titles.length; i++)
	{
		textOut += "<br><br><input type=\"button\" onClick=\"getSong(\'"+ titles[i] + "\');\"  value = \"" + titles[i] + "\" />";
	}
	
	return textOut;
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
