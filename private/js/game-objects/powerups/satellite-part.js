const GameObject = require('../game-object');

module.exports = class SatellitePart extends GameObject {
    constructor(
        game,
        x,
        y,
    ) {
        super(game, x, y, 0, 1, 5);
        this.type = 'SatellitePart';
        this.layer = 'map';
    }
}
