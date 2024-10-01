function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    // New flag to prevent overlapping sounds
    this.hasPlayed = false;

    this.play = function() {
        if (!this.hasPlayed) {
            this.sound.play();
            this.hasPlayed = true; // Set the flag to true after playing
        }
    }
    
    this.stop = function() {
        this.sound.pause();
        this.sound.currentTime = 0; // Reset to the beginning
        this.hasPlayed = false; // Allow to play again next time
    }
}
