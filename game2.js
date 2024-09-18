<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
canvas {
    border:1px solid #d3d3d3;
    background-color: #f1f1f1;
}
</style>
</head>
<body onload="startGame()" onkeydown="controlGame(event)" onkeyup="stopControl(event)">
<script>

var myGamePiece;
var myObstacles = [];
var myScore;

// Function to start the game
function startGame() {
    myGamePiece = new gameObject(30, 30, "red", 10, 120);
    character2 = new gameObject(20, 20, "yellow", 20, 150);
    
    myGamePiece.gravity = 0.05;
    myScore = new gameObject("30px", "Consolas", "black", 280, 40, "text");

    myGameArea.start();
}

// Game area setup
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Game object constructor
function gameObject(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

// Function to update the game area
function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (var i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new gameObject(10, height, "green", x, 0));
        myObstacles.push(new gameObject(10, x - height - gap, "green", x, height + gap));
    }
    for (var i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
    character2.update();
}

// Function to check if the interval has passed
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}

// Function to control acceleration
function accelerate(n) {
    myGamePiece.gravity = n;
}

// Event handlers for keyboard controls
function controlGame(e) {
    switch(e.key) {
        case "ArrowUp":
            myGamePiece.speedY = -2; // Move up
            break;
        case "ArrowDown":
            myGamePiece.speedY = 2; // Move down
            break;
    }
}

function stopControl(e) {
    switch(e.key) {
        case "ArrowUp":
        case "ArrowDown":
            myGamePiece.speedY = 0; // Stop vertical movement
            break;
    }
}

</script>
<br>
<button onmousedown="accelerate(-0.2)" onmouseup="accelerate(0.05)">ACCELERATE</button>
<p>Use the ACCELERATE button to stay in the air</p>
<p>How long can you stay alive?</p>
</body>
</html>
