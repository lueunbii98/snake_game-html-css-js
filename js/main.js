const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = 'white';
const SNAKE_COLOUR = 'lightgreen';
const SNAKE_BORDER_COLOUR = 'darkgreen';
const FOOD_COLOUR = 'red';
const FOOD_BORDER_COLOUR = 'darkred';

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

/* SNAKE */
// Creating the snake
let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150}
];

//score
let score = 0;

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

    const didEatFood = snake[0].x === foodX && snake[0].y === foodY; //check if the head hits the food
    if(didEatFood){
        score += 10;
        document.getElementById('score').innerHTML = score;

        createFood();//generates new food
    } else {
        snake.pop();//delete the end of the array
    }
}

//fisrt movement
let dx = 10;
let dy = 0;

//function to draw the next movement
function main() {
    setTimeout (function onTick(){ //set a delay when calling a function
        clearCanvas();//clear the canvas 
        advanceSnake();//sets new coordinates
        drawSnake();//draw the snake
        drawFood();//drawing the food

        //calling itself
        main();
    }, 100);
}

//works when a key is pressed
document.addEventListener('keydown', changeDirection);

/* FOOD */

function randomTen(min, max){ //generate a random number in an interval
    return Math.round((Math.random() * (max-min) + min) / 10) * 10
}

function createFood(){ //generating the food
    foodX = randomTen(0, gameCanvas.width - 10); //generating a random x and y
    foodY = randomTen(0, gameCanvas.height - 10);

    snake.forEach(function isFoodOnSnake(part){ //for the array of the snake
        const foodIsOnSnake = part.x == foodX && part.y == foodY;
        if (foodIsOnSnake) //evaluates if the random numbers are the same of the snake position
            createFood(); //then call itself to try again
    });
}

//drawing the food
function drawFood(){
    ctx.fillStyle = FOOD_COLOUR;
    ctx.strokestyle = FOOD_BORDER_COLOUR;
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

drawSnake();//firstPosition
createFood();//firstFood
main();//beginMovement