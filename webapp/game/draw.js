
var coordinates = [
    'a8','b8','c8','d8','e8','f8','g8','h8',
	'a7','b7','c7','d7','e7','f7','g7','h7',
	'a6','b6','c6','d6','e6','f6','g6','h6',
	'a5','b5','c5','d5','e5','f5','g5','h5',
	'a4','b4','c4','d4','e4','f4','g4','h4',
	'a3','b3','c3','d3','e3','f3','g3','h3',
	'a2','b2','c2','d2','e2','f2','g2','h2',
	'a1','b1','c1','d1','e1','f1','g1','h1'
];

function draw_game(game_string_json) {
	// removing old pieces
	var old_pieces = document.getElementsByClassName('piece')
	while(old_pieces.length > 0){
        old_pieces[0].parentNode.removeChild(old_pieces[0]);
    }
    // get new pieces positions
	var game_state = JSON.parse(game_string_json)

	// prepare svg object string
	var piece_string = ""
	var piece_string_1 = "<circle cx = '"
	var piece_string_2 = "' cy = '"
	var piece_string_3 = "' r = '5%' fill = '"
	var piece_string_4 = "' class = 'piece'/>"

	game_state.white.forEach((item) => {
		Object.entries(item).forEach(([key, val]) => {
			piece_x = getX(val)
			piece_y = getY(val)
			piece_c = "white"
			piece_string = piece_string_1 + piece_x + piece_string_2 + piece_y + piece_string_3 + piece_c + piece_string_4
			document.getElementById("board").innerHTML += piece_string
		})
	})

	game_state.green.forEach((item) => {
		Object.entries(item).forEach(([key, val]) => {
			piece_x = getX(val)
			piece_y = getY(val)
			piece_c = "green"
			piece_string = piece_string_1 + piece_x + piece_string_2 + piece_y + piece_string_3 + piece_c + piece_string_4
			document.getElementById("board").innerHTML += piece_string
		})
	})
}

function getX(position) {
	switch(position[0]) {
		case "a":
			return "6.25%"
		case "b":
			return "18.75%"
		case "c":
			return "31.25%"
		case "d":
			return "43.75%"
		case "e":
			return "56.25%"
		case "f":
			return "68.75%"
		case "g":
			return "81.25%"
		case "h":
			return "93.75%"
	}
}

function getY(position) {
	switch(position[1]) {
		case "1":
			return "93.75%"
		case "2":
			return "81.25%"
		case "3":
			return "68.75%"
		case "4":
			return "56.25%"
		case "5":
			return "43.75%"
		case "6":
			return "31.25%"
		case "7":
			return "18.75%"
		case "8":
			return "6.25%"
	}
}