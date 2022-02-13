const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = 'white';

//Getting the canvas element
var gameCanvas = document.getElementById('gameCanvas');

//Getting the context to draw
var ctx = gameCanvas.getContext('2d');

//Stting the colors for the canvas
ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
ctx.strokestyle = CANVAS_BORDER_COLOUR;

//Setting a rectangle to the canvas
ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);