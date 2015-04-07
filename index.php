<?php

$width = isset($_POST['width'])? $_POST['width'] : 10;
$height = isset($_POST['height'])? $_POST['height'] : 10;

?>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Random Maze Generator</title>
		<link rel="stylesheet" href="style.css" />
		<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
		<script> var width = <?php echo $width; ?>; var height = <?php echo $height; ?>; </script>
	</head>
<body>

	<div id="options">
		<form action="index.php" method="post" >

			<label name="width">Width
				<input type="text" name="width" size="4" value="<?php echo $width; ?>" />
			</label>

			<label name="height">Height
				<input type="text" name="height" size="4" value="<?php echo $height; ?>" />
			</label>

			<input type="submit" name="submit" value="Change Dimensions" />
		</form>
		<input type="button" name="generate" value="Generate Maze" id="generate" />
		<input type="button" name="solve" value="Solve Maze" id="solve" />
	</div>

	<table id="maze">
		<tr><td class="extra">&#8595;</td><td colspan="<?php echo $width-1; ?>" class="blank"></td></tr>
		<?php
		for($y = 0; $y < $height; $y++){ ?>
		    <tr>

		    <?php
			for($x = 0; $x < $width; $x++){ ?>
				<td class="N S E W <?php 
					if($y == 0 && $x == 0) echo 'start'; 
					if($x == $width-1 && $y == $height-1) echo 'finish';
				?>" id="<?php echo $width * $y + $x; ?>"><?php #echo $width * $y + $x; ?></td>
		    <?php }	?>
	    
	    	</tr>
		<?php } ?>
		<tr><td colspan="<?php echo $width-1; ?>" class="blank"><td class="extra">&#8595;</td></td>
	</table>

	<div id="test">
		

	</div>

	<script type="text/javascript" src="maze.oop.js"></script>
</body>
</html>
