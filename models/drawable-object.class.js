class DrawableObject{
    img;
    imageCache = {}; //hier JSON, kein array
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    


    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementbyId('image'); Image ist in javascript bereits gegeben; ist Abbildung von image-tag <img id="image" src>
        this.img.src = path;
    }
    

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

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
     * 
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

