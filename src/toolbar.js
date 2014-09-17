/**
* Colors
*/

$("#backgroundColor").spectrum({
	move: function(color){
		var hex = color.toHexString();
		$("body").css('background', hex);
		$("#backgroundColor").css('background', hex);
	}
});

$("#paintColor").spectrum({
	move: function(color){
		var hex = color.toHexString();
		$("#paintColor").css('background', hex);
		paintColor = hex;
	}
});

/**
* Show / Hide grids
*/

$("#dispGrids").click(function(){
	
	if($(this).attr('state') == 'on'){
		
		$(this).attr('state', 'off');
		$(this).addClass('active');
		
		cellsGrid.hideGrid();
		linksGrid.hideGrid();

	} else {
		
		$(this).attr('state', 'on');
		$(this).removeClass('active');
		
		cellsGrid.showGrid();
		linksGrid.showGrid();
	}

	// Redraw
	paper.view.draw();
});