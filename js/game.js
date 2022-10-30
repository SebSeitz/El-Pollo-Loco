let canvas;
let world;
let keyboard = new Keyboard();
let game_music = new Audio('audio/gamemusic.mp3');
let height;
let y;

/**
 * This function hides the start screen overlay and shows the canvas, i.e. starts the game
 *
 */
function startGame() {
    y = 350;
    height = 90;
    initLevel(y, height);
    document.getElementById('start-screen-overlay').style.display = 'none';
    // document.getElementById('victory-screen').classList.add = 'none';
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('game-title').style.display = 'flex';
    document.getElementById('fullscreen').classList.remove('d-none');
    document.getElementById('touchpad').classList.remove('d-none');
    document.getElementById('touchpad').classList.add('touchpad-container');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
    game_music.play();
    console.log('My character is', world['character']);  //Schreibweise world.character auch möglich
}

function nextLevel(){
    y = 320;
    height = 130;
    world.victory_music.pause();
    initLevel2(y, height);
    document.getElementById('nextLevelButton').classList.add('d-none');
    document.getElementById('start-screen-overlay').style.display = 'none';
    document.getElementById('canvas').style.display = 'flex';
    document.getElementById('game-title').style.display = 'flex';
    document.getElementById('fullscreen').classList.remove('d-none');
    document.getElementById('touchpad').classList.remove('d-none');
    document.getElementById('touchpad').classList.add('touchpad-container');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level2);
    world.victory_music.currentTime = 0;
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
    e.preventDefault();
    return false;

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












