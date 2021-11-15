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

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {

        if (this.keyboard.D && this.bottleAmount > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.bottleAmount--;
            this.bottleBar.setPercentage(this.bottleAmount);
        }
    }

    checkCollisions() {

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

        if (this.endboss.isColliding(this.character) && this.endboss.state != 'dead') {
            this.character.hit();
            this.character_hurt.play();
            this.statusBar.setPercentage(this.character.energy);
            console.log('character energy', this.character.energy);
        }

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
        this.throwableObjects.forEach((ThrowableObject) => {
            this.chickenArray.forEach((chicken) => {
                if (chicken.isColliding(ThrowableObject)) {
                    let positionChicken = this.chickenArray.indexOf(chicken);
                    this.chickenArray[positionChicken].hit();
                    ThrowableObject.bottleHits();
                    console.log(ThrowableObject);
                    //ThrowableObject.playAnimation()
                    this.chickenArray[positionChicken].state == 'dead';
                    // setTimeout(() => {
                    //   this.chickenArray.splice(positionChicken,1);
                    //}, 2000);
                }
            });

            if (ThrowableObject.isColliding(this.endboss) && this.endboss.state != 'dead') {
                this.endboss.hit();
                this.chicken_dead.play();
                ThrowableObject.bottleHits();
                console.log('boss is hit', this.endboss);
                this.endbossBar.setPercentage(this.endboss.energy);
                console.log('endboss energy', this.endboss.energy);
                if (this.endboss.isColliding(this.character)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
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
        });


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

    characterBounce(position) {
        if (this.chickenArray[position].state != 'dead') {
            this.character.speedY = 15;
            this.character.x += 10;
            this.bounce_sound.play();
            this.chicken_dead.play();
        }
    }

    checkEnergy() {
        if (this.character.energy >= 0) {
            console.log('Character is Dead');
            this.character.state == 'dead';
        }
    }

    showVictoryScreen() {
        game_music.pause();
        this.victory_music.play();
        document.getElementById('game-title').style.display = "none";
        document.getElementById('canvas').style.display = "none";
        document.getElementById('victory-screen').style.display = "flex";
        document.getElementById('fullscreen').style.display = "none";
        
    }


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




        let self = this;                            //durch "this" greift man auf alle Variablen aus dieser KLasse (hier oben) zu
        requestAnimationFrame(function () {
            self.draw();
        });                                         //draw-Methode wird mehrfach aufgerufen (normal bei Spielen) --> wird so oft aufgerufen, wie es Grafikkarte hergibt
        // requestAnimationFrame wird ausgeführt, sobald darüber gezeichnet wurde --> wird asynchron, also etwas später ausgeführt!"this" funktioniert bei Objektorientierung innerhalb von requestAnimation nicht!!!
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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

    flipImage(mo) {
        this.ctx.save();                //speichert aktuelle Einstellungen des Kontexts
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;                // dreht x-Koordinate um
    }       

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }
}