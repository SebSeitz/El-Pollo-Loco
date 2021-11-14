class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;  //Geschwindigkeit auf der y-Achse
    acceleration = 1.8;
    lastHit = 0;
    state = 'walk';

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 30);
    }

    isAboveGround() {                             //macht code nicht kürzer, aber besser leserlich; und kann woanders verwendet werden
        if (this instanceof ThrowableObject) {    //throwable objects sollen immer fallen
            return true;
        }
        return this.y <= 190;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&             //this.x+this.width = x-Koordinate rechts unten am Character; mo.x = x-Koordinate links unten am enemy
            this.y + this.height > mo.y-60 &&
            this.x < mo.x &&
            this.y < mo.y + mo.height-60
    }

    hit() {
        this.energy -= 5;

        if (this.energy <= 0) {
            this.energy = 0; // == funktioniert hier nicht (warum?)
            this.changeState('dead');
        } else {
            this.lastHit = new Date().getTime(); //speichert Zeit in Zahlenform
            this.changeState('hurt');
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in Millisekunden
        timepassed = timepassed / 1000; // Differenz in Sekunden
        return timepassed < 0.7; // wenn hier true herauskommt, heißt das man wurde innerhalb der letzten 5 Sekunden getroffen

    }

    isDead() {
        return this.energy == 0; //returns true or false
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; //let i = 7 % 6 = 1, Rest 1; Modulo-Funktion = Division mit Rest
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        return images.length - i - 2;
    }
    changeState(value) {
        this.state = value;
        this.currentImage = 0;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 23;
    }
}




//--> Schablone wurde erstellt, ähnlich einem JSON


