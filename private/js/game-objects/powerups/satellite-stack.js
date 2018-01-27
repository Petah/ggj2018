const GameObject = require('../game-object');
const Satellite = require('./satellite');

const sprites = {
    antenna: 200,
    dish: 201,
    frame: 202,

    antennaPlaced: 203,
    dishPlaced: 204,
    framePlaced: 205,

    antennaDishPlaced: 206,
    antennaFramePlaced: 207,
    dishFramePlaced: 208,

    complete: 209,
};

module.exports = class SatelliteStack extends GameObject {
    constructor(
        game,
        x,
        y,
        team,
    ) {
        super(game, x, y, 0, 2, 5);
        this.team = team;
        this.currentSize = 0;
        this.maxSize = Satellite.REQUIRED_PARTS;
        this.type = 'SatelliteStack';
        this.layer = 'map';
        this.parts = {};
    }

    addPart(sprite) {
        this.parts[sprite] = true;

        if (this.parts[sprites.antenna] && this.parts[sprites.dish] && this.parts[sprites.frame]) {
            this.sprite = sprites.complete;
        } else if (this.parts[sprites.antenna] && this.parts[sprites.dish]) {
            this.sprite = sprites.antennaDishPlaced;
        } else if (this.parts[sprites.antenna] && this.parts[sprites.frame]) {
            this.sprite = sprites.antennaFramePlaced;
        } else if (this.parts[sprites.dish] && this.parts[sprites.frame]) {
            this.sprite = sprites.dishFramePlaced;
        } else {
            this.sprite = sprite;
        }

        // if (this.currentSize++ === this.maxSize) {
        //     this.game.gameObjects.push(new Satellite(this.game,
        //         this.x,
        //         this.y,
        //         this.direction,
        //         'satellite-sprite-path',
        //         this.collisionRadius,
        //         team));
        // } else {
        //     this.sprite++;
        // }
    }

    removePart() {
        this.currentSize--;
    }
}
