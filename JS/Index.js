// Game constants and Variable
const DirectionSound = new Audio('/assets/Direction.mp3');
const FoodSound = new Audio('/assets/Food.mp3');
const GameOverSound = new Audio('/assets/Game-Over.mp3');
const BackgroundSound = new Audio('/assets/musicsound.mp3');
let inputDir = { x: 0, y: 0 };
let LastinputDir = { x: 0, y: 0 };
let lastRenderTime = 0;
let Snake_Speed = 5;
let score = 0;
let snakeBody = [{ x: 10, y: 15 }];
let food = { x: 7, y: 10 };


function main(currentTime) {
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    window.requestAnimationFrame(main) // game loop will be created
    if (secondsSinceLastRender < (1 / Snake_Speed)) {
        return;
    }

    lastRenderTime = currentTime;
    // console.log('Render');
    gameEngine();

}

//Game main function
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeBody.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 24 || snake[0].x <=0 || snake[0].y >= 24 || snake[0].y <=0){
        return true;
    }
        
    return false;
}


function gameEngine() {
    
    //Part-1 Updating the snake array
    if(isCollide(snakeBody)){
        GameOverSound.play();
        BackgroundSound.pause();
        alert("Game Over. Press any key to play again!");
        inputDir =  {x: 0, y: 0}; 
        // BackgroundSound.play();
        snakeBody= [{x: 13, y: 15}];
        score = 0; 
    }
    
    
    
    //If snake eaten the food, icreament the score and regenerate the food
    
    if (snakeBody[0].x === food.x && snakeBody[0].y === food.y) {
        FoodSound.play();
        score += 1;
        if (score>highestscore) {
            let highestscore = score;
            localStorage.setItem("HighestScore", JSON.stringify(highestscore));
            hiscoreBox.innerHTML = "HighScore: " + highestscore;
        }
        scoreBox.innerHTML = "Score: " + score;
        if (score%3 === 0) {
            Snake_Speed += 1 ;
        }
        snakeBody.unshift({ x: snakeBody[0].x + inputDir.x, y: snakeBody[0].y + inputDir.y });
        let a = 2;
        let b = 22;
        let rValue = a + (b - a) * Math.random();
        food = { x: Math.round(rValue), y: Math.round(rValue) };
        
    }
    
    //Moving the Snake
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }; //for solve the reference proble
    }
    
    snakeBody[0].x += inputDir.x;
    snakeBody[0].y += inputDir.y;
    
    
    //Part-2 Display the snake and food 
    
    //Display the snake
    background.innerHTML = "";
    snakeBody.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        background.appendChild(snakeElement);
        
    });
    
    //Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    background.appendChild(foodElement);
    
    
    
    
    
}








//Main Logic Start Here
let highscore = localStorage.getItem("HighestScore");
if (highscore === null) {
    highestscore = 0;
    localStorage.setItem("HighestScore", JSON.stringify(highestscore));
}
else{
    highestscore = JSON.parse(highscore);
    hiscoreBox.innerHTML = "HighScore: " + highscore;
}

// Why to use requestAnimationFrame? 
// It will give smooth game play and highest FPS game paly.And also faster than setinterval and setTimeout method.
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    // inputDir = { x: 12, y: 10 }; // Game is Start when user press any
    LastinputDir = inputDir;
    DirectionSound.play();
    BackgroundSound.play();
    switch (e.key) {
        case "ArrowUp":
            if (LastinputDir.y !== 0) {
                break;
            }
            inputDir = { x: 0, y: -1 };
            break;

        case "ArrowDown":
            if (LastinputDir.y !== 0) {
                break;
            }
            inputDir = { x: 0, y: 1 };
            break;

        case "ArrowLeft":
            if (LastinputDir.x !== 0) {
                break;
            }
            inputDir = { x: -1, y: 0 };
            break;

        case "ArrowRight":
            if (LastinputDir.x !== 0) {
                break;
            }
            inputDir = { x: 1, y: 0 };
            break;

        default:
            break;
    }

});

const ButtonDirUP = document.querySelector("#U");
ButtonDirUP.addEventListener("click" , (e) =>{
    DirectionSound.play();
    BackgroundSound.play();
    LastinputDir = inputDir;
    switch (e.target.id) {
        case "U":
            if (LastinputDir.y !== 0) {
                break;
            }
            inputDir = { x: 0, y: -1 };
            break;
    
        default:
            break;

        
        }

});
const ButtonDirDown = document.querySelector(".D");
ButtonDirDown.addEventListener("click" , (e) =>{
    DirectionSound.play();
    BackgroundSound.play();
    LastinputDir = inputDir;
    switch (e.target.id) {
        case "D":
            if (LastinputDir.y !== 0) {
                break;
            }
            inputDir = { x: 0, y: 1 };
            break;

        default:
            break;
        }

});

const ButtonDirLeft = document.querySelector(".L");
ButtonDirLeft.addEventListener("click" , (e) =>{
    DirectionSound.play();
    BackgroundSound.play();
    LastinputDir = inputDir;
    switch (e.target.id) {
        case "L":
            if (LastinputDir.x !== 0) {
                break;
            }
            inputDir = { x: -1, y: 0 };
            break;

        default:
            break;
        }

});

const ButtonDirRight = document.querySelector(".R");
ButtonDirRight.addEventListener("click" , (e) =>{
    DirectionSound.play();
    BackgroundSound.play();
    LastinputDir = inputDir;
    switch (e.target.id) {
        case "R":
            if (LastinputDir.x !== 0) {
                break;
            }
            inputDir = { x: 1, y: 0 };
            break;


        default:
            break;
        }

});


