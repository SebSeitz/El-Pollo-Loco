class Cloud extends MovableObject {
    y = 30;
    width = 600;
    height = 300;


    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {           //setInterval führt alles zwischen {} in dem Fall alle 1000 Millisekunden aus
            this.moveLeft();
        }, 1000 / 60);
        
    }                                // entspricht 60Fps --> flüssig
}