let canvas;
let world;
let keyboard = new Keyboard();
let game_music = new Audio('audio/gamemusic.mp3');


 function startGame() {
    document.getElementById('start-screen-overlay').style.display = 'none';
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('game-title').style.display = 'flex';
    document.getElementById('fullscreen').classList.remove('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
   // game_music.play();
    game_music.volume = 0.3;
    console.log('My character is', world['character']);  //Schreibweise world.character auch möglich
}

function restartGame(){
    location.reload()
}

function getFullscreen(){
    canvas.requestFullscreen();
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.Down = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }

});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.Down = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }

});


