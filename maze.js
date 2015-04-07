$(document).ready(function(){
	var maze = new Maze(width, height);
});

var Maze = function(width, height){
	this.width = width;
	this.height = height;
	this.totalCells = width*height;
	this.dirs = ['N', 'S', 'E', 'W'];
	this.currentCell = Math.floor(Math.random() * this.totalCells);
	this.cellsStack = [this.currentCell];
	this.visitedCells = 1;

	this.buildMaze(this.currentCell);
}

Maze.prototype.buildMaze = function(startingCell){
	if(this.visitedCells < this.totalCells){
		this.breakWalls(this.currentCell, this.chooseNextCell(startingCell));
		this.buildMaze(this.currentCell);
	}
}

Maze.prototype.chooseNextCell = function(cell){
	var neighbors = [];
	for(var i = 0; i < 4; i++){
		if($("td#"+cell).hasClass(this.dirs[i])){
			switch(this.dirs[i]){
				case "N":
					if(cell > this.width && this.untouchedCell(cell - this.width)){
						neighbors.push(this.dirs[i]);
					}
					break;
				case "S":
					if(cell < this.totalCells - this.width && this.untouchedCell(cell + this.width)){
						neighbors.push(this.dirs[i]);
					}
					break;
				case "E":
					if((cell + 1) % this.width !== 0 && this.untouchedCell(cell + 1)){
						neighbors.push(this.dirs[i]);
					}
					break;
				case "W":
					if(cell % this.width !== 0 && this.untouchedCell(cell - 1)){
						neighbors.push(this.dirs[i]);
					}
					break;
			}
		}
	}
	if(neighbors.length > 0){
		alert(neighbors[Math.floor(Math.random() * neighbors.length)]);
		return neighbors[Math.floor(Math.random() * neighbors.length)];
	} else {
		this.currentCell = this.cellsStack.pop();
		return this.chooseNextCell(this.currentCell);
	}
}

Maze.prototype.breakWalls = function(cell, dir){
	switch(dir){
		case "N":
			$("td#"+cell).removeClass('N');
			this.currentCell = cell-width;
			$("td#"+cell).removeClass('S');
			break;
		case "S":
			$("td#"+cell).removeClass('S');
			this.currentCell = cell+width;
			$("td#"+cell).removeClass('N');
			break;
		case "E":
			$("td#"+cell).removeClass('E');
			this.currentCell = cell+1;
			$("td#"+cell).removeClass('W');
			break;
		case "W":
			$("td#"+cell).removeClass('W');
			this.currentCell = cell-1;
			$("td#"+cell).removeClass('E');
			break;
	}
	this.cellsStack.push(this.currentCell);
	this.visitedCells++;
}

Maze.prototype.untouchedCell = function(cell){
	for(var i = 0; i < 4; i++){
		if(!$("td#"+cell).hasClass(this.dirs[i])){
			return false;
		}
	}
	return true;
}