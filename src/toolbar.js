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

$("#cellsGrid").click(function(){
	if($(this).attr('disp') == 'false'){
		$(this).removeClass('active');
		$(this).attr('disp', 'true');
		cellsGrid.grid.visible = true;
	} else {
		$(this).addClass('active');
		$(this).attr('disp', 'false');
		cellsGrid.grid.visible = false;
	}
});