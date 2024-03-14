// create the canvas and context
let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// create background image object and check if background image is loaded
let backgroundReady = false;
let backgroundImage = new Image();
backgroundImage.onload = function () {
    backgroundReady = true;
};
backgroundImage.src = "images/background_new.png";

// create edge image and check if image is loaded
let edgeReady = false;
let edgeImage = new Image();
edgeImage.onload = function() {
    edgeReady = true;
}
edgeImage.src = "images/edge.png"

// create ship image object and check if ship image is loaded
let shipReady = false;
let shipImage = new Image();
shipImage.onload = function () {
    shipReady = true;
};
shipImage.src = "images/ship.png";

// ship object flipped
let shipFlippedReady = false;
let shipFlippedImage = new Image();
shipFlippedImage.onload = function () {
    shipFlippedReady = true;
};
shipFlippedImage.src = "images/ship-flipped.png";

// create treasure image object and check if treasure image is loaded
let treasureReady = false;
let treasureImage = new Image();
treasureImage.onload = function () {
    treasureReady = true;
};
treasureImage.src = "images/chest.png";

let treasureReady_2 = false;
let treasureImage_2 = new Image();
treasureImage_2.onload = function () {
    treasureReady_2 = true;
};
treasureImage_2.src = "images/chest-2.png";


// create shark image and check if loaded
let sharkReady = false;
let sharkImage = new Image();
sharkImage.onload = function() {
    sharkReady = true;
};
sharkImage.src = "images/shark.png";

let sharkFlippedReady = false;
let sharkFlippedImage = new Image();
sharkFlippedImage.onload = function() {
    sharkFlippedReady = true;
};
sharkFlippedImage.src = "images/shark-flipped.png";

// SOUNDS GO HERE
let soundTreasure = "sounds/treasure.wav";
let soundFx = document.getElementById("soundFX");

// SHIP ORIENTATION
let reverseShipSprite = false;

// SHARK ORIENTATION
let reverseSharkSprite = false;

// draw everything in main render function
let render = function () {
    if (backgroundReady) {
        context.drawImage(backgroundImage, 0, 0);
    }
    if (edgeReady) {
        context.drawImage(edgeImage, 0, 0);
    }
    if (shipReady && shipFlippedReady) {
        if (reverseShipSprite === false){
            context.drawImage(shipImage, ship.x, ship.y);
        } else {
            context.drawImage(shipFlippedImage, ship.x, ship.y);
        }
    }

    if (sharkReady && sharkFlippedReady) {
        if (reverseSharkSprite === false){
            context.drawImage(sharkImage, shark.x, shark.y);
        } else {
            context.drawImage(sharkFlippedImage, shark.x, shark.y);
        }
    }
    if (treasureReady && treasureReady_2) {
        context.drawImage(treasureImage, treasure1.x, treasure1.y);
        context.drawImage(treasureImage_2, treasure2.x, treasure2.y);
    }

    // display player score and time remaining
    context.fillStyle = "rgb(250, 250, 250)";
    context.font = "24px Helvetica";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("Treasure Collected: " + treasureCaught + " Time left: " + (timeRemaining / 1000), 32, 32);
}

// create ship object
let ship = {
    speed: 256,
    x: 0,
    y: 0
};

//create first treasure object
let treasure1 = {
    x: 0,
    y: 0
};

//create second treasure object
let treasure2 = {
    x: 0,
    y: 0
};

// create shark object
let shark = {
    speed: 125,
    x: 0,
    y: 0
};

// create player score
let treasureCaught = 0;

// main game loop
let main = function () {
    let now = Date.now();
    let delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    if (timeRemaining > 0) {
        requestAnimationFrame(main);
    }
    else {
        if (!shipCaught){
            gameOver();
        }
    }
};

let startingTime = 10000; // 1 second = 1000 milliseconds

let timeRemaining = startingTime;

let shipCaught = false;

// show the user an alert when time runs out or user touches the shark
let gameOver = function() {

    let gameOverHeader = document.createElement("h1")

    if (shipCaught){
        gameOverHeader.innerText="You were caught! ";
        timeRemaining = 0;
    } else {
        gameOverHeader.innerText="Time is up! "; 
    }

    if (treasureCaught > 1) {
        gameOverHeader.innerText += "You found " + treasureCaught + " treasure chests. Refresh to play again.";
    }
    else if (treasureCaught == 1) {
        gameOverHeader.innerText += "You found " + treasureCaught + " treasure chest. Refresh to play again.";
    }
    else {
        gameOverHeader.innerText += "You didn't find any treasure chests. Refresh to play again.";
    }


    document.body.appendChild(gameOverHeader);
}

// count down time remaining every second
let decreaseTimeRemaining = function() {
    
    setInterval(function() {
        if (timeRemaining > 0) {
            timeRemaining = timeRemaining - 1000
        }
        else {
            timeRemaining = 0;
        }
    }, 1000);
}

// reset the game when page is loaded or refreshed
let reset = function () {
    ship.x = (canvas.width / 2) - 16;
    ship.y = (canvas.height / 2) - 16;
    treasure1.x = 32 + (Math.random() * (canvas.width - 96));
    treasure1.y = 32 + (Math.random() * (canvas.height - 96));
    treasure2.x = 32 + (Math.random() * (canvas.width - 96));
    treasure2.y = 32 + (Math.random() * (canvas.height - 96));

    decreaseTimeRemaining();
};

// handle keyboard inputs
let keysDown = {};

// key press
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

// key release
addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// move game objects when keys are preseed
let update = function (modifier) {
    // check if ship is at the border
    if (38 in keysDown && ship.y > 32) { //  holding up key
        ship.y -= ship.speed * modifier;
    }
    if (40 in keysDown && ship.y < canvas.height - (64)) { //  holding down key 
        ship.y += ship.speed * modifier;
    }
    if (37 in keysDown && ship.x > (32)) { // holding left key
        reverseShipSprite = false;
        ship.x -= ship.speed * modifier;
    }
    if (39 in keysDown && ship.x < canvas.width - (64)) { // holding right key
        reverseShipSprite = true;
        ship.x += ship.speed * modifier;
    }
    
    // check if ship and first treasure are touching
    if (
        ship.x <= (treasure1.x + 32)
        && treasure1.x <= (ship.x + 32)
        && ship.y <= (treasure1.y + 32)
        && treasure1.y <= (ship.y + 32)
        ) 
    {
        soundFx.src = soundTreasure;
        soundFx.play();
        ++treasureCaught; // increase player score
        
        // reset treasure position
        treasure1.x = 32 + (Math.random() * (canvas.width - 96));
        treasure1.y = 32 + (Math.random() * (canvas.height - 96));
    }

    // check if ship and second treasure are touching
    if (
        ship.x <= (treasure2.x + 32)
        && treasure2.x <= (ship.x + 32)
        && ship.y <= (treasure2.y + 32)
        && treasure2.y <= (ship.y + 32)
        ) 
    {
        soundFx.src = soundTreasure;
        soundFx.play();
        ++treasureCaught; // increase player score
        
        // reset treasure position
        treasure2.x = 32 + (Math.random() * (canvas.width - 96));
        treasure2.y = 32 + (Math.random() * (canvas.height - 96));
    }
    
    //move the shark
    moveShark(modifier);

    // check if the shark and ship are touching
    if (
        ship.x <= (shark.x + 32)
        && shark.x <= (ship.x + 32)
        && ship.y <= (shark.y + 32)
        && shark.y <= (ship.y + 32)
        )
    {
        shipCaught = true;
        gameOver();
    }
};

// function that moves the shark
let moveShark = function(modifier) {

    let vector_x = 0.0;
    let vector_y = 0.0;
    vector_x = ship.x - shark.x;
    vector_y = ship.y - shark.y;
    
    let unitVector_x = 0.0;
    let unitVector_y = 0.0;
    let vector_magnitude = 0.0;

    vector_magnitude = Math.sqrt(Math.pow(vector_x, 2) + Math.pow(vector_y, 2));
    unitVector_x = vector_x / vector_magnitude;
    unitVector_y = vector_y / vector_magnitude;
    shark.x += unitVector_x * (shark.speed * modifier);
    shark.y += unitVector_y * (shark.speed * modifier);

    // flip shark sprite if unit vector is positive x
    if (unitVector_x >= 0){
        reverseSharkSprite = true;
    } else {
        reverseSharkSprite = false;
    }
}

// start the game
let then = Date.now();
reset();
main();
