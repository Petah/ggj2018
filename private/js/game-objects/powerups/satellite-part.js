const GameObject = require('../game-object');

module.exports = class SatellitePart extends GameObject {
    constructor(
        game,
        x,
        y,
        number,
    ) {
        super(game, x, y, 0, 200 + number, 5);
        console.log('###########', x, y, 0, 200 + number);
        this.type = 'SatellitePart';
        this.layer = 'map';
    }
}
