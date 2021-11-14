class StatusBar extends DrawableObject {

    IMAGES_LIFEBAR = [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png', //image 5
    ];

   // percentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES_LIFEBAR);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }
    //setPercentage(50)
    setPercentage(percentage) {
        this.percentage = percentage; // => 0...5
        let path = this.IMAGES_LIFEBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 30) {
            return 4;
        } else if (this.percentage > 20) {
            return 3;
        } else if (this.percentage > 10) {
            return 2;
        } else if (this.percentage > 5) {
            return 1;
        } else {
            return 0;
        }
    }
}
