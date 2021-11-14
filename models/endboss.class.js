class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 50;
    character;
    firstEncounter;
    speed;
    x;
    energy = 30;
    
    
    

    IMAGES_ALARMED = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G5.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G6.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G7.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G8.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G9.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G10.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G11.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G12.png',
    ];

    IMAGES_ATTACKING = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G13.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G14.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G15.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G16.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G17.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G18.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G19.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G20.png',
    ]

    IMAGES_wALKING = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G1.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G2.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G3.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G4.png',
    ];

    IMAGES_HURT = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G21.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G22.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G24.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G25.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G26.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES_ALARMED[0]);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALARMED);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_wALKING);
        this.x = 2800;
        this.speed = 0.8;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isHurt() && this.state == 'hurt') {
                const currentFrame = this.playAnimation(this.IMAGES_HURT);
                if (currentFrame < 0) {
                    this.changeState('walk');
                }
            } else if (this.state == 'dead') {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 200);


        setInterval(() => {
            let currentTime = new Date().getTime();
            if (this.firstEncounter && this.state == 'walk') {
                let timePassed = currentTime - this.firstEncounter;
                if (timePassed <= 16000) {
                    this.playAnimation(this.IMAGES_wALKING);
                } else if (timePassed <= 20000) {
                    this.playAnimation(this.IMAGES_ATTACKING);
                } else if (timePassed <= 25000) {
                    this.playAnimation(this.IMAGES_ATTACKING);
                } else {
                    this.playAnimation(this.IMAGES_ALARMED);
                }
            }
        }, 200);

        setInterval(() => {

            let currentTime = new Date().getTime();

            if (this.firstEncounter && this.state != 'dead') {

                let timePassed = currentTime - this.firstEncounter;

                if (timePassed <= 4000) {
                    this.moveLeft();
                } else if (timePassed <= 8000) {
                    this.moveRight();
                    this.otherDirection = true;
                } else if (timePassed <= 12000) {
                    this.moveLeft();
                    this.speed = 2.0;
                    this.otherDirection = false;
                } else if (timePassed <= 16000) {
                    this.moveRight();
                    this.otherDirection = true;
                } else if (timePassed <= 20000) {
                    this.moveLeft();
                    this.otherDirection = false;
                } else if (timePassed <= 25000) {
                    this.speed == 0;
                    this.otherDirection == true;
                }
            }

        }, 1000 / 60);
    }
}









