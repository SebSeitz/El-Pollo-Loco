class EndbossBar extends DrawableObject {

    IMAGES_ENDBOSSBAR = [
        'img/7.Marcadores/Barra/Marcador vida/Naranja/100_ .png',
        'img/7.Marcadores/Barra/Marcador vida/Naranja/80_ .png',
        'img/7.Marcadores/Barra/Marcador vida/Naranja/60_ .png',
        'img/7.Marcadores/Barra/Marcador vida/Naranja/40_ .png',
        'img/7.Marcadores/Barra/Marcador vida/Naranja/20__1.png',
        'img/7.Marcadores/Barra/Marcador vida/Naranja/0_ .png',
    ];
    percentage = 10;

    

    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSSBAR);
        this.x = 500;
        this.y = 420;
        this.width = 200;
        this.height = 60;
        this.setPercentage(50);
    }
    //setPercentage(50)
    setPercentage(percentage) {
        this.percentage = percentage; // => 0...5
        let path = this.IMAGES_ENDBOSSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    resolveImageIndex() {
        if (this.percentage == 50) {
            return 0;
        } else if (this.percentage > 40) {
            return 1;
        } else if (this.percentage > 30) {
            return 2;
        } else if (this.percentage > 20) {
            return 3;
        } else if (this.percentage > 15) {
            return 4;
        } else {
            return 5;
        }
    }
}

