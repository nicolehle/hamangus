// Create the canvas

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1020;
canvas.height = 900;
document.body.appendChild(canvas);


// Background image

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
  bgReady = true;
};
bgImage.src = "img/background_big.jpg";



// Hero image

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
  heroReady = true;
};
heroImage.src = "img/hero_big.png";



// Monster Image

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
  monsterReady = true;
};
monsterImage.src = "img/monster_small.png";



// Game objects

var hero = {
  speed: 1200,
  x: canvas.width / 1.95,
  y: canvas.height / 7

};

var monster = {
  x: 0,
  y: 0
}

var monsterCaught = 0;



// Player Input
// Handle keyboard controls

var keysDown = {};

addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false);



// Reset the game when the player catches a monster

var reset = function() {

  // Throw the moster randomly on the screen

  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
}



// Update game objects

var update = function(modifier) {
  if(38 in keysDown) { // Avatar goes up
    hero.y -= hero.speed * modifier;
  }
  if(40 in keysDown) { // Avatar goes down
    hero.y += hero.speed * modifier;
  }
  if(37 in keysDown) { // Avatar goes left
    hero.x -= hero.speed * modifier;
  }
  if(39 in keysDown) { // Avatar goes right
    hero.x += hero.speed * modifier;
  }


  // They are touching meaning avatar caught monster
  if(
    hero.x <= (monster.x + 32)
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ) {
    ++monsterCaught;
    reset();
  }
}



// Draw on the canvas

var render = function() {
  if(bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if(heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if(monster) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  // Scores

  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseLine = "top";
  ctx.fillText( monsterCaught + "마리 독사새끼들", 32, 32);
}

  // Clear

var clear = function() {
  bgReady = false;
  heroReady = false;
  moster = false;
}




// The main game loop

var main = function() {
  if(audioObj.play()){
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
  }
}


// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


// Finish game!
function doSomething() {
  scoreBox.style.display = "block";
  startButton.style.display = "none";
  scoreText.innerHTML = monsterCaught + " 마리 잡았다. <br> 독사 씌가아 말랐때요~~~ 우쨔우쨔 으허으허 예에!";
  audioObj = null;
};


// Play game!
var startButton = document.getElementById('start');
var scoreBox = document.getElementById('score');
var scoreText = document.getElementById('scoreText');
var body = document.body;
var then = Date.now();
let audioObj = new Audio('../hamangus/img/hamasong.mp3');


startButton.addEventListener('click', function() {

  scoreBox.style.display = "none";
  setTimeout(() => {

    // Create Timer
    var timeLeft = 87;
    var elem = document.getElementById('demo');
    var timerId = setInterval(countdown, 1000);

    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
      } else {
        elem.innerHTML = "남은시간: " + timeLeft + 's';
        timeLeft--;
      }
    }

    audioObj.play();
    reset();
    main();

  }, 0);
})

audioObj.addEventListener('ended', () => {
  doSomething();
})
