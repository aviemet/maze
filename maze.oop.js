$(window).load(function(){
	$("#generate").click(function(){
		clearMaze();
		depth_first(width, height);
	});

	$("#solve").click(function(){
		if($("td#"+lastCell).hasClass("path")){
			clearSolution();
		}
		solveMaze();
	});

	$(window).keydown(function(event){
		if(isMazeGenerated()){
			switch(event.keyCode){
				case 37: // Left
					if(currentCell > width && untouchedCell(currentCell - width)){
						neighbors.push(dirs[i]);
					}
					break;
				case 38: // Up
					if(currentCell < totalCells - width && untouchedCell(currentCell + width)){
						neighbors.push(dirs[i]);
					}
					break;
				case 39: // Right
					if((currentCell + 1) % width !== 0 && untouchedCell(currentCell + 1)){
						neighbors.push(dirs[i]);
					}
					break;
				case 40: // Down
					if(currentCell % width !== 0 && untouchedCell(currentCell - 1)){
						neighbors.push(dirs[i]);
					}
					break;
			}
		} else {
			return false;
		}
	});

	//weightedRandomNumbers(0, 4);

});

var dirs = ['E', 'S', 'N', 'W'];
var totalCells = width*height;
var lastCell = totalCells-1;
// Create a LIFO stack to hold list of cell locations
var cellsStack;
var visitedCells = 1;
var currentCell;

function depth_first(width, height){
	currentCell = Math.floor(Math.random() * totalCells);
	cellsStack = [currentCell];
	/*while(visitedCells < totalCells){
		//nextStep();
		setTimeout(nextStep(), 400000);
	}*/
	nextStep();
}

function nextStep(){
	if(visitedCells == totalCells){ return; }
	// find all neighbors with all walls intact
	var neighbors = [];
	for(var i = 0; i < 4; i++){
		if($("td#"+currentCell).hasClass(dirs[i])){
			switch(dirs[i]){
				case "N":
					if(currentCell > width && untouchedCell(currentCell - width)){
						neighbors.push(dirs[i]);
					}
					break;
				case "S":
					if(currentCell < totalCells - width && untouchedCell(currentCell + width)){
						neighbors.push(dirs[i]);
					}
					break;
				case "E":
					if((currentCell + 1) % width !== 0 && untouchedCell(currentCell + 1)){
						neighbors.push(dirs[i]);
					}
					break;
				case "W":
					if(currentCell % width !== 0 && untouchedCell(currentCell - 1)){
						neighbors.push(dirs[i]);
					}
					break;
			}
		}
	}
	// randomly choose a neighbor to mess with
	if(neighbors.length > 0){
		var randomDir = Math.floor(Math.random() * neighbors.length);
		switch(neighbors[randomDir]){
			case "N":
				$("td#"+currentCell).removeClass('N');
				currentCell = currentCell-width;
				$("td#"+currentCell).removeClass('S');
				break;
			case "S":
				$("td#"+currentCell).removeClass('S');
				currentCell = currentCell+width;
				$("td#"+currentCell).removeClass('N');
				break;
			case "E":
				$("td#"+currentCell).removeClass('E');
				currentCell = currentCell+1;
				$("td#"+currentCell).removeClass('W');
				break;
			case "W":
				$("td#"+currentCell).removeClass('W');
				currentCell = currentCell-1;
				$("td#"+currentCell).removeClass('E');
				break;
		}
		cellsStack.push(currentCell);
		visitedCells++;
	} else {
		currentCell = cellsStack.pop();
	}

	//nextStep();

	// Animated
	window.setTimeout(function(){
		nextStep();
	}, 0.2); 
}


function untouchedCell(cellNum){
	for(var i = 0; i < 4; i++){
		if(!$("td#"+cellNum).hasClass(dirs[i])){
			return false;
		}
	}
	return true;
}


function clearMaze(){
	visitedCells = 1;
	cellsStack = [];
	$("td").each(function(){
		if(!$(this).hasClass("extra") && !$(this).hasClass("blank")){
			$(this).addClass("N").addClass("S").addClass("E").addClass("W").removeClass("backtrack").removeClass("path");
		}
	});
}

/** Solving the maze
**/
var solvingCell;
function solveMaze(){
	$("td").each(function(){
		if($(this).hasClass("N") && $(this).hasClass("S") && $(this).hasClass("E") && $(this).hasClass("W")){
			alert('The Maze hasn\'t been generated yet');
			return false;
		}
	});

	// Loop to solve it
	solvingCell = 0;
	makeNextMove(getPossibleMoves(solvingCell));
	//alert('Puzzle Solved!');
}

function getPossibleMoves(cell){
	var moves = [];
	for(var i = 0; i < 4; i++){
		if(!$("td#"+solvingCell).hasClass(dirs[i])){
			moves.push(dirs[i]);
		}
	}
	//alert("Current cell: " + solvingCell + ", Possible moves: " + moves.toString());
	return moves;
}

/** Check each moves[] for criteria. 
 * If an untouched cell is a possible move, choose that, mark previous cell with a path class
 * If no untouched cells are present, retreat on the path leaving a backtrack class
 loop through each move
 separate into arrays of each type, untouched, path and backtrack
 if untouched isn't empty, randomly choose one
 else, retreat back down the path 
 **/
function makeNextMove(moves){
	if(solvingCell == lastCell){
		$("td#"+lastCell).addClass("path");
		return;
	}
	var untouched = [];
	var backtrack = [];
	var path;
	// classes: .path, .backtrack
	for(var i = 0; i < moves.length; i++){
		var cell;
		switch(moves[i]){
			case "N":
				cell = solvingCell - width;
				break;
			case "S":
				cell = solvingCell + width;
				break;
			case "E":
				cell = solvingCell + 1;
				break;
			case "W":
				cell = solvingCell - 1;
				break;
		}
		if(!$("td#"+cell).hasClass("path") && !$("td#"+cell).hasClass("backtrack")){
			//alert(cell + " " + $("td#"+cell).attr('class'));
			untouched.push(cell);
		} else if($("td#"+cell).hasClass("path")){
			path = cell;
		}
	}

	//alert(untouched.toString());

	if(untouched.length > 0){
		$("td#"+solvingCell).addClass("path");
		var rand = Math.floor(untouched.length * Math.pow(Math.random(),2));
		//var rand = Math.floor(Math.random() * untouched.length);
		var rand = 0;
		//alert("random: " + rand + ", chosen cell: " + untouched[rand]);
		solvingCell = untouched[rand];
	} else {
		//alert('backtracking');
		$("td#"+solvingCell).removeClass("path").addClass("backtrack");
		solvingCell = path;
	}

	window.setTimeout(function(){
		makeNextMove(getPossibleMoves(solvingCell));
	}, 10);
	//alert("new solvingcell: " + solvingCell);
}

function clearSolution(){
	$("td").each(function(){
		$(this).removeClass("path").removeClass("backtrack");
	});
}




//Tests
function weightedRandomNumbers(min, max){
	if(min >= max) {
		alert("please enter valid numbers for this function");
		return;
	}

	setUpList(min, max);
/*
	for(var i = 0; i < 100; i++){
		var num = weightedRandomNumbers(min, max);
		$("#test #t" + num + " p").text(parseInt($("#test #t" + num + " p").text()) + 1);
	}*/
}

function setUpList(min, max){
	for(var i = 0; i <= max; i++){
		$("#test").append("<div id='t" + i + "'><span>" + i + "</span><p>0</p></div>");
	}
}