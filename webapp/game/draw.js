function draw_game(game_string_json) {
	console.log(game_string_json)
	var game_state = JSON.parse(game_string_json)
	var white_pieces_amount = game_state.white.length
	var green_pieces_amount = game_state.green.length

	var x_a = "6.25%"
	var x_b = "18.75%"
	var x_c = "31.25%"
	var x_d = "43.75%"
	var x_e = "56.25%"
	var x_f = "68.75%"
	var x_g = "81.25%"
	var x_h = "93.75%"

	var y_1 = "93.75%"
	var y_2 = "81.25%"
	var y_3 = "68.75%"
	var y_4 = "56.25%"
	var y_5 = "43.75%"
	var y_6 = "31.25%"
	var y_7 = "18.75%"
	var y_8 = "6.25%"

	var string = ""

	game_state.white.forEach((item) => {
		Object.entries(item).forEach(([key, val]) => {
			console.log('key-${key}-val-${JSON.stringify(val)}')
		})
	})

	var white
	var green

	

	document.getElementById("test").innerHTML += string
}
/*
<!-- Starting position -->
		<!-- White -->
		<g class="w_piece" id="b8">
			<circle cx="18.75%" cy="6.25%" r="5%" fill="white"/>
		</g>
		<g class="w_piece" id="d8">
			<circle cx="43.75%" cy="6.25%" r="5%" fill="white"/>
		</g>
		<g class="w_piece" id="f8">
			<circle cx="68.75%" cy="6.25%" r="5%" fill="white"/>
		</g>
		<g class="w_piece" id="d8">
			<circle cx="93.75%" cy="6.25%" r="5%" fill="white"/>
		</g>

		<g class="w_piece" id="a7">
			<circle cx="6.25%" cy="18.75%" r="5%" fill="white"/>
		</g>
		<g class="w_piece" id="c7">
			<circle cx="31.25%" cy="18.75%" r="5%" fill="white"/>
		</g>
		<g class="w_piece" id="e7">
			<circle cx="56.25%" cy="18.75%" r="5%" fill="white"/>
		</g>
		<g class="w_piece" id="g7">
			<circle cx="81.25%" cy="18.75%" r="5%" fill="white"/>
		</g>

		<g class="w_piece" id="b6">
			<circle cx="18.75%" cy="31.25%" r="5%" fill="white"/>
		</g>
		<g class="w_piece" id="d6">
			<circle cx="43.75%" cy="31.25%" r="5%" fill="white"/>
		</g>
		<g class="w_piece" id="f6">
			<circle cx="68.75%" cy="31.25%" r="5%" fill="white"/>
		</g>
		<g class="w_piece" id="d6">
			<circle cx="93.75%" cy="31.25%" r="5%" fill="white"/>
		</g>

		<!-- Green -->
		<g class="g_piece" id="a3">
			<circle cx="6.25%" cy="68.75%" r="5%" fill="green"/>
		</g>
		<g class="g_piece" id="c3">
			<circle cx="31.25%" cy="68.75%" r="5%" fill="green"/>
		</g>
		<g class="g_piece" id="e3">
			<circle cx="56.25%" cy="68.75%" r="5%" fill="green"/>
		</g>
		<g class="g_piece" id="g3">
			<circle cx="81.25%" cy="68.75%" r="5%" fill="green"/>
		</g>

		<g class="g_piece" id="b2">
			<circle cx="18.75%" cy="81.25%" r="5%" fill="green"/>
		</g>
		<g class="g_piece" id="d2">
			<circle cx="43.75%" cy="81.25%" r="5%" fill="green"/>
		</g>
		<g class="g_piece" id="f2">
			<circle cx="68.75%" cy="81.25%" r="5%" fill="green"/>
		</g>
		<g class="g_piece" id="d2">
			<circle cx="93.75%" cy="81.25%" r="5%" fill="green"/>
		</g>

		<g class="g_piece" id="a1">
			<circle cx="6.25%" cy="93.75%" r="5%" fill="green"/>
		</g>
		<g class="g_piece" id="c1">
			<circle cx="31.25%" cy="93.75%" r="5%" fill="green"/>
		</g>
		<g class="g_piece" id="e1">
			<circle cx="56.25%" cy="93.75%" r="5%" fill="green"/>
		</g>
		<g class="g_piece" id="g1">
			<circle cx="81.25%" cy="93.75%" r="5%" fill="green"/>
		</g>

*/


//FileSystemAPI

window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

window.requestFileSystem(type, size, successCallback, opt_errorCallback)



//function onInitFs(fs) {
//	console.log('Opened file system: ' + fs.name);
  //}
  
  //window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, onInitFs, errorHandler);



  function onInitFs(fs) {

	fs.root.getFile('log.txt', {create: true}, function(fileEntry) {
  
	  // Create a FileWriter object for our FileEntry (log.txt).
	  fileEntry.createWriter(function(fileWriter) {
  
		fileWriter.onwriteend = function(e) {
		  console.log('Write completed.');
		};
  
		fileWriter.onerror = function(e) {
		  console.log('Write failed: ' + e.toString());
		};
  
		// Create a new Blob and write it to log.txt.
		var blob = new Blob([game_string_json], {type: 'text/plain'});
  
		fileWriter.write(blob);
  
	  }, errorHandler);
  
	}, errorHandler);
  
  }
  
  window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);

function errorHandler(e) {
	var msg = '';
  
	switch (e.code) {
	  case FileError.QUOTA_EXCEEDED_ERR:
		msg = 'QUOTA_EXCEEDED_ERR';
		break;
	  case FileError.NOT_FOUND_ERR:
		msg = 'NOT_FOUND_ERR';
		break;
	  case FileError.SECURITY_ERR:
		msg = 'SECURITY_ERR';
		break;
	  case FileError.INVALID_MODIFICATION_ERR:
		msg = 'INVALID_MODIFICATION_ERR';
		break;
	  case FileError.INVALID_STATE_ERR:
		msg = 'INVALID_STATE_ERR';
		break;
	  default:
		msg = 'Unknown Error';
		break;
	};
  
	console.log('Error: ' + msg);
  }



