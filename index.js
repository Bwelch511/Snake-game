const gameBoard = document.getElementById('gameBoard');
const ctx = gameBoard.getContext("2d");
const scoretxt = document.getElementById('scoretxt');
const resetbtn = document.getElementById('resetbtn');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = 'aqua';
const snekColor = 'lime';
const snekBorder = 'black';
const foodColor = 'red';
const unitSize = 25;
let running = false;
let xvelocity = unitSize;
let yvelocity = 0;
let foodx;
let foody;
let score = 0;
let snek = [
    {x: unitSize * 4, y:0},
    {x: unitSize * 3, y:0},
    {x: unitSize * 2, y:0},
    {x: unitSize, y:0},
    {x:0, y:0},
    
];

window.addEventListener('keydown', changeDirection);
resetbtn.addEventListener('click', resetGame);

gameStart();


function gameStart(){
    running = true;
    scoretxt.textContent = score;
    createFood();
    drawFood();
    nextTick();
};

function nextTick(){
    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnek();
            drawsnek();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else{
        displayGameOver();
    }
};

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodx = randomFood(0, gameWidth - unitSize);
    foody = randomFood(0, gameWidth - unitSize);
};

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodx, foody, unitSize, unitSize);
};

function moveSnek(){
    const head = {x: snek[0].x + xvelocity,
                  y: snek[0].y + yvelocity};

                  snek.unshift(head);
                  if(snek[0].x == foodx && snek[0].y == foody){
                        score += 1;
                        scoretxt.textContent = score;
                        createFood();
                  }
                  else{
                    snek.pop();
                  }
};

function drawsnek(){
    ctx.fillStyle = snekColor;
    ctx.strokeStyle = snekBorder;
    snek.forEach(snekpart => {
        ctx.fillRect(snekpart.x, snekpart.y, unitSize, unitSize),
        ctx.strokeRect(snekpart.x, snekpart.y, unitSize, unitSize)
    })
};

function changeDirection(event){
    const keyPressed = event.keyCode;
    const UP = 38;
    const DOWN = 40;
    const LEFT = 37;
    const RIGHT = 39;

    const goUp = (yvelocity == -unitSize);
    const goDown = (yvelocity == unitSize);   
    const goRight = (xvelocity == unitSize);
    const goLeft = (xvelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goRight):
            xvelocity = -unitSize;
            yvelocity = 0;
            break;

            case(keyPressed == UP && !goDown):
            xvelocity = 0;
            yvelocity = -unitSize;
            break;

            case(keyPressed == RIGHT && !goLeft):
            xvelocity = unitSize;
            yvelocity = 0;
            break;

            case(keyPressed == DOWN && !goUp):
            xvelocity = 0;
            yvelocity = unitSize;
            break;
    }

};

function checkGameOver(){
    switch(true){
        case(snek[0].x < 0):
        running = false;
        break;

        case(snek[0].x >= gameWidth):
        running = false;
        break;

        case(snek[0].y < 0):
        running = false;
        break;

        case(snek[0].y >= gameHeight):
        running = false;
        break;
    }
    for(let i = 1; i < snek.length; i+=1){
        if(snek[i].x == snek[0].x && snek[i].y == snek[0].y){
            running = false;
        }
    }
};

function displayGameOver(){
    ctx.font = '50px MV Boli';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText("Game Over", gameWidth / 2, gameHeight / 2);
    running = false;
};

function resetGame(){
    score = 0;
    xvelocity = unitSize;
    yvelocity = 0;
    snek = [
        {x: unitSize * 4, y:0},
    {x: unitSize * 3, y:0},
    {x: unitSize * 2, y:0},
    {x: unitSize, y:0},
    {x:0, y:0},
    ];
    gameStart()
};