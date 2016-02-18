// get session info about selected song
function openSongInNewPage()
{
	var selSongName = sessionStorage.getItem('selectedSongName');
	var songWords = getSongFromHistory(selSongName);	
	return songWords;
}

// current session song name
function currectSongTitle()
{
	var selSongName = sessionStorage.getItem('selectedSongName');	
	return selSongName;
}

// Data proc
function getSong(song){
	
	//Get this songs words (if any)
	var songWords = getSongFromHistory(song);
	if(songWords != "")
	{		
		//Send the title and the words to a new page
		sessionStorage.setItem('selectedSongName', song);
		
		// redirect to the words page
		window.location = "songpage.html";
	}
	else // Song is not in the local database, download them all
	{
		// song not here
		
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

function checkForSongs()
{
	var titles = localStorage["songTitles"];
	
	if(typeof titles == "undefined"){
		downloadSongs();
		alert("Loading songs...");
		
		//refresh the screen
		window.location = "index.html";
	}
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

// JSON data retrieval and local saving
function downloadSongs()
{
	// download all the songs
	
	//clear the titles
	localStorage.removeItem("songTitles");
	
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
