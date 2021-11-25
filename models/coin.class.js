class Coin extends MovableObject {
    height = 50;
    width = 50;



    constructor() {
        super().loadImage('img/7.Marcadores/Icono/Monedas.png');
        this.x = 100 + Math.random() * 2400;
        this.y=340 - Math.random()* 200;

    }
}