const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = 'white';
const SNAKE_COLOUR = 'lightgreen';
const SNAKE_BORDER_COLOUR = 'darkgreen';

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

// Creating the snake
let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150}
];

// Drawing the snake
function drawSnakePart(snakePart){
    ctx.fillStyle = SNAKE_COLOUR;
    ctx.strokestyle = SNAKE_BORDER_COLOUR;

    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

//printing the snake
function drawSnake(){
    snake.forEach(drawSnakePart);
}

// Moving the snake
function advanceSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    snake.unshift(head);

    snake.pop();
}

//test
let dx = 10;
let dy = 0;

advanceSnake();

dx = 0;
dy = -10;

advanceSnake();

drawSnake();