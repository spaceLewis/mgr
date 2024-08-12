var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

var box = 20;

// Initialize the snake as an array of objects, each object representing a square of the snake
var snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

var direction; // the current direction of the snake
var score = 0;

// Create the food at a random position on the game board
var food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Function to create the game background
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {

    for(i = 0; i < snake.length; i++){
        context.fillStyle = (i == 0) ? "darkgreen" : "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);

        if(i == 0) { // If this is the head of the snake
            context.fillStyle = "white";
            // Draw the eyes
            context.beginPath();
            context.arc(snake[i].x + box/3, snake[i].y + box/3, box/8, 0, 2 * Math.PI);
            context.arc(snake[i].x + 2*box/3, snake[i].y + box/3, box/8, 0, 2 * Math.PI);
            context.fill();
        }

        if(i != 0 && i == snake.length - 1) { // If this is the tail of the snake
            context.fillStyle = "lightgreen";
            // Draw the tail
            if(direction == 'right') {
                context.fillRect(snake[i].x, snake[i].y, box/2, box/2);
            } else if(direction == 'left') {
                context.fillRect(snake[i].x + box/2, snake[i].y, box/2, box/2);
            } else if(direction == 'up') {
                context.fillRect(snake[i].x + box/2, snake[i].y + box/2, box/2, box/2);
            } else if(direction == 'down') {
                context.fillRect(snake[i].x + box/2, snake[i].y, box/2, box/2);
            }
        }
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if (snake[0].x >= 0 && snake[0].y >= 0 && snake[0].x < 16 * box && snake[0].y < 16 * box ){
            //console.log('x'+snake[0].x);
            //console.log('y'+snake[0].y);
        if (event.keyCode == 37 && direction != 'right') direction = 'left';
        if (event.keyCode == 38 && direction != 'down') direction = 'up';
        if (event.keyCode == 39 && direction != 'left') direction = 'right';
        if (event.keyCode == 40 && direction != 'up') direction = 'down';
    }
}

function startGame() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 15 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 15 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over!');
        }
    }

    createBG();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score++;
    }

    var newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    drawScore(); 

}

function drawScore() {
    var scoreElement = document.getElementById('score');
    scoreElement.innerText = "Score: " + score;
}

var game = setInterval(startGame, 100);