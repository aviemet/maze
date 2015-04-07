$(window).load(function(){
	window.setTimeout(depth_first(width, height), 2000);
});

var dirs = ['N', 'S', 'E', 'W'];

function depth_first(width, height){
	var totalCells = width*height;
	var currentCell = Math.floor(Math.random() * totalCells);
	// Create a LIFO stack to hold list of cell locations
	var cellsStack = [currentCell];
	var visitedCells = 1;

	while(visitedCells < totalCells){
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
			window.setTimeout(cellsStack.push(currentCell), 1000);
			visitedCells++;
		} else {
			currentCell = cellsStack.pop();
		}
	}
}

function untouchedCell(cellNum){
	for(var i = 0; i < 4; i++){
		if(!$("td#"+cellNum).hasClass(dirs[i])){
			return false;
		}
	}
	return true;
}