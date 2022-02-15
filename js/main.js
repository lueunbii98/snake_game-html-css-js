const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = 'white';
const SNAKE_COLOUR = 'lightgreen';
const SNAKE_BORDER_COLOUR = 'darkgreen';

//Getting the canvas element
var gameCanvas = document.getElementById('gameCanvas');

//Getting the context to draw
var ctx = gameCanvas.getContext('2d');

// function to draw the canvas
function clearCanvas(){
    //Stting the colors for the canvas
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
    ctx.strokestyle = CANVAS_BORDER_COLOUR;

    //Setting a rectangle to the canvas
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

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

//function to change the direction of the snake
function changeDirection(event){
    const LEFT_KEY = 37; // setting the key codes
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode; // gets the key that trigger the event
    
    const goingUp = dy === 10; //verify in what direction the snake is
    const goingDown = dy === -10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight){ //check if the snake is in the opposite way
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown){
        dx = 0;
        dy = -10;
    }
    if(keyPressed === RIGHT_KEY && !goingLeft){
        dx = 10;
        dy = 0;
    }
    if(keyPressed == DOWN_KEY && !goingUp){
        dx = 0;
        dy = 10;
    }
}

// function that sets the new coordinates
function advanceSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    snake.unshift(head);//add to the beggining of the array

    snake.pop();//delete the end of the array
}

//fisrt movement
let dx = 10;
let dy = 0;

//function to draw the next movement
function main() {
    setTimeout (function onTick(){ //set a delay when calling a function
        clearCanvas();
        advanceSnake();
        drawSnake();

        //calling itself
        main();
    }, 100);
}

//works when a key is pressed
document.addEventListener('keydown', changeDirection);

drawSnake();
main();