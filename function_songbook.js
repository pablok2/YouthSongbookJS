function getSong(){
	
	// Get the song name here
	var song = document.getElementById('songNameId');
	alert(song.value);
	
	//No input
	if(song.value == ""){
		alert('Please enter a song name.');
	}
	else
	{
		var songString = song.value;
		//addSongToLocal(songString);

		var itemsArray = [];

		var jqxhr = $.getJSON( "songs2.json", function(data) {
			var itemsT = [];
  			$.each( data, function( key, val ) {
    				itemsT.push( "<li id='" + key + "'>" + val + "</li>" );
  			});
			itemsArray = itemsT;
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
  			for (i = 0; i < itemsArray.length; i++) { 
    				alert(itemsArray[i]);
			}
		});		
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
