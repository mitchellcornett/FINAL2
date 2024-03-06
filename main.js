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
backgroundImage.src = "images/background.jpg";

// create hero image object and check if hero image is loaded
let heroReady = false;
let heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";

// create monster image object and check if monster image is loaded
let monsterReady = false;
let monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";

// draw everything in main render function
let render = function () {
    if (backgroundReady) {
        context.drawImage(backgroundImage, 0, 0);
    }
    if (heroReady) {
        context.drawImage(heroImage, hero.x, hero.y);
    }
    if (monsterReady) {
        context.drawImage(monsterImage, monster.x, monster.y);
    }

    // display player score
    context.fillStyle = "rgb(250, 250, 250)";
    context.font = "24px Helvetica";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("Monsters caught: " + monstersCaught, 32, 32);
}

// create hero object
let hero = {
    speed: 256,
    x: 0,
    y: 0
};

//create monster object
let monster = {
    x: 0,
    y: 0
};

// main game loop
let main = function () {
    let now = Date.now();
    let delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    requestAnimationFrame(main);
};

// reset the game when monster is caught
let reset = function () {
    hero.x = (canvas.width / 2) - 16;
    hero.y = (canvas.height / 2) - 16;
    monster.x = 32 + (Math.random() * (canvas.width - 96));
    monster.y = 32 + (Math.random() * (canvas.height - 96));
};

// create player score
let monstersCaught = 0;

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
    // check if hero is at the border
    if (38 in keysDown && hero.y > 32) { //  holding up key
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown && hero.y < canvas.height - (64)) { //  holding down key
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown && hero.x > (32)) { // holding left key
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown && hero.x < canvas.width - (64)) { // holding right key
        hero.x += hero.speed * modifier;
    }
    
     // check if hero and monster are touching
     if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        ++monstersCaught; // increase player score
        reset(); // restart game
    }
};

// start the game
let then = Date.now();
reset();
main();
