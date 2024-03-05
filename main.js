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
backgroundImage.src = "images/background.png";

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
