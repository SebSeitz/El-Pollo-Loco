class Bottle extends MovableObject {
    height = 68;
    width = 80;
    y =370;
  
    constructor() {
        super().loadImage('img/6.botella/2.Botella_enterrada1.png'); 
        this.x = 400 + Math.random() * 2100;
       
    }
}