class ThrowableObject extends MovableObject {
    throw_sound = new Audio('audio/throw.mp3');
    bottle_sound = new Audio('audio/collectBottle.mp3');
    glass_sound = new Audio('audio/breaking_glass.mp3');
    world;
    energy = 50;
    acceleration = 2;
    positionChicken;
    movableObjects;
    filteredObjects = [];
    isBroken = false;



    IMAGES_THROW = [
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png',
    ];

    IMAGES_SPLASH = [
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png',
    ];


    constructor(x, y, otherDirection) {
        super().loadImage('img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.applyGravity();
        this.speedY = 20;
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 70;
        this.otherDirection = otherDirection;
        this.throw();
        this.playBrokenAnimation();

    }

    /**
     * This function plays an animation if a bottle collides with an enemy
     */
    playBrokenAnimation() {
        setInterval(() => {
            if (this.isBroken == true) {
                this.playAnimation(this.IMAGES_SPLASH);
            }
        }, 120);
    }

    /**
     * This function checks of a bottle is broken i.e. hits an enemy and then sets boolean 'isBroken' to true
     */
    bottleHits(){
        if(this.isBroken == false){
            this.glass_sound.play();
            this.isBroken = true;
        }
    }

    /**
     * This function adds a throwAnimation if a new ThrowableObject is created
     */
    throw() {
        this.bottle_sound.play();
        this.fly(this.otherDirection);

        setInterval(() => {
            if (this.isBroken == false) {
                this.playAnimation(this.IMAGES_THROW);
            }
        }, 120);
    }

    /**
     * This function checks of the character is facing left or right and determines the throwing animation accordingly
     * @param {boolean} isFlyLeft - this boolean describes the direction in which the bottle is flying
     */
    fly(isFlyLeft) {
        this.throw_sound.play();
        let speedX = 6;

        if (isFlyLeft) {
            speedX *= -1;
            this.x = this.x -100;
        }
        setInterval(() => {
            this.x += speedX;
        }, 25);
    }

}

