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
		this.downloadButton = document.getElementById("downloadAnchorElem");
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

	bindDownloadButton(handler){
		this.downloadButton.addEventListener('click', handler);
	}
}
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
		this.view.draw_game(this.model.startin_position)
		this.view.bindDownloadButton(this.downloadState)
		this.initDnD()
	}

	downloadState = event => {
		this.saveFile("test.json", this.model.startin_position);
	}

	saveFile(filename, objectToWrite){
		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(objectToWrite));
		this.view.downloadButton.setAttribute("href",     dataStr     );
		this.view.downloadButton.setAttribute("download", filename);
	}
		  
	initDnD(){
		var dropArea = document.getElementById("dropContainer");
		dropArea.addEventListener('dragenter', function(e){ e.preventDefault(); });
		dropArea.addEventListener('dragover',  function(e){ e.preventDefault(); });
	
		dropArea.addEventListener('drop', event => {
	
			var reader = new FileReader();
			reader.onloadend = () => {
				var data = JSON.parse(reader.result);
				console.log(data)
				this.model.startin_position = data
				this.view.draw_game(this.model.startin_position)
			};
	
			reader.readAsText(event.dataTransfer.files[0]);    
			event.preventDefault();
		});
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
