class World extends MovableObject {                       //in Klassen darf man vor Funktionen nicht mehr "function" schreiben und vor Variablen nicht mehr "let"
    character = new Character();
    bounce_sound = new Audio('audio/bounce_sound.mp3');
    bottle_sound = new Audio('audio/collectBottle.mp3');
    chicken_dead = new Audio('audio/chicken_kill.mp3');
    victory_music = new Audio('audio/victory_music.mp3');
    character_hurt = new Audio('audio/character_hurt.mp3');
    endboss_kill = new Audio('audio/endboss_kill.mp3');
    endboss;
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;   // verschiebt um 100 Pixel nach LINKS auf der x-Achse;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    throwableObjects = [];
    coin_sound = new Audio('audio/coin.mp3');
    coinAmount = 0;
    bottleAmount = 0;
    bottle;
    chickenArray;
    chicken;
    positionChicken;

    /**
     * this function calls the constructor i.e. sets up the variables and functions of the world class
     * 
     * @param {HTMLCanvasElement} canvas - canvas on which the game is drawn
     * @param {class} keyboard - passing on the keycodes
     */
    constructor(canvas, keyboard) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.endboss = this.level.enemies[this.level.enemies.length - 1];
        this.chickenArray = this.level.enemies.slice(0, -1);
        //this.movableObjects = [this.endboss, this.chickenArray];
        this.draw();
        this.setWorld(); // um Keyboard an andere Objekte weiterzugeben
        this.run(); //Funktion die regelmäßig kontrolliert, ob Objekte miteinander kollidieren
        this.checkFirstEncounter();
    }

    /**
     * This function detects when the character is close to the Endboss and saves the time of this first encounter
     */
    checkFirstEncounter() {
        setInterval(() => {
            if (!this.endboss) {
                clearInterval();
            } else if (this.character.x > this.endboss.x - 500 && !this.endboss.firstEncounter) {
                this.endboss.firstEncounter = new Date().getTime();
                console.log('the first encounter', this.endboss.firstEncounter);
            }
        }, 1000 / 60);
    }

    /**
     * This function includes the character class in the world class
     */

    setWorld() {
        this.character.world = this;
    }

    /**
     * run continuously checks all collisions within the game world and creates new instances of the ThrowableObject class if a bottle is thrown
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    /**
     * this function creates an instance of the ThrowableObject class after 'D' is pressed and it updates the current amount of bottles available
     */

    checkThrowObjects() {

        if (this.keyboard.D && this.bottleAmount > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.bottleAmount--;
            this.bottleBar.setPercentage(this.bottleAmount);
        }
    }

    /**
     * this function continuously checks the collisions between the character, the chickens, the bottles, the coins and the endboss
     */

    checkCollisions() {
        this.checkChickenCollision();
        this.checkEndbossCollision();
        this.checkCoinsCollision();
        this.checkBottleCollision();
        this.checkCollectingBottles();

    }


    /**
     * This function checks the collision between the character and the chicken mobs and updates the life bar of the character
     */

    checkChickenCollision() {
        this.chickenArray.forEach((enemy) => {
            let positionChicken = this.chickenArray.indexOf(enemy);
            if (this.character.isColliding(enemy) && !this.character.isAboveGround() && this.chickenArray[positionChicken].state != 'dead') {
                this.character.hit();
                this.character_hurt.play();
                this.statusBar.setPercentage(this.character.energy);
                console.log('character energy', this.character.energy);
            } else if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.chickenArray[positionChicken] != 'dead') {
                this.chickenArray[positionChicken].state == 'dead';
                this.characterBounce(positionChicken);
                enemy.hit();
            }
        });
    }

    /**
     * This function checks the collision between the endboss and the character and updates the lifebar
     */

    checkEndbossCollision() {
        if (this.endboss.isColliding(this.character) && this.endboss.state != 'dead') {
            this.character.hit();
            this.character_hurt.play();
            this.statusBar.setPercentage(this.character.energy);
            console.log('character energy', this.character.energy);
        }
    }

    /**
     * This function checks the collision between the character and the static coins and updates the coinbar
     */

    checkCoinsCollision() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                console.log('collected Coin', coin);
                let position = this.level.coins.indexOf(coin);
                this.level.coins.splice(position, 1);
                this.coin_sound.play();
                this.coinAmount++;
                this.coinBar.setPercentage(this.coinAmount);
            }
        });
    }

    /**
     * this Function checks the collision between a bottle and the enemies
     */

    checkBottleCollision() {
        this.throwableObjects.forEach((ThrowableObject) => {
            this.bottleOnChicken(ThrowableObject);
            this.bottleOnEndboss(ThrowableObject)

        });

    }

    /**
     * This function checks the collision between the character and the static bottles and updates the bottlebar
     */

    checkCollectingBottles(){
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                let positionBottle = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(positionBottle, 1);
                this.bottle_sound.play();
                this.bottleAmount++;
                this.bottleBar.setPercentage(this.bottleAmount);
            }
        });
    }

    /**
     * This function checks the collision between a bottle and a chicken mob and applies damage to the chicken
     * @param {object} object - new instance of ThrowableObject class
     */

    bottleOnChicken(object) {
        this.chickenArray.forEach((chicken) => {
            if (chicken.isColliding(object)) {
                let positionChicken = this.chickenArray.indexOf(chicken);
                this.chickenArray[positionChicken].hit();
                object.bottleHits();
                this.chickenArray[positionChicken].state == 'dead';
            }
        });

    }

    /**
     * This function checks the collision the endboss and the bottles or the character
     * @param {object} object - new instance of ThrowableObject class
     */

    bottleOnEndboss(object) {
        this.checkBottleonEndbossHit(object);
        this.checkEndbossToCharacterHit();
        this.checkIfBossisDead();
  
    }

    /**
     * This function checks the collision between the endboss and a bottle and applies damage to endboss
     * @param {object} object - new instance of ThrowableObject class
     */

    checkBottleonEndbossHit(object){
        if (object.isColliding(this.endboss) && this.endboss.state != 'dead') {
            this.endboss.hit();
            this.chicken_dead.play();
            object.bottleHits();
            console.log('boss is hit', this.endboss);
            this.endbossBar.setPercentage(this.endboss.energy);
            console.log('endboss energy', this.endboss.energy);
        }
    }

    /**
     * This function checks the collision between the endboss and the character and applies damage to character
     */
    checkEndbossToCharacterHit(){
        if (this.endboss.isColliding(this.character)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    /**
     * This function checks if the endboss is killed and deletes the endboss from the enemies array
     */

    checkIfBossisDead(){
        if (this.endboss.energy == 0) {
            this.endboss_kill.play();
            setTimeout(() => {
                this.level.enemies.splice(this.level.enemies.length - 1, 1);
            }, 2500);
            setTimeout(() => {
                this.showVictoryScreen();
            }, 3000);
        }
    }

    /**
     * This function adds a bounce animation if the character jumps onto a chicken to kill it
     * @param {Array.<Object>} position - position of the chicken in the enemies array
     */


characterBounce(position) {
    if (this.chickenArray[position].state != 'dead') {
        this.character.speedY = 15;
        this.character.x += 10;
        this.bounce_sound.play();
        this.chicken_dead.play();
    }
}

/**
 * This function checks the character's energy and sets its state to 'dead' if the energy equals 0
 */

checkEnergy() {
    if (this.character.energy >= 0) {
        console.log('Character is Dead');
        this.character.state == 'dead';
    }
}

/**
 * This function calls the victory screen once the endboss is killed
 */

showVictoryScreen() {
    game_music.pause();
    this.endboss_kill.pause();
    this.victory_music.play();
    document.getElementById('game-title').style.display = "none";
    document.getElementById('canvas').style.display = "none";
    document.getElementById('victory-screen').style.display = "flex";
    document.getElementById('fullscreen').style.display = "none";

}

/**
 * This function continously draws all elements onto the canvas after first erasing them
 */


draw() {  // draw-Methode wird durch Grafikkarte ausgeführt
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);    //löscht den Canvas, damit wieder etwas neu gezeichnet werden kann;

    this.ctx.translate(this.camera_x, 0);                                //translate: verschiebt etwas (canvas) um eine gewisse Variable;
    this.addObjectsToMap(this.level.backgroundObjects);
    //Reihenfolge bei draw-Methode ist wichtig; background muss zuerst gezeichnet werden          
    this.ctx.translate(-this.camera_x, 0);      //backward
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.ctx.font = "16px Verdana";
    this.ctx.fillText(`x ${this.coinAmount}`, 225, 75);
    this.addToMap(this.bottleBar);
    if (!this.endboss) {
        delete this.endbossBar;
    } else if (this.character.x > this.endboss.x - 500) {
        this.addToMap(this.endbossBar);
    }
    this.ctx.translate(this.camera_x, 0);       //forward

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);



    /**
     * This function tells the browser that you wish to perform an animation
     */

    let self = this;                                  //durch "this" greift man auf alle Variablen aus dieser KLasse (hier oben) zu
    requestAnimationFrame(function () {
        self.draw();
    });                                              //draw-Methode wird mehrfach aufgerufen (normal bei Spielen) --> wird so oft aufgerufen, wie es Grafikkarte hergibt
    // requestAnimationFrame wird ausgeführt, sobald darüber gezeichnet wurde --> wird asynchron, also etwas später ausgeführt!"this" funktioniert bei Objektorientierung innerhalb von requestAnimation nicht!!!
}

/**
 * This function loops through all objects and adds them to the canvas
 * @param {object} objects - one of the objects which have been defined for the game 
 */
addObjectsToMap(objects) {
    objects.forEach(o => {
        this.addToMap(o);
    });
}


/**
 * This function checks the direction of the movable objects
 * @param {object} mo - movable object
 */
addToMap(mo) {
    if (mo.otherDirection) {
        this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx)

    if (mo.otherDirection) {
        this.flipImageBack(mo);
    }

}

/**
 * This function flips the image of the movable object around of it faces to the left, i.e. if otherDirection is 'true'
 * @param {object} mo - movable object
 */


flipImage(mo) {
    this.ctx.save();                //speichert aktuelle Einstellungen des Kontexts
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;                // dreht x-Koordinate um
}

/**
 * This function flips the image of the movable object back if otherDirection is 'false'
 * @param {object} mo - movable object
 */
flipImageBack(mo) {
    mo.x = mo.x * -1
    this.ctx.restore();
}
}