class BottleBar extends DrawableObject {
    IMAGES_BOTTLEBAR = [
        'img/7.Marcadores/Barra/Marcador_botella/Azul/0_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/20_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/40_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/60_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/80_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/100_.png',
    ];
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(this.bottleAmount);

    }
    /**
   * This function changes the image of the bottlebar which is rendered in accordance with the amount of bottles available
   * @param {number} bottleAmount the amount of bottles available to the character
   */

    setPercentage(bottleAmount) {
        this.bottleAmount = bottleAmount; // => 0...5
        let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndex(bottleAmount)];
        this.img = this.imageCache[path];
    }

    /**
   * This function checks the amount of bottles and returns a corresponding bottlebar image
    * @param {number} bottleAmount
    * @returns - images of the bottlebar array
    */
    resolveImageIndex(bottleAmount) {
        if (bottleAmount == 10) {
            return 5;
        } else if (bottleAmount > 8) {
            return 4;
        } else if (bottleAmount > 6) {
            return 3;
        } else if (bottleAmount > 4) {
            return 2;
        } else if (bottleAmount > 2) {
            return 1;
        } else {
            return 0;
        }
    }
}