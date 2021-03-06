class CoinBar extends DrawableObject {
    IMAGES_COINBAR = [
        'img/7.Marcadores/Barra/Marcador moneda/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/100_.png',
    ];
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINBAR);
        this.x = 20;
        this.y = 35;
        this.width = 200;
        this.height = 50;
        this.setPercentage(this.coinAmount);
        
    }

    /**
     * This function changes the image of the coinbar which is rendered in accordance with the amount of collected coins
     * @param {number} percentage the amount of coins which are available to the character
     */
    setPercentage(coinAmount) {
        this.coinAmount = coinAmount; // => 0...5
        let path = this.IMAGES_COINBAR[this.resolveImageIndex(coinAmount)];
        this.img = this.imageCache[path];
    }

    /**
     * This function checks the amount of coins and returns a corresponding coinbar image
     * @returns - images of the coinbar array
     */
    resolveImageIndex(coinAmount) {
        if (coinAmount== 20) {
            return 5;
        } else if (coinAmount > 16) {
            return 4;
        } else if (coinAmount > 12) {
            return 3;
        } else if (coinAmount > 8) {
            return 2;
        } else if (coinAmount > 4) {
            return 1;
        } else {
            return 0;
        }
    }

}
