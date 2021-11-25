class DrawableObject{
    img;
    imageCache = {}; //hier JSON, kein array
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;


    /**
     * This function loads a certain image from an array
     * @param {image} path - path of an image in an array
     */
    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementbyId('image'); Image ist in javascript bereits gegeben; ist Abbildung von image-tag <img id="image" src>
        this.img.src = path;
    }


    /**
     * ?
     * @param {HTMLCanvasElement} ctx - canvas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * This function draws a frame around the chosen movable objects
     * @param HTMLCanvasElement ctx canvas
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof ThrowableObject || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
        /**
     * This function loads all images of a certain array
     * @param {Array} arr - ['img/img1.png', 'img/img2.png', ...]
     */
         loadImages(arr) {

            arr.forEach((path) => {
                let img = new Image();
                img.src = path
                this.imageCache[path] = img;   //"this" greift auf übergeordnete/allgemeingültige Variable zu
            });
        }
}

