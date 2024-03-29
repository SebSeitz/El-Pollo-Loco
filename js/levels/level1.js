let level1;
function initLevel(yCoordinate, chickenHeight){

level1 = new Level(

    [
        new Chicken(yCoordinate, chickenHeight),
        new Chicken(yCoordinate, chickenHeight),
        new Chicken(),
        new Chicken(yCoordinate, chickenHeight),
        new Chicken(yCoordinate, chickenHeight),
        new Chicken(),
        new Chicken(yCoordinate, chickenHeight),
        new Chicken(yCoordinate, chickenHeight),
        new Chicken(yCoordinate, chickenHeight),
        new Endboss()
    ],
    [
        new Cloud(),
    ],

    [
        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', -719), //Hintergrundgrafik wird an der x-Koordinate 0 eingefügt
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', -719),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', -719),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', -719),

        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 719),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 719),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719),

        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719 * 2),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 719 * 2),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 719 * 2),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 719 * 2),
        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719 * 3),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 719 * 3),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 719 * 3),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719 * 3),

        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719 * 4),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 719 * 4),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 719 * 4),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 719 * 4),
        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719 * 5),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 719 * 5),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 719 * 5),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719 * 5),

    ],

   getLevelCoins(),

   [
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
   ],

)

function getCoinsCollection(firstX, firstY){
    return [
        new Coin(firstX + 0 *100, firstY -0 *50),
        new Coin(firstX + 1 *100, firstY -1 *50),
        new Coin(firstX + 2 *100, firstY -2 *50),
       // new Coin(firstX + 3 *100, firstY -1 *50),
       // new Coin(firstX + 4 *100, firstY -0 *50),

    ]
}

function getLevelCoins(){
    let collection1 = getCoinsCollection(100, 300);
    let collection2 = getCoinsCollection(400, 300);
    let collection3 = getCoinsCollection(600, 300);
    let collection4 = getCoinsCollection(1000, 300);
    return collection1.concat(collection2, collection3, collection4);

}

}
