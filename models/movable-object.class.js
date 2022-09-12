class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;  //Geschwindigkeit auf der y-Achse
    acceleration = 1.8;
    lastHit = 0;
    state = 'walk';
    movingInterval;

    /**
     * This function applies gravity to airborne movable objects, i.e. it makes them fall faster the longer they are falling
     */


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 30);
    }



    /**
     * This function decreases the x-coordinate the chickens, i.e. makes them move left
     */



    /**
     * This function returns and value of y that is smaller than 190, meaning the movable object is in the air
     * @returns - y coordinate lower than 190
     */

    isAboveGround() {                             //macht code nicht kürzer, aber besser leserlich; und kann woanders verwendet werden
        if (this instanceof ThrowableObject) {    //throwable objects sollen immer fallen
            return true;
        }
        return this.y <= 190;
    }

    /**
     * This function checks of two movable objects are colliding, i.e. if the bottom right x-coordinate overlaps with the bottom left x coordinate of another object
     * @param {object} mo - movable object
     * @returns number
     */


    isColliding(mo) {
        return this.x + this.width > mo.x &&             //this.x+this.width = x-Koordinate rechts unten am Character; mo.x = x-Koordinate links unten am enemy
            this.y + this.height > mo.y - 20 &&
            this.x < mo.x &&
            this.y < mo.y + mo.height - 60
    }

    /**
     * This function reduces the energy of a movable object after a collision and changes their state to 'hurt' or 'dead'
     */
    hit() {
        this.energy -= 5;

        if (this.energy <= 0) {
            this.energy = 0;
            this.changeState('dead');
        } else {
            this.lastHit = new Date().getTime();
            this.changeState('hurt');
        }
    }

    /**
     * This function checks if an object was hit within the last few milliseconds
     * @returns - a period of time in which the object is hurt
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in Millisekunden
        timepassed = timepassed / 1000; // Differenz in Sekunden
        return timepassed < 0.7; // wenn hier true herauskommt, heißt das man wurde innerhalb der letzten 5 Sekunden getroffen

    }

    /**
     * This function sets the character's health to 0
     * @returns - true or false
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * This function iterates through an array of images, creating an animation
     * @param {array} images - array of images for an animation
     * @returns - length of the images array
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; //let i = 7 % 6 = 1, Rest 1; Modulo-Funktion = Division mit Rest
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        return images.length - i - 2;
    }

    /**
     * This function changes the states of a movable object and restarts and animation by setting the current image to 0
     * @param {string} value - is the state of an object as a string, e.g. 'dead' or 'hurt'
     */
    changeState(value) {
        this.state = value;
        this.currentImage = 0;
    }

    /**
     * This function increases the x-coordinate of an object so that it moves to the right
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * This function decreases the x-coordinate of an object so that it moves to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * This function sets a y-coordinate which is used in the applyGravity function
     */
    jump() {
        this.speedY = 23;
    }
}







