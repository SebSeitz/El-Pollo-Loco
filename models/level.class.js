class Level {
    enemies;
    clouds;
    coins;
    bottles;
    statusBar;
    coinBar;
    bottleBar;
    endbossBar;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, coins, bottles, statusBar, coinBar, bottleBar, endbossBar){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.statusBar = statusBar;
        this.coinBar = coinBar;
        this.bottleBar = bottleBar;
        this.endbossBar = endbossBar;
        
    }
}