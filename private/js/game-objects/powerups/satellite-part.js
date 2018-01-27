const GameObject = require('../game-object');

module.exports = class SatellitePart extends GameObject {
    constructor(
        game,
        x,
        y,
        number,
    ) {
        console.log('---------',200 + number);
        super(game, x, y, 0, 200 + number, 5);
        this.type = 'SatellitePart';
        this.layer = 'map';
    }
}
