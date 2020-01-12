class Model {
    constructor() {
    	this.startin_position = [
			[0,1,0,1,0,1,0,1],
			[1,0,1,0,1,0,1,0],
			[0,1,0,1,0,1,0,1],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[2,0,2,0,2,0,2,0],
			[0,2,0,2,0,2,0,2],
			[2,0,2,0,2,0,2,0]]
    }
}

class View {
    constructor() {
        // The root element
        this.root = document.getElementById("board");
        this.valid_pos = document.getElementsByClassName("valid_position");
        this.clicked_position = null
        for(let elem of this.valid_pos){
        	elem.addEventListener("click", e => {
        		if(this.clicked_position){
        			console.log("square ", e.target.id)
        			this.clicked_position.id = e.target.id + "aas"
        			this.clicked_position.setAttributeNS(null, "cx",getX(Number(e.target.id[1])))
        			this.clicked_position.setAttributeNS(null, "cy", getY(Number(e.target.id[0])))
        			this.clicked_position = null
        		}
        	})
        }
    }
    // create element with custom css element
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }
        return element;
    }

    // Retrieve an element from the DOM
    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    draw_game(position) {
		// removing old pieces
		var old_pieces = document.getElementsByClassName('piece')
		while(old_pieces.length > 0){
	        old_pieces[0].parentNode.removeChild(old_pieces[0]);
	    }
	    var svgns = "http://www.w3.org/2000/svg"
		// prepare svg object string
		var piece_c = ""
		for(let i = 0; i < 8; i++) {
			for(let j = 0; j < 8; j++) {
				if (position[i][j] == 1) {
					piece_c = "white";
				} else if (position[i][j] == 2) {
					piece_c = "green"
				} else {
					continue
				}
				var piece = document.createElementNS(svgns, 'circle')
				piece.setAttributeNS(null, "cx", getX(j))
				piece.setAttributeNS(null, "cy", getY(i))
				piece.setAttributeNS(null, "r", "5%")
				piece.setAttributeNS(null, "fill", piece_c)
				piece.setAttributeNS(null, "id", i.toString() + j.toString() + piece_c)
				piece.setAttributeNS(null, "class", "piece")
				piece.addEventListener("click", e => {
					if(!this.clicked_position) {
						console.log(e.target.id)
	        			this.clicked_position = e.target
	        		} else if(this.clicked_position == e) {
	        			this.clicked_position = null
	        		}
        		})
				this.root.appendChild(piece)
				
			}
		}
	
	}

	get_game_array() {
		var pieces = document.getElementsByClassName('piece')
		var i
		var j
		var c
		var game_array = [
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]]
			console.log(pieces.length)
		for (var k = 0; k < pieces.length; k++) {
			c = pieces[k].id[6] == "e" ? 1 : 2
			i = pieces[k].id[0]
			j = pieces[k].id[1]
			game_array[i][j] = c
		}
		console.log(game_array)
		return game_array
	}
}
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.draw_game(this.model.startin_position)
        this.view.get_game_array()
    }
}

const game = new Controller(new Model(), new View());


function getX(position) {
	switch(position) {
		case 0:
			return "6.25%"
		case 1:
			return "18.75%"
		case 2:
			return "31.25%"
		case 3:
			return "43.75%"
		case 4:
			return "56.25%"
		case 5:
			return "68.75%"
		case 6:
			return "81.25%"
		case 7:
			return "93.75%"
	}
}

function getY(position) {
	switch(position) {
		case 7:
			return "93.75%"
		case 6:
			return "81.25%"
		case 5:
			return "68.75%"
		case 4:
			return "56.25%"
		case 3:
			return "43.75%"
		case 2:
			return "31.25%"
		case 1:
			return "18.75%"
		case 0:
			return "6.25%"
	}
}

/*
//FileSystemAPI

window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

window.requestFileSystem(type, size, successCallback, opt_errorCallback)



//function onInitFs(fs) {
//	console.log('Opened file system: ' + fs.name);
  //}
  
  //window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/



  /*


  , onInitFs, errorHandler);



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
*/