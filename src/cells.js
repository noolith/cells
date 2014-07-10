function randInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
* Sketch
*/

function Sketch(options){

	this.backgroundColor = options.backgroundColor | '#29AADF';
	this.paintColor = options.paintColor | 'white';

	this.screens = {};

}

paintColor = 'white';

/**
* Frame
*/

function Frame(parent){

	this.width = parent.width;
	this.height = parent.height;
	
	this.frame = [];
	for(var y = 0; y < this.height; y++){
		this.frame.push([]);
		for(var x = 0; x < this.width; x++){
			this.frame[y].push(false);
		}
	}

}

Frame.prototype.draw = function(){
	for(var y = 0; y < this.height; y++){
		for(var x = 0; x < this.width; x++){
			if(this.frame[y][x])
				this.parent.pixels[y][x].on();
			else
				this.parent.pixels[y][x].off();
		}
	}
};

Frame.prototype.on = function(x, y){
	this.frame[y][x] = true;
};

Frame.prototype.off = function(x, y){
	this.frame[y][x] = false;
};

/**
* Pixel
*/

function Pixel(parent, x, y){

	this.circle = new Path.Circle({
		parent: parent.grid,
		center: [(parent.margin*x*2+parent.unit+parent.offset.x)+2*x, 
				(parent.margin*y*2+parent.unit+parent.offset.y)+2*y],
		radius: parent.unit,
		strokeColor: 'white',
		fillColor: 'white',
	});

	this.circle.onMouseDown = function(event){
		this.flip();
		this.paint(paintColor);
	};

	this.circle.flip = function(){
		this.fillColor.alpha = 1 - this.fillColor.alpha;
	};

	this.circle.on = function(){
		this.fillColor.alpha = 1;
	};

	this.circle.off = function(){
		this.fillColor.alpha = 0;
	};

	this.circle.set = function(alpha){
		this.fillColor.alpha = alpha;
	};

	this.circle.paint = function(color){
		var alpha = this.fillColor.alpha;
		this.fillColor = color;
		this.fillColor.alpha = alpha;
	};

	this.circle.strokeColor.alpha = 0.5;
	this.circle.fillColor.alpha = 0;

}

/**
* Display
*/

function Display(options){

	this.unit = options.unit;
	this.width = options.width;
	this.height = options.height;

	this.grid = new Layer();
	this.margin = options.margin === undefined ? this.unit : options.margin;
	this.offset = options.offset === undefined ? {x: 0, y:0} : options.offset;
	this.pixels = [];

	for(var y = 0; y <= this.height; y++){
		this.pixels.push([]);
		for(var x = 0; x < this.width; x++){
			this.pixels[y].push(new Pixel(this, x, y));
		}
	}

	this.grid.position.x = view.center.x + this.offset.x;
	this.grid.position.y = view.center.y + this.offset.y;

}

Display.prototype.clear = function(){
	this.pixels.forEach(function(line){
		line.forEach(function(pixel){
			pixel.off();
		});
	});
};

Display.prototype.hideGrid = function(){
	this.pixels.forEach(function(line){
		line.forEach(function(pixel){
			pixel.circle.strokeColor.alpha = 0;
		});
	});
};

Display.prototype.setGridColor = function(color){
	this.pixels.forEach(function(line){
		line.forEach(function(pixel){
			pixel.circle.strokeColor = color;
		});
	});
};

/**
* Make grids
*/

var sketchWidth = $('#cells').width();
var sketchHeight = $('#cells').height();

var maxCellsX = parseInt(sketchWidth / (21 * 2)) - 2;
var maxCellsY = parseInt(sketchHeight / (21 * 2)) - 2;

cellsGrid = new Display({
	width: maxCellsX,
	height: maxCellsY,
	unit: 20,
	margin: 21,
});

linksGrid = new Display({
	width: maxCellsX - 1,
	height: maxCellsY - 1,
	unit: 9,
	margin: 21,
});