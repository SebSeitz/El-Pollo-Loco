let canvas;
let world;
let keyboard = new Keyboard();
let game_music = new Audio('audio/gamemusic.mp3');

/**
 * This function hides the start screen overlay and shows the canvas, i.e. starts the game
 *
 */
function startGame() {
    initLevel();
    initLevel2();
    document.getElementById('start-screen-overlay').style.display = 'none';
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('game-title').style.display = 'flex';
    document.getElementById('fullscreen').classList.remove('d-none');
    document.getElementById('touchpad').classList.remove('d-none');
    document.getElementById('touchpad').classList.add('touchpad-container');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    game_music.play();
    game_music.volume = 0.3;
    console.log('My character is', world['character']);  //Schreibweise world.character auch möglich
}

function nextLevel(){
    initLevel2();
    document.getElementById('victory-screen').style.display = 'none';
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('game-title').style.display = 'flex';
    document.getElementById('fullscreen').classList.remove('d-none');
    document.getElementById('touchpad').classList.remove('d-none');
    document.getElementById('touchpad').classList.add('touchpad-container');
    canvas = document.getElementById('canvas');

    world = new World(canvas, keyboard);
    game_music.play();
    game_music.volume = 0.3;

}
/**
 * This function lets the user return to the start screen
 */
function restartGame() {
    location.reload()
}


/**
 * This function calls fullscreen mode
 */
function getFullscreen() {
    document.getElementById('canvas').style.backgroundImage = 'none';
    canvas.requestFullscreen();


}

/**
 * This function sets keys on keydown to true in the keyboard object class
 */
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












