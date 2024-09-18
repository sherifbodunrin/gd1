<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style>
        /* Style for the canvas element */
        canvas {
            border:2px solid #d3d3d3; /* Border around the canvas */
            background-color: #00f1f1; /* Background color of the canvas */
        }
    </style>
</head>
<body onload="startGame()">
    <!-- Link to the external JavaScript file containing the game logic -->
    <script src="https://zhangsgithub04.github.io/canvas/game2.js"></script>

    <!-- Button to control acceleration of the game piece -->
    <br>
    <button onmousedown="accelerate(-0.2)" onmouseup="accelerate(0.05)">ACCELERATE</button>
    <p>Use the ACCELERATE button to stay in the air</p>

    <!-- Button to start the game -->
    <p>How long can you stay alive?</p>
    <button onClick="startGame()">Start the Game</button>
</body>
</html>
