class Chicken extends MovableObject {
    y = 350;
    height = 90;
    width = 70;
    energy = 5;
    chicken_dead = new Audio('audio/chicken_kill.mp3');
    movingInterval;



    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png',
    ];

    IMAGE_DEAD = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png',
    ]
    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png'); //super bedeutet, dass von übergeordneter Methode "MovableObject" etwas aufgerufen wird; nämlich loadImage()
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 850 + Math.random() * 1900; //super sagt man nur beim Einrufen von übergeordneten METHODEN/ Zahl zw. 200 u. 700
        this.speed = 0.6 + Math.random() * 0.7;
        this.animate();
    }

    /**
     * This function animates the chickens and makes them move left
     */

     animate() {
        this.chickenMovesLeft();
        this.chickenAnimations();
    }

    /**
     * This function decreases the x-coordinate the chickens, i.e. makes them move left
     */
    chickenMovesLeft(){
        this.movingInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * This chicken adds animations to the moving or dead chickens
     */
    chickenAnimations(){
        setInterval(() => {
            if (this.energy == 0) {
                this.playAnimation(this.IMAGE_DEAD);
                clearInterval(this.movingInterval);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}