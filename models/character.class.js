class Character extends MovableObject {
    height = 240;
    y = 80;
    speed = 4.5;
    idleTime = 5001;
    lastIdle = new Date().getTime();
    energy = 50;
    game_music;
    gameover_audio = new Audio('audio/gameover_comment.mp3');


    IMAGES_WALKING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-31.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-32.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-39.png',
    ];

    IMAGES_HURT = [
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png',
    ];

    IMAGES_DEAD = [
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-57.png',
    ];

    IMAGES_IDLE = [
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-1.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-2.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-3.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-4.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-5.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-6.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-7.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-8.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-9.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-10.png',
    ];

    IMAGES_SLEEPING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-11.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-12.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-13.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-14.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-15.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-16.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-17.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-18.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-19.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-20.png',
    ];

    world; // Klasse Charakter kann nun auf Objekte in der Klasse world zugreifen, also u.a. auch auf keyboard
    walking_sound = new Audio('audio/walking.mp3');


    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png'); //super bedeutet, dass von übergeordneter Methode "MovableObject" etwas aufgerufen wird; nämlich loadImage()
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.animate();
        this.implementTouchpad();
    }

    implementTouchpad() {
        this.activateWalking();
        this.deactivateWalking();
        this.controlJumping();
        this.controlThrowing();
    }
    activateWalking() {
        document.getElementById("left-pad").addEventListener("touchstart", function (e) {
            keyboard.LEFT = true;
        });
        document.getElementById("right-pad").addEventListener("touchstart", function (e) {
            keyboard.RIGHT = true;
        });
    }
    deactivateWalking() {
        document.getElementById("left-pad").addEventListener("touchend", function (e) {
            keyboard.LEFT = false;
        });
        document.getElementById("right-pad").addEventListener("touchend", function (e) {
            keyboard.RIGHT = false;
        });
    }
    controlJumping() {
        document.getElementById("jump-pad").addEventListener("touchstart", function (e) {
            keyboard.SPACE = true;
        });
        document.getElementById("jump-pad").addEventListener("touchend", function (e) {
            keyboard.SPACE = false;
        });
    }
    controlThrowing() {
        document.getElementById("throw-pad").addEventListener("touchstart", function (e) {
            keyboard.D = true;
        });
        document.getElementById("throw-pad").addEventListener("touchend", function (e) {
            keyboard.D = false;
        });
    }



    /**
     * This function animates the character
     */
    animate() {
        this.characterMovement();
        this.characterAnimation();
    }

    /**
     * This function plays the character animations
     */
    characterAnimation() {
        let characterAnimationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playDeathAnimation(characterAnimationInterval);
            } else if (this.isHurt()) {
                this.playHurtAnimation();
            } else if (this.isAboveGround()) {
                this.playJumpingAnimation();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playWalkingAnimation();
            } else {
                this.checkIdleAnmiations();
            }
        }, 110);
    }

    playDeathAnimation(interval) {
        this.lastIdle = 0;
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.stopGame(interval);
        }, 2000);
    }

    playHurtAnimation() {
        this.lastIdle = 0;
        this.playAnimation(this.IMAGES_HURT);
    }

    playJumpingAnimation() {
        this.lastIdle = 0;
        this.playAnimation(this.IMAGES_JUMPING);
    }

    playWalkingAnimation() {
        this.lastIdle = 0;
        this.playAnimation(this.IMAGES_WALKING);
    }

    checkIdleAnmiations() {
        if (this.lastIdle == 0) {
            this.lastIdle = new Date().getTime();
        }
        this.idleTime = new Date().getTime() - this.lastIdle;
        if (this.idleTime > 2000) {
            this.playAnimation(this.IMAGES_IDLE);
        } if (this.idleTime > 7000) {
            this.playAnimation(this.IMAGES_SLEEPING);
        }
    }

    /**
     * This function starts the character moving according to the keyboard input
     */
    characterMovement() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump(); //jump Funktion ist in movable-object definiert --> macht code sogar leicht länger, aber besser lesbar!
            }
            this.world.camera_x = -this.x + 100;// Welt wird gegenläufig zur Charakterbewegung verschoben (deswegen - davor)
        }, 1000 / 60);
    }

    /**
     * This function stops the game and shows the game over screen
     * @param {interval} interval - the character animation interval
     */
    stopGame(interval) {
        clearInterval(interval);
        game_music.pause();
        this.gameover_audio.play();
        document.getElementById('game-title').style.display = "none";
        document.getElementById('canvas').style.display = "none";
        document.getElementById('end-screen-overlay').style.display = "flex";
        document.getElementById('fullscreen').style.display = "none";
    }
}





