// Global variables
var myGamePiece; // The main game piece controlled by the player
var myObstacles = []; // Array to store obstacles in the game
var myScore; // Object to display the score

// Function to initialize and start the game
function startGame() {
    // Create the main game piece and an additional character
    myGamePiece = new gameObject(30, 30, "red", 10, 120);
    character2 = new gameObject(20, 20, "yellow", 20, 150);
    
    myGamePiece.gravity = 0.05; // Set gravity effect for the game piece
    myScore = new gameObject("30px", "Consolas", "black", 280, 40, "text"); // Initialize score display

    myGameArea.start(); // Start the game area (canvas and game loop)
}

// Object to manage the game area
var myGameArea = {
    canvas : document.createElement("canvas"), // Create a new canvas element
    start : function() {
        this.canvas.width = 480; // Set the width of the canvas
        this.canvas.height = 270; // Set the height of the canvas
        this.context = this.canvas.getContext("2d"); // Get 2D drawing context for the canvas
        document.body.insertBefore(this.canvas, document.body.childNodes[0]); // Insert the canvas into the document
        this.frameNo = 0; // Initialize frame number
        this.interval = setInterval(updateGameArea, 20); // Set interval to update the game every 20 milliseconds
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    }
}

// Constructor function to create game objects
function gameObject(width, height, color, x, y, type) {
    this.type = type; // Type of the object (e.g., "text" or "shape")
    this.score = 0; // Score for the object (not used in this code)
    this.width = width; // Width of the object
    this.height = height; // Height of the object
    this.speedX = 0; // Horizontal speed of the object
    this.speedY = 0; // Vertical speed of the object
    this.x = x; // X position of the object
    this.y = y; // Y position of the object
    this.gravity = 0; // Gravity effect on the object
    this.gravitySpeed = 0; // Speed due to gravity

    // Function to update the object's appearance on the canvas
    this.update = function() {
        ctx = myGameArea.context; // Get the drawing context
        if (this.type == "text") { // If the object is text
            ctx.font = this.width + " " + this.height; // Set font size and family
            ctx.fillStyle = color; // Set text color
            ctx.fillText(this.text, this.x, this.y); // Draw the text on the canvas
        } else { // If the object is a shape
            ctx.fillStyle = color; // Set shape color
            ctx.fillRect(this.x, this.y, this.width, this.height); // Draw the rectangle on the canvas
        }
    }

    // Function to update the object's position based on speed and gravity
    this.newPos = function() {
        this.gravitySpeed += this.gravity; // Apply gravity effect
        this.x += this.speedX; // Update X position
        this.y += this.speedY + this.gravitySpeed; // Update Y position with gravity effect
        this.hitBottom(); // Check if the object hits the bottom of the canvas
    }

    // Function to check if the object hits the bottom boundary of the canvas
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height; // Calculate bottom boundary
        if (this.y > rockbottom) { // If the object is below the boundary
            this.y = rockbottom; // Set Y position to the bottom
            this.gravitySpeed = 0; // Stop gravity effect
        }
    }

    // Function to check if the object collides with another object
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true; // Assume collision by default
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false; // No collision
        }
        return crash; // Return whether there is a collision
    }
}

// Function to update the game area
function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) { // Check for collision with obstacles
            return; // Stop the game if collision occurs
        } 
    }
    myGameArea.clear(); // Clear the canvas
    myGameArea.frameNo += 1; // Increment frame number
    if (myGameArea.frameNo == 1 || everyinterval(150)) { // Create new obstacles periodically
        x = myGameArea.canvas.width; // Set X position for new obstacles
        minHeight = 20; // Minimum obstacle height
        maxHeight = 200; // Maximum obstacle height
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight); // Random height
        minGap = 50; // Minimum gap between obstacles
        maxGap = 200; // Maximum gap between obstacles
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap); // Random gap
        // Add top and bottom obstacles
        myObstacles.push(new gameObject(10, height, "green", x, 0));
        myObstacles.push(new gameObject(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1; // Move obstacles to the left
        myObstacles[i].update(); // Update obstacle positions
    }
    myScore.text = "SCORE: " + myGameArea.frameNo; // Update score display
    myScore.update(); // Draw the score on the canvas
    myGamePiece.newPos(); // Update game piece position
    myGamePiece.update(); // Draw the game piece on the canvas
    character2.update(); // Draw the additional character on the canvas
}

// Function to check if a specific interval has passed
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;} // Check if frame number is a multiple of n
    return false; // Return false otherwise
}

// Function to adjust gravity effect on the game piece
function accelerate(n) {
    myGamePiece.gravity = n; // Set new gravity value
}
