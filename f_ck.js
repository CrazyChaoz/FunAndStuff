//Classes

class Player {
	constructor(xCoord, yCoord, inventory) {
		this.coordinate = [xCoord, yCoord]
		this.nameOfTile = "img/player/default.png"
		this.inventory = inventory
	}
}


class Tile {
	constructor(nameOfTile) {
		this.nameOfTile = nameOfTile
	}
}

//Rendering


// 	// for (var i = ((xCoord-5)>0?(xCoord-5):0); i < ((xCoord+5)<window.innerWidth / TILESIZE?(xCoord+5):window.innerWidth / TILESIZE); i++) {
// 	// 	for (var j = ((yCoord-5)>0?(yCoord-5):0); j < ((yCoord+5)<window.innerWidth / TILESIZE?(yCoord+5):window.innerWidth / TILESIZE); j++) {
// 	// 		var tile = document.createElement("img")
// 	// 		tile.setAttribute("src", preGenMap.tiles[i][j].nameOfTile)
// 	// 		tile.setAttribute("style", "position:absolute;left:" + (preGenMap.tiles[i][j].coordinate.x * TILESIZE) + "px;top:" + (preGenMap.tiles[i][j].coordinate.y * TILESIZE) + "px;")
// 	// 		gameArea.appendChild(tile)
// 	// 	}
// 	// }

function renderMap() {
	let gamePapa = document.getElementById("game");
	gamePapa.removeChild(document.getElementById("gameArea"))
	let gameArea = document.createElement("div")
	gameArea.setAttribute("id", "gameArea")
	gamePapa.appendChild(gameArea)
	for (let i = 0; i < (window.innerWidth / TILESIZE); i++) {
		for (let j = 0; j < (window.innerHeight / TILESIZE); j++) {
			let tile = document.createElement("div")
			tile.setAttribute("class","gameBG")
			tile.setAttribute("id", preGenMap[i + generalMapOffset[0]][j + generalMapOffset[1]].nameOfTile)
			tile.setAttribute("style", "left:" + (i * TILESIZE * 2) + "px;top:" + (j * TILESIZE * 2) + "px;")
			gameArea.appendChild(tile)
		}
	}

	//other thread loops: start value, amount

}

function renderVegetation() {
	let gamePapa = document.getElementById("game");
	gamePapa.removeChild(document.getElementById("gameVegetation"))
	let gameArea = document.createElement("div")
	gameArea.setAttribute("id", "gameVegetation")
	gamePapa.appendChild(gameArea)
	for (let i = 0; i < (window.innerWidth / TILESIZE); i++) {
		for (let j = 0; j < (window.innerHeight / TILESIZE); j++) {
			if (preGenVegetation[i + generalMapOffset[0]][j + generalMapOffset[1]]) {
				let tile = document.createElement("div")
				tile.setAttribute("class","vegetation")
				tile.setAttribute("id", preGenVegetation[i + generalMapOffset[0]][j + generalMapOffset[1]].nameOfTile)
				tile.setAttribute("style", "left:" + (i * TILESIZE) + "px;top:" + (j * TILESIZE) + "px;")
				gameArea.appendChild(tile)
			}
		}
	}
}

function renderPlayer() {
	let areaToRender = (preGenVegetation[preGenPlayer.coordinate[0] + generalMapOffset[0]][preGenPlayer.coordinate[1] + generalMapOffset[1] + 1]) ? "gameArea" : "gameVegetation"
	let gameArea = document.getElementById(areaToRender)
	if (document.getElementById("player"))
		document.getElementById("player").parentNode.removeChild(document.getElementById("player"))
	let tile = document.createElement("div")
	tile.setAttribute("id", "player")
	tile.setAttribute("style", "left:" + (preGenPlayer.coordinate[0] * TILESIZE) + "px;top:" + (preGenPlayer.coordinate[1] * TILESIZE) + "px;")
	gameArea.appendChild(tile)
}


function interact() {
	console.log("Player is interacting with " + preGenVegetation[preGenPlayer.coordinate[0] + generalMapOffset[0] + playerIsMovingInDirection[0]][preGenPlayer.coordinate[1] + generalMapOffset[1] + playerIsMovingInDirection[1]].nameOfTile)
	switch (vegetationKinds[preGenVegetation[preGenPlayer.coordinate[0] + generalMapOffset[0] + playerIsMovingInDirection[0]][preGenPlayer.coordinate[1] + generalMapOffset[1] + playerIsMovingInDirection[1]].nameOfTile.replace(vegetationTilesPath, "")]) {
		case "Cactus":
			console.log("Ouch, that hurt!")
			dialogBox("Ouch, that hurt!")
			break;
		case "Bones":
			console.log("Those Bones could proove useful")
			dialogBox("Those Bones could proove useful")
			preGenVegetation[preGenPlayer.coordinate[0] + generalMapOffset[0] + playerIsMovingInDirection[0]][preGenPlayer.coordinate[1] + generalMapOffset[1] + playerIsMovingInDirection[1]] = 0

			let boneSplinterCount = (~~(Math.random() * 4))
			if (boneSplinterCount > 0) {
				if (isNaN(preGenPlayer.inventory.boneSplinter))
					preGenPlayer.inventory.boneSplinter = 0
				preGenPlayer.inventory.boneSplinter += boneSplinterCount
			}

			let boneCount = (~~(Math.random() * 2))
			if (boneCount > 0) {
				if (isNaN(preGenPlayer.inventory.bone))
					preGenPlayer.inventory.bone = 0
				preGenPlayer.inventory.bone += boneCount
			}

			renderVegetation()
			break;
		case "Pebbles":
			break;
	}
}

function dialogBox(text) {
	let game = document.getElementById("gameAfter");
	let dialogbox = document.createElement("div")
	if (document.getElementById('dialogbox'))
		document.getElementById('gameAfter').removeChild(document.getElementById('dialogbox'))
	dialogbox.setAttribute("id", "dialogbox")
	dialogbox.setAttribute("style", "position:absolute;left:30%;right:30%;bottom:10px;background-color:white;")
	dialogbox.innerHTML = text
	dialogbox.addEventListener('click', function (event) {
		document.getElementById('gameAfter').removeChild(document.getElementById('dialogbox'))
	})
	game.appendChild(dialogbox)
}

function inventory() {
	let game = document.getElementById("gameAfter");
	let invbox = document.createElement("div")
	if (document.getElementById('invbox'))
		document.getElementById('gameAfter').removeChild(document.getElementById('invbox'))
	invbox.setAttribute("id", "invbox")
	invbox.setAttribute("style", "position:absolute;left:30%;right:30%;bottom:30%;top:30%;background-color:white;")
	invbox.addEventListener('click', function (event) {
		document.getElementById('gameAfter').removeChild(document.getElementById('invbox'))
	})
	let vars = Object.keys(preGenPlayer.inventory)
	for (let i = 0; i < vars.length; i++) {
		if (preGenPlayer.inventory[vars[i]] > 0) {
			let item = document.createElement("div")
			item.setAttribute("style", "background-image: url(img/items/" + vars[i] + ".png);height:32px;width:32px;position:absolute;left:" + (i * 32) + "px;top:" + "0px;background-color:blue;")
			item.innerHTML = preGenPlayer.inventory[vars[i]]
			invbox.appendChild(item)
		}
	}
	game.appendChild(invbox)
}


function keyinputs() {
	document.addEventListener('keydown', function (event) {
		let innerWidthStuff = ~~((window.innerWidth / TILESIZE) / 4)
		let innerHeightStuff = ~~((window.innerHeight / TILESIZE) / 4)

		if (event.keyCode == 65) {
			//Left
			playerIsMovingInDirection = [-1, 0]
			if (!preGenVegetation[preGenPlayer.coordinate[0] + generalMapOffset[0] - 1][preGenPlayer.coordinate[1] + generalMapOffset[1]]) {
				preGenPlayer.coordinate[0] -= 1
				if (preGenPlayer.coordinate[0] < innerWidthStuff) {
					generalMapOffset[0] -= innerWidthStuff
					preGenPlayer.coordinate[0] += innerWidthStuff
					renderMap()
					renderVegetation()
				}
			} else {
				if (playerIsInspecting) {
					interact()
				}
			}
		} else if (event.keyCode == 68) {
			//Right
			playerIsMovingInDirection = [1, 0]
			if (!preGenVegetation[preGenPlayer.coordinate[0] + generalMapOffset[0] + 1][preGenPlayer.coordinate[1] + generalMapOffset[1]]) {
				preGenPlayer.coordinate[0] += 1
				if (preGenPlayer.coordinate[0] > 3 * innerWidthStuff) {
					generalMapOffset[0] += innerWidthStuff
					preGenPlayer.coordinate[0] -= innerWidthStuff
					renderMap()
					renderVegetation()
				}
			} else {
				if (playerIsInspecting) {
					interact()
				}
			}
		} else if (event.keyCode == 87) {
			//UP
			playerIsMovingInDirection = [0, -1]
			if (!preGenVegetation[preGenPlayer.coordinate[0] + generalMapOffset[0]][preGenPlayer.coordinate[1] + generalMapOffset[1] - 1]) {
				preGenPlayer.coordinate[1] -= 1
				if (preGenPlayer.coordinate[1] < innerHeightStuff) {
					generalMapOffset[1] -= innerHeightStuff
					preGenPlayer.coordinate[1] += innerHeightStuff
					renderMap()
					renderVegetation()
				}
			} else {
				if (playerIsInspecting) {
					interact()
				}
			}
		} else if (event.keyCode == 83) {
			//DOWN
			playerIsMovingInDirection = [0, 1]
			if (!preGenVegetation[preGenPlayer.coordinate[0] + generalMapOffset[0]][preGenPlayer.coordinate[1] + generalMapOffset[1] + 1]) {
				preGenPlayer.coordinate[1] += 1
				if (preGenPlayer.coordinate[1] > 3 * innerHeightStuff) {
					generalMapOffset[1] += innerHeightStuff
					preGenPlayer.coordinate[1] -= innerHeightStuff
					renderMap()
					renderVegetation()
				}
			} else {
				if (playerIsInspecting) {
					interact()
				}
			}
		} else if (event.keyCode == 81) {
			//INVENTORY
			console.log(preGenPlayer.inventory)
			inventory()
		} else if (event.keyCode == 69) {
			//INTERACT
			playerIsInspecting = true

			console.log("Player: " + preGenPlayer.coordinate[0] + ";" + preGenPlayer.coordinate[1])
			console.log("Plant: " + (preGenPlayer.coordinate[0] + playerIsMovingInDirection[0]) + ";" + (preGenPlayer.coordinate[1] + playerIsMovingInDirection[1]))

			if (preGenVegetation[(preGenPlayer.coordinate[0] + generalMapOffset[0] + playerIsMovingInDirection[0])][(preGenPlayer.coordinate[1] + generalMapOffset[1] + playerIsMovingInDirection[1])]) {
				interact()
			}
		} else if (false) {
			//MENU
		}

		renderPlayer()
	})

	document.addEventListener('keyup', function (event) {
		if (event.keyCode == 69) {
			playerIsInspecting = false
		} else if (event.keyCode == 65 || event.keyCode == 68 || event.keyCode == 87 || event.keyCode == 83) {
			playerIsMovingInDirection = [0, 0]
		}
	})
}

const TILESIZE = 16

let preGenPlayer = new Player(~~(window.innerWidth / TILESIZE / 2), ~~(window.innerHeight / TILESIZE / 2), {})
let preGenMap = []
let preGenVegetation = []
let playerIsInspecting = false
let playerIsMovingInDirection = [0, 0]
let generalMapOffset = [0, 0]
let vegetationKinds = {
	"veg0": "Cactus",
	"veg1": "Cactus",
	"veg2": "Cactus",
	"veg3": "Bones",
	"veg4": "Bones",
	"veg5": "Bones",
}


for (let i = 0; i < (window.innerWidth); i++) {
	preGenMap.push([])
	for (let j = 0; j < (window.innerHeight); j++) {
		preGenMap[i][j] = new Tile("bg" + (~~(Math.random() * 6)))
	}
}

for (let i = 0; i < (window.innerWidth); i++) {
	preGenVegetation.push([])
	for (let j = 0; j < (window.innerHeight); j++) {
		if (Math.random() > 0.95)
			preGenVegetation[i][j] = new Tile( "veg" + (~~(Math.random() * (Object.keys(vegetationKinds).length))))
	}
}
renderMap()
renderVegetation()
renderPlayer()
keyinputs()