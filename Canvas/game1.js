import sounds from '../Canvas/alienbgm.mp3';

const myMusic = new Audio(sounds);
myMusic.loop = true; // Loop the audio

myMusic.play().catch(err => {
    console.error("Error playing music: ", err);
});
